<template>
	<view class="detail_container">
		<view class="detail-list">
			<view class="list-item solid-bottom">
				<text class="title-text">上报人</text>
				<text class="detail-text">{{dataDic.reportName?dataDic.reportName:'无'}}</text>
			</view>
			<view class="list-item solid-bottom">
				<text class="title-text">联系方式</text>
				<text class="detail-text">{{dataDic.reportMobile?dataDic.reportMobile:'无'}}</text>
			</view>
			<view class="list-item solid-bottom">
				<text class="title-text">物业电话</text>
				<text class="detail-text">{{dataDic.reportMobile?dataDic.reportMobile:'无'}}</text>
			</view>
			<view class="list-item solid-bottom">
				<text class="title-text">所在小区</text>
				<text class="detail-text">{{dataDic.reportAddress?dataDic.reportAddress:'无'}}</text>
			</view>
			<view class="list-item">
				<text class="title-text">上报信息</text>
				<text class="detail-text">{{dataDic.reportContent?dataDic.reportContent:'无'}}</text>
			</view>
		</view>
		<view class="line-view"></view>
		<view class="desc-content">
			<text class="desc-text">备注信息</text>
			<text class="desc-detail">{{dataDic.remark?dataDic.remark:'无'}}</text>
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
			var id = options.id
			this.id = id
			this.getReportDetailRequest(id)
		},
		methods: {
			async getReportDetailRequest(id) {
				var that = this
				return await that.$http(that.$api.getReportDetailUrl + '/' + id, {
					method: 'GET',
					data: {},
					token: uni.getStorageSync('token')
				}).then(res => {
					if (res.code == 200) {
						that.dataDic = res.report
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
				}).catch(err => {})
			},
		}
	}
</script>

<style>
	@import "../../common/css/list-detail.css";
</style>
