<template>
	<view class="login_container">
		<view class="login_head">
			<image class="head_img" src="../../static/login_img.png"></image>
			<text class="login_title">社区人员登录</text>
			<view class="title_tip">
				<view class="head_line"></view>
				<text class="head_text">请先使用您的手机号登录系统</text>
				<view class="head_line"></view>
			</view>
		</view>
		<view class='login-container'>
			<!-- 手机号 -->
			<view class='phone-view common-view'>
				<input class='login-input' :value="phoneNo" @input="getValue" @blur="phoneNoBlur" data-id="phoneNo" type='number'
				 maxlength='11' placeholder='请输入手机号' placeholder-class='placeholder'></input>
			</view>
			<!-- 密码 -->
			<view class='vscode-view common-view'>
				<input class='login-input' :value="password" @input="getValue" data-id="password" type='default' maxlength='20'
				 placeholder='请输入密码' placeholder-class='placeholder' :password="!seePsw"></input>
				<view class="seePsw-view" @click="onSeePsw">
					<image class="seePsw-img" :src="seePsw?'/static/notsee.png':'/static/see.png'"></image>
				</view>
			</view>
			<!-- <view class="tips">
				<text></text>
				<text class="blueColor" @click="toForget">忘记密码</text>
			</view> -->
			<!-- 登录按钮 -->
			<button class='submit-btn' style="margin-bottom: 30rpx;" :loading="isLoading" @click="submitHandler" :disabled="isDisable">{{buttonText}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNo: '',
				password: '',
				seePsw: false,
				isLoading: false,
				buttonText: '登录',
				isDisable: true,
				getCodeText: '获取验证码',
				isDisabled: true,
			}
		},
		onLoad() {
			this.phoneNo = uni.getStorageSync('phoneNo')
		},
		onShow() {
			const token = uni.getStorageSync('token')
			if (token) {
				uni.switchTab({
					url: '/pages/infoRecord/index',
				})
			}
		},
		methods: {
			submitHandler: function submitHandler(e) {
				if (this.phoneNo.length != 11 || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNo))) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
					return
				}
				this.isLoading = true
				this.buttonText = '登录中...'
				this.isDisable = true
				this.onLoginEvent()
			},

			async onLoginEvent() {
				var that = this
				return await that.$http(that.$api.loginUrl + '?account=' + that.phoneNo + '&password=' + that.password, {
					method: 'POST',
					data: {},
					token: ''
				}).then(res => {
					this.isLoading = false
					this.buttonText = '登录'
					this.isDisable = false
					if (res.code == 200) {
						uni.setStorageSync('token', res.token.token)
						uni.showToast({
							title: '登录成功',
							icon: 'none',
							success: (res) => {
								uni.switchTab({
									url: '/pages/infoRecord/index',
								})
							}
						})
					} else {
						uni.showToast({
							title: res.message,
							icon: "none"
						})
					}
				}).catch(err => {
					this.isLoading = false
					this.buttonText = '登录'
					this.isDisable = false
				})
				
				// uni.setStorageSync('token', 'd26e6dd0057eb93e42c15b1d635c0e09@0')
				// uni.showToast({
				// 	title: '登录成功',
				// 	icon: 'none',
				// 	success: (res) => {
				// 		uni.switchTab({
				// 			url: '/pages/infoRecord/index',
				// 		})
				// 	}
				// })
			},
			toForget() {
				uni.navigateTo({
					url: "/pages/forgetPsw/index"
				})
			},
			phoneNoBlur(event) {
				let phoneNo = event.detail.value || event.detail.text;
				if (!phoneNo) {
					phoneNo = ''
				}
				if (phoneNo.length != 11 || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNo))) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
				}
			},
			getValue(e) {
				let type = e.currentTarget.dataset.id;
				if (type == 'phoneNo') {
					this.phoneNo = e.detail.value.replace(/\s+/g, '')
				}
				if (type == "password") {
					this.password = e.detail.value.replace(/\s+/g, '')
				}
				this.validateEmpty();
			},
			validateEmpty() {
				if (this.phoneNo == '' || this.password == '') {
					this.isDisable = true
				} else {
					this.isDisable = false
				}
			},
			onSeePsw() {
				this.seePsw = !this.seePsw
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/css/fr.css";

	.login_container {
		width: 100%;
		min-height: 100%;
		position: relative;
	}

	.login_head {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.head_img {
		width: 100%;
		height: 410rpx;
	}

	.login_title {
		font-family: "微软雅黑 Bold", "微软雅黑 Regular", 微软雅黑, sans-serif;
		font-weight: 700;
		font-style: normal;
		font-size: 48rpx;
		color: #1B7AC2;
		margin-top: 40rpx;
	}

	.title_tip {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 40rpx;
	}

	.head_line {
		width: 140rpx;
		height: 2rpx;
		background: #1B7AC2;
	}

	.head_text {
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		font-size: 28rpx;
		color: #1B7AC2;
		line-height: 37rpx;
		margin: 0 20rpx;
	}

	.tips {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 60rpx;
		margin-top: 30rpx;
	}

	.blueColor {
		height: 32rpx;
		line-height: 32rpx;
		font-size: 32rpx;
		color: #218EFF;
	}
</style>
