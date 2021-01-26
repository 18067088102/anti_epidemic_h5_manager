<template>
	<view class="detail_container">
		<image class="head_img" src="../../static/banner_2.png"></image>
		<view class="detail_content">
			<view class="date_box">
				<text>通行时间：2021-1-15 00:35:58</text>
				<text>通行位置：西一门</text>
			</view>
			<view class="info_box">
				<view class="info_l">
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
				<button class="call_btn" @click="onCallPhone">立即联系TA</button>
				<view class="status_box">
					<text>隔离中</text>
					<text style="margin: 0 10rpx;"></text>
					<text>高风险</text>
				</view>
			</view>
			<view class="bottom_box">
				<view class="box_left">
					<view class="left_t_box">
						<text class="content-text" style="color: #EA0505;font-weight: 500;">剩余隔离天数：8天</text>
						<text style="margin: 0 15rpx;"></text>
						<text class="content-text" style="color: #EA0505;font-weight: 500;">未出隔离期</text>
					</view>
					<text class="content-text">物业联系方式：0551-98766789</text>
				</view>
				<button class="call_btn" @click="onCallPhone">立即联系</button>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.detail_container {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100%;
	}

	.head_img {
		width: 100%;
		height: 410rpx;
	}

	.detail_content {
		display: flex;
		flex-direction: column;
		padding: 0 30rpx;
	}

	.date_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #F0F0F0;
	}

	.date_box>text {
		height: 28rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 28rpx;
	}

	.info_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 30rpx 0 10rpx;
		border-bottom: 1rpx solid #F0F0F0;
		position: relative;
	}

	.type-container {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		margin-bottom: 20rpx;
		width: 480rpx;
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

	.call_btn {
		background-color: #147DF3;
		color: #FFFFFF;
		font-size: 28rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin-right: 0rpx;
	}

	.status_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: absolute;
		top: 30rpx;
		right: 0;
	}

	.status_box>text {
		height: 26rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #EA0505;
		line-height: 26rpx;
	}
	
	.bottom_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 0;
	}
	
	.box_left {
		display: flex;
		flex-direction: column;
	}
	
	.left_t_box {
		display: flex;
		flex-direction: row;
		margin-bottom: 20rpx;
	}
</style>
