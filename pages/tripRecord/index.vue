<template>
	<view class="login_container">
		<u-sticky :offset-top="offsetTop" :enable="enable">
			<uni-search-bar class="uniSearchBar" placeholder="姓名/联系方式/小区" bgColor="#F6F8FA" :radius="100" cancelButton="none"
			 @confirm="onSearch" @clear="onClear"></uni-search-bar>
		</u-sticky>
		<view class="empty_container" v-if="isNoData">
			<uni-empty :emptyText="emptyText"></uni-empty>
		</view>
		<view class="list_container" v-if="!isNoData">
			<view class="list_item" v-for="(item, index) in 4" :key="index" @click="onClickItem">
				<view class="item_top">
					<image class="user_img" src="../../static/banner_2.png"></image>
					<view class="top_right_box">
						<view class="type-container">
							<text class="type-text" style="width: 84rpx;">姓名:</text>
							<text class="content-text" style="width: calc(100% - 84rpx);">张娜</text>
						</view>
						<view class="type-container">
							<text class="type-text" style="width: 140rpx;">联系方式:</text>
							<text class="content-text" style="width: calc(100% - 140rpx);">13812345678</text>
						</view>
						<view class="type-container">
							<text class="type-text" style="width: 112rpx;">来源地:</text>
							<text class="content-text" style="width: calc(100% - 112rpx);">河北省石家庄市山河区</text>
						</view>
						<view class="type-container">
							<text class="type-text" style="width: 140rpx;">当前住址:</text>
							<text class="content-text" style="width: calc(100% - 140rpx);">长春都市花园10栋4003</text>
						</view>
						<view class="type-container">
							<text class="type-text" style="width: 196rpx;">核酸检测报告:</text>
							<text class="content-text" style="width: calc(100% - 196rpx);">暂无</text>
						</view>
					</view>
				</view>
				<view class="item_bottom">
					<view class="bottom_t" style="margin-bottom: 25rpx;">
						<text class="bottom_text">通行时间: 2021-1-15 00:35:58</text>
						<text class="bottom_text" style="color: red;">隔离中 高风险</text>
					</view>
					<view class="bottom_t">
						<text class="bottom_text">通行位置: 西一门</text>
						<text class="bottom_text" style="color: red;">剩余隔离天数: 8天 未出隔离期</text>
					</view>
				</view>
			</view>
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
				emptyText: '暂无出行记录...',
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
		methods: {
			onClickItem() {
				uni.navigateTo({
					url: '/pages/tripRecord/detail'
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
			// this.getRepairListRequest(1, true).then(() => {
			// 	uni.hideNavigationBarLoading()
			// 	// 处理完成后，终止下拉刷新
			// 	uni.stopPullDownRefresh()
			// })
			setTimeout(function() {
				uni.hideNavigationBarLoading()
				// 处理完成后，终止下拉刷新
				uni.stopPullDownRefresh()
			}, 2000);
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
		width: 260rpx;
		height: 200rpx;
		margin-right: 20rpx;
	}

	.top_right_box {
		display: flex;
		flex-direction: column;
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
		justify-content: center;
		height: 120rpx;
		line-height: 120rpx;
	}

	.bottom_t {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.bottom_text {
		height: 28rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 28rpx;
	}
</style>
