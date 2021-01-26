<template>
	<view class="empty_page" :style="{background: bgColor}">
		<image class="empty_img" src="../../static/dummy_status_img.png"></image>
		<text class="empty_text">{{emptyText}}</text>
	</view>
</template>

<script>
	export default {
		name: "UniEmpty",
		props: {
			emptyText: {
				type: String,
				default: '暂无数据...'
			},
			bgColor: {
				type: String,
				default: '#F6F8FA'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.empty_page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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
</style>
