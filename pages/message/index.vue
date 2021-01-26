<template>
	<view class="report_container">
		<u-sticky :offset-top="offsetTop" :enable="enable">
			<uni-search-bar class="uniSearchBar" placeholder="消息标题" bgColor="#F6F8FA" :radius="100" cancelButton="none" @confirm="onSearch"
			 @clear="onClear"></uni-search-bar>
		</u-sticky>
		<view class="empty_container" v-if="isNoData">
			<uni-empty :emptyText="emptyText"></uni-empty>
		</view>
		<view class="report_list" v-if="!isNoData">
			<view class="report_item" v-for="(item, index) in listsItem" :key="index" @click="onClickItem(index)">
				<text class="title_text">{{item.title}}</text>
				<text class="detail_text">{{item.content}}</text>
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
				emptyText: '暂无消息记录...',
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
		onLoad() {
			this.getMessageListRequest(1, true)
		},
		methods: {
			/**
			 * 搜索框触发搜索事件
			 */
			onSearch(e) {
				this.keyword = e.value
				this.getMessageListRequest(1, true)
			},
			/**
			 * 搜索框触发清除搜索内容事件
			 */
			onClear(e) {
				this.keyword = ''
				this.getMessageListRequest(1, true)
			},
			
			async getMessageListRequest(pageNo, override) {
				var that = this
				return await that.$http(that.$api.getMessageListUrl, {
					method: 'GET',
					data: {
						limit: '10',
						page: pageNo,
						title: this.keyword
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
				var detailDic = this.listsItem[idx]
				uni.navigateTo({
					url: "/pages/message/detail?dataDic=" + JSON.stringify(detailDic)
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
			this.getMessageListRequest(1, true).then(() => {
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
				this.getMessageListRequest(this.page + 1)
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
		padding: 30rpx 30rpx 24rpx;
		margin-top: 30rpx;
	}

	.title_text {
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 32rpx;
		margin-bottom: 20rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.detail_text {
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(47, 45, 44, 1);
		line-height: 36rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
</style>
