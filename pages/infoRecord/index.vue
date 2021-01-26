<template>
	<view class="login_container">
		<image class="head_img" src="../../static/login_img.png"></image>
		<u-sticky :offset-top="offsetTop" :enable="enable">
			<uni-search-bar class="uniSearchBar" placeholder="姓名/联系方式/来源地" bgColor="#F6F8FA" :radius="100" cancelButton="none"
			 @confirm="onSearch" @clear="onClear"></uni-search-bar>
		</u-sticky>
		<view style="margin-top: 80rpx;" v-if="isNoData">
			<uni-empty :emptyText="emptyText"></uni-empty>
		</view>
		<view class="list_container" v-if="!isNoData">
			<view class="list_item" v-for="(item, index) in listsItem" :key="index" @click="onClickItem(index)">
				<view class="status_box">
					<text :style="item.isolationStrategy=='无需隔离'?'color: #19BE6B;':'color: red;'">{{item.isolationStrategy}}</text>
					<text style="margin: 0 10rpx;"></text>
					<text :style="item.riskLevel=='低风险'?'color: #19BE6B;' : item.riskLevel=='高风险' ? 'color: #fa3534' : 'color: #ff9900;'">{{item.riskLevel}}</text>
				</view>
				<view class="item_top">
					<image class="user_img" :src="!item.faceImg ? '../../static/personal_information_normal.png':combineUrl(item.faceImg)" mode='aspectFill'></image>
					<view class="top_right_box">
						<view class="type-container">
							<text class="type-text" style="width: 84rpx;">姓名:</text>
							<text class="content-text" style="width: calc(100% - 84rpx);">{{item.name}}</text>
						</view>
						<view class="type-container">
							<text class="type-text" style="width: 140rpx;">联系方式:</text>
							<text class="content-text" style="width: calc(100% - 140rpx);">{{item.mobile}}</text>
						</view>
						<view class="type-container">
							<text class="type-text" style="width: 112rpx;">来源地:</text>
							<text class="content-text" style="width: calc(100% - 112rpx);">{{item.origin?item.origin.replace('/',''):'暂无'}}</text>
						</view>
						<view class="type-container">
							<text class="type-text" style="width: 140rpx;">当前住址:</text>
							<text class="content-text" style="width: calc(100% - 140rpx);">{{item.backHomeAddress?item.backHomeAddress:'暂无'}}</text>
						</view>
						<view class="type-container">
							<text class="type-text" style="width: 196rpx;">核酸检测结果:</text>
							<text class="content-text" style="width: calc(100% - 196rpx);">{{item.nucleicAcidStatus?item.nucleicAcidStatus=='0'?'阳性':'阴性':'暂无'}}</text>
						</view>
					</view>
				</view>
				<view class="item_bottom">
					<text class="bottom_text">返回时间：{{item.backHomeTime.split(' ')[0]}}</text>
					<!-- <text class="bottom_text" style="margin-top: 10rpx;" v-if="item.riskLevel!='低风险'&&item.riskLevel">已隔离5天，剩余9天</text> -->
				</view>
			</view>
			<uni-load-more v-if="!isNoData&&isShowLoadMore" :status="status"></uni-load-more>
		</view>
		<u-back-top :scrollTop="scrollTop" mode="circle" bottom="260" right="50" top="200" icon="arrow-up" 
		:custom-style="customStyle" :icon-style="iconStyle" tips="顶部">
		</u-back-top>
		<view class="add_right" @click="onAddInfoRecord">
			<image class="add_img" src="../../static/icon_add.png"></image>
		</view>
		<u-gap height="100"></u-gap>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniEmpty from '@/components/uni-empty/uni-empty.vue'

	export default {
		components: {
			uniLoadMore,
			uniSearchBar,
			uniEmpty
		},
		data() {
			return {
				emptyText: '暂无信息登记...',
				status: 'more',
				keyword: '',
				listsItem: [],
				loading: true,
				page: 1,
				pages: 0,
				isNoData: false,
				isShowLoadMore: false,

				offsetTop: -90,
				enable: true,
				
				scrollTop: 0,
				iconStyle: {
					color: '#2979ff',
					fontSize: '34rpx'
				},
				customStyle: {
					backgroundColor: '#a0cfff',
					color: '#2979ff'
				}
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onShow: function(options) {
			this.getInfoRecordListRequest(1, true)
		},
		mounted() {
			var that = this;
			that.$utils.$on('refreshRecordList', () => {
				that.getInfoRecordListRequest(1, true);
			})
		},
		methods: {
			combineUrl(url) {
				return this.$common.combineImageUrl(url)
			},
			
			/**
			 * 搜索框触发搜索事件
			 */
			onSearch(e) {
				this.keyword = e.value
				this.getInfoRecordListRequest(1, true)
			},
			/**
			 * 搜索框触发清除搜索内容事件
			 */
			onClear(e) {
				this.keyword = ''
				this.getInfoRecordListRequest(1, true)
			},
			
			async getInfoRecordListRequest(pageNo, override) {
				var that = this
				return await that.$http(that.$api.getInfoRecordListUrl, {
					method: 'GET',
					data: {
						limit: '10',
						page: pageNo,
						keyWord: this.keyword
					},
					token: uni.getStorageSync('token')
				}).then(res => {
					if (res.code == 200) {
						const list = res.result.list
						that.status = list.length == 0 ? 'noMore' : 'more'
						that.isNoData = list.length == 0 ? true : false
						that.page = pageNo //当前的页号
						that.pages = res.result.totalPage //总页数
						that.listsItem = override ? list : that.listsItem.concat(list)
						that.isShowLoadMore = that.listsItem.length < 10 ? false : true
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
						that.isNoData = true
					}
				}).catch(err => {
					that.isNoData = true
				})
			},
			
			onClickItem(idx) {
				var id = this.listsItem[idx].id
				uni.navigateTo({
					url: `/pages/infoRecord/detail?id=${id}`
				})
			},

			onAddInfoRecord() {
				uni.navigateTo({
					url: '/pages/infoRecord/add?fromID=0'
				})
			},
			
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			}
		},
		/**
		 * 监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			uni.showNavigationBarLoading()
			this.getInfoRecordListRequest(1, true).then(() => {
				uni.hideNavigationBarLoading()
				// 处理完成后，终止下拉刷新
				uni.stopPullDownRefresh()
			})
		},
		/**
		 * 监听页面上拉触底事件
		 */
		onReachBottom: function() {
			if (this.loading && this.page < this.pages) {
				this.status = 'loading'
				this.getInfoRecordListRequest(this.page + 1)
			}
			if (this.loading && this.page == this.pages) {
				this.status = 'noMore'
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../common/css/fr.css";

	.login_container {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100%;
		position: relative;
	}

	.head_img {
		width: 100%;
		height: 410rpx;
	}

	.list_container {
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		width: 100%;
	}

	.list_item {
		display: flex;
		flex-direction: column;
		padding: 0 20rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		position: relative;
		margin-bottom: 30rpx;
	}

	.list_item:last-child {
		margin-bottom: 0;
	}

	.item_top {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		width: 100%;
		padding-top: 30rpx;
		border-bottom: 1rpx solid #F0F0F0;
	}

	.user_img {
		width: 160rpx;
		height: 200rpx;
		margin-right: 20rpx;
	}

	.top_right_box {
		display: flex;
		flex-direction: column;
		width: calc(100% - 180rpx);
	}

	.status_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: absolute;
		top: 30rpx;
		right: 20rpx;
	}

	.status_box>text {
		height: 26rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #EA0505;
		line-height: 26rpx;
	}

	.type-container {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		margin-bottom: 20rpx;
		width: 100%;
	}

	.type-text {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 28rpx;
	}

	.content-text {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 32rpx;
	}

	.item_bottom {
		display: flex;
		flex-direction: column;
		padding: 20rpx 0;
	}

	.bottom_text {
		height: 26rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 26rpx;
	}
</style>
