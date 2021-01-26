<template>
	<view class="detail_container">
		<view class="detail-list">
			<view class="list-item solid-bottom">
				<text class="title-text">姓名</text>
				<text class="detail-text">{{dataDic.name}}</text>
			</view>
			<view class="list-item solid-bottom">
				<text class="title-text">电话</text>
				<text class="detail-text">{{dataDic.mobile}}</text>
			</view>
			<view class="list-item solid-bottom">
				<text class="title-text">证件号</text>
				<text class="detail-text">{{dataDic.idCardNumber}}</text>
			</view>
			<view class="list-item solid-bottom">
				<text class="title-text">年龄</text>
				<text class="detail-text">{{dataDic.age}}</text>
			</view>
			<view class="list-item solid-bottom">
				<text class="title-text">性别</text>
				<text class="detail-text">{{dataDic.sexName}}</text>
			</view>
			<view class="list-item solid-bottom">
				<text class="title-text">来源地</text>
				<text class="detail-text">{{origin}}</text>
			</view>
			<view class="list-item solid-bottom">
				<text class="title-text">风险等级</text>
				<text class="detail-text">{{!dataDic.riskLevel?'':dataDic.riskLevel}}</text>
			</view>
			<view class="list-item solid-bottom">
				<text class="title-text">隔离政策</text>
				<text class="detail-text">{{!dataDic.isolationStrategy?'':dataDic.isolationStrategy}}</text>
			</view>
			<view class="list-item solid-bottom">
				<text class="title-text">返程时间</text>
				<text class="detail-text">{{backHomeTime}}</text>
			</view>
			<view class="list-item solid-bottom">
				<text class="title-text">目的地</text>
				<text class="detail-text">{{dataDic.backHomeAddress}}</text>
			</view>
			<view class="list-item solid-bottom">
				<text class="title-text">返程方式</text>
				<text class="detail-text">{{!dataDic.transportationType?'':dataDic.transportationType=='0'?'自驾':'公共交通'}}</text>
			</view>
			<view class="list-item solid-bottom" v-if="dataDic.transportationType!='0'">
				<text class="title-text">交通方式</text>
				<text class="detail-text">{{ways}}</text>
			</view>
			<view class="list-item" v-if="dataDic.transportationType!='0'">
				<text class="title-text">班次</text>
				<text class="detail-text">{{lines}}</text>
			</view>
			<view class="list-item" v-if="dataDic.transportationType=='0'">
				<text class="title-text">车牌号</text>
				<text class="detail-text">{{dataDic.trainNumber}}</text>
			</view>
		</view>
		<view class="line-view"></view>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="action1">人脸照片</text>
			</view>
		</view>
		<view class="bg-white padding-left padding-right">
			<view class="grid col-4 grid-square">
				<view class="bg-img" v-for="(item, index) in imgs" :key="index" :style="'background-image:url(' + item + ')'"
				 @click.stop="onPreviewTap(index)"></view>
			</view>
		</view>
		<view class="line-view"></view>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="action1">核酸检测照片</text>
			</view>
		</view>
		<view class="bg-white padding-left padding-right">
			<view class="grid col-4 grid-square">
				<view class="bg-img" v-for="(item, index) in imgs1" :key="index" :style="'background-image:url(' + item + ')'"
				 @click.stop="onPreviewTap1(index)"></view>
			</view>
		</view>
		<view class="detail-list">
			<view class="list-item solid-bottom">
				<text class="title-text">核酸检测结果</text>
				<text class="detail-text">{{!dataDic.nucleicAcidStatus?'':dataDic.nucleicAcidStatus=='0'?'阳性':'阴性'}}</text>
			</view>
			<view class="list-item">
				<text class="title-text">核酸检测时间</text>
				<text class="detail-text">{{nucleicAcidTime}}</text>
			</view>
		</view>
		<view class="btn-view">
			<button class='submit-btn' @click="submitHandler">编辑</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataDic: {},
				imgs: [],
				imgs1: [],
				ways: '',
				lines: '',
				id: '',
				backHomeTime: '',
				nucleicAcidTime: '',
				origin: ''
			}
		},
		onLoad(options) {
			var id = options.id
			this.id = id
			this.getRecordDetailRequest(id)
		},
		onShow() {
			this.getRecordDetailRequest(this.id)
		},
		methods: {
			async getRecordDetailRequest(id) {
				var that = this
				return await that.$http(that.$api.getInfoRecordDetailUrl + '/' + id, {
					method: 'GET',
					data: {},
					token: uni.getStorageSync('token')
				}).then(res => {
					if (res.code == 200) {
						that.dataDic = res.person
						var trainNum = res.person.trainNumber
						if(trainNum) {
							if (trainNum.indexOf(";") !== -1) {
								var str1 = trainNum.split(';')[0]
								var str2 = trainNum.split(';')[1]
								if (str1.indexOf(",") !== -1 && str2.indexOf(",") !== -1) {
									that.ways = str1.replace(/,/g,' ')
									that.lines = str2.replace(/,/g,' ')
								}else {
									that.ways = str1
									that.lines = str2
								}
							}
						}
						var origin = res.person.origin
						if(origin) {
							that.origin = origin.replace('/', '')
						}
						that.backHomeTime = res.person.backHomeTime.split(' ')[0]
						that.nucleicAcidTime = res.person.nucleicAcidTime.split(' ')[0]
						that.imgs = res.person.faceImg.length==0 ? [] : [that.$common.combineImageUrl(res.person.faceImg)]
						that.imgs1 = res.person.nucleicAcidImg.length==0 ? [] : [that.$common.combineImageUrl(res.person.nucleicAcidImg)]
					}
				}).catch(err => {})
			},
			
			submitHandler() {
				uni.navigateTo({
					url: `/pages/infoRecord/add?fromID=1&id=${this.dataDic.id}`
				})
			},
			
			onPreviewTap(index) {
				uni.previewImage({
					current: this.imgs[index], // 当前显示图片的http链接
					urls: this.imgs // 需要预览的图片http链接列表
				})
			},
			
			onPreviewTap1(index) {
				uni.previewImage({
					current: this.imgs1[index], // 当前显示图片的http链接
					urls: this.imgs1 // 需要预览的图片http链接列表
				})
			}
		}
	}
</script>

<style>
	@import "../../common/css/list-detail.css";
</style>
