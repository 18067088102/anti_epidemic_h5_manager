<template>
	<view class="detail_container">
		<text class="title_text">{{dataDic.title}}</text>
		<view class="person_date">
			<text class="text1" style="margin-bottom: 20rpx;">发布人: {{dataDic.noticeUser}}</text>
			<text class="text1">发布时间: {{dataDic.createTime}}</text>
		</view>
		<view class="content_box">
			<text class="content_text">{{dataDic.content}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataDic: {}
			}
		},
		onLoad(options) {
			this.dataDic = JSON.parse(options.dataDic)
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.detail_container {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100%;
		padding: 20rpx 30rpx;
	}
	
	.title_text {
		font-size: 40rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 40rpx;
		margin-bottom: 20rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.person_date {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		margin-bottom: 30rpx;
	}
	
	.text1 {
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 500;
		color: rgba(108, 108, 108, 1);
		line-height: 32rpx;
	}
	
	.content_text {
		font-size: 36rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 500;
		color: rgba(108, 108, 108, 1);
		line-height: 36rpx;
	}
</style>
