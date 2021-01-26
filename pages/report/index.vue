<template>
	<view class="report_container">
		<u-sticky :offset-top="offsetTop" :enable="enable">
			<uni-search-bar class="uniSearchBar" placeholder="上报人" bgColor="#F6F8FA" :radius="100" cancelButton="none"
			 @confirm="onSearch" @clear="onClear"></uni-search-bar>
		</u-sticky>
		<view class="empty_container" v-if="isNoData">
			<uni-empty :emptyText="emptyText"></uni-empty>
		</view>
		<view class="report_list" v-if="!isNoData">
			<view class="report_item" v-for="(item, index) in listsItem" :key="index" @click="onClickItem(index)">
				<view class="head_box">
					<text class="head_title">{{item.reportTime}}的上报情况</text>
					<view class="status_box" :class="!item.type||item.type=='待处理'?'color_n':'color_y'">
						<text class="status_text">{{item.type?item.type:'待处理'}}</text>
					</view>
				</view>
				<view class="type-container">
					<text class="type-text">上 报 人:</text>
					<text class="content-text">{{item.reportName}}</text>
				</view>
				<view class="type-container">
					<text class="type-text">联系方式:</text>
					<text class="content-text">{{item.reportMobile}}</text>
				</view>
				<view class="type-container">
					<text class="type-text">上报对象:</text>
					<text class="content-text">{{item.reportAddress}}</text>
				</view>
				<view class="type-container">
					<text class="type-text">上报情况:</text>
					<text class="content-text">{{item.reportContent}}</text>
				</view>
				<view class="type-container">
					<text class="type-text">备注信息:</text>
					<text class="content-text">{{item.remark?item.remark:'无'}}</text>
				</view>
			</view>
			<uni-load-more v-if="!isNoData&&isShowLoadMore" :status="status"></uni-load-more>
		</view>
		<u-back-top :scrollTop="scrollTop" mode="circle" bottom="160" right="50" top="200" icon="arrow-up"
		:custom-style="customStyle" :icon-style="iconStyle" tips="顶部">
		</u-back-top>
		<u-gap height="100"></u-gap>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniEmpty from '@/components/uni-empty/uni-empty.vue'

	export default {
		components: {
			uniSearchBar,
			uniEmpty
		},
		data() {
			return {
				emptyText: '暂无邻里上报记录...',
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
		onLoad: function(options) {
			this.getReportListRequest(1, true)
		},
		methods: {
			/**
			 * 搜索框触发搜索事件
			 */
			onSearch(e) {
				this.keyword = e.value
				this.getReportListRequest(1, true)
			},
			/**
			 * 搜索框触发清除搜索内容事件
			 */
			onClear(e) {
				this.keyword = ''
				this.getReportListRequest(1, true)
			},
			
			async getReportListRequest(pageNo, override) {
				var that = this
				return await that.$http(that.$api.getReportListUrl, {
					method: 'GET',
					data: {
						limit: '10',
						page: pageNo,
						reportName: this.keyword
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
					url: "/pages/report/detail?id=" + id
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
			this.getReportListRequest(1, true).then(() => {
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
				this.getReportListRequest(this.page + 1)
			}
			if (this.loading && this.page == this.pages) {
				this.status = 'noMore'
			}
		},
	}
</script>

<style lang="scss" scoped>
	.report_container {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100%;
	}

	.report_list {
		display: flex;
		flex-direction: column;
		padding: 0 30rpx 30rpx;
	}

	.report_item {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		border-radius: 15rpx;
		padding: 20rpx 30rpx 0;
		margin-top: 30rpx;
	}

	.head_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 40rpx;
		margin-bottom: 20rpx;
	}

	.head_title {
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 32rpx;
	}

	.status_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 90rpx;
		height: 40rpx;
		border-radius: 6rpx;
		background-color: rgba(28, 169, 95, 1);
	}

	.status_text {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 24rpx;
	}

	.type-container {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		margin-bottom: 20rpx;
		width: 100%;
	}

	.type-text {
		width: 140rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 28rpx;
	}

	.content-text {
		width: calc(100% - 140rpx);
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 32rpx;
	}

	.empty_page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 100rpx;
	}

	.empty_img {
		width: 306rpx;
		height: 365rpx;
	}

	.empty_text {
		margin-top: 30rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 700;
		color: #43BA7B;
		line-height: 42rpx;
	}
	
	.color_n {
		background-color: #FF9900;
	}
	
	.color_y {
		background-color: #19BE6B;
	}
</style>
