<template>
	<view class="forget_container">
		<view class="login_head">
			<image class="head_img" src="../../static/login_img.png"></image>
			<text class="login_title">忘记密码</text>
			<view class="title_tip">
				<view class="head_line"></view>
				<text class="head_text">请可以通过短信认证找回密码</text>
				<view class="head_line"></view>
			</view>
		</view>
		<view class='login-container'>
			<!-- 手机号 -->
			<view class='phone-view common-view'>
				<input class='login-input' :value="phoneNo" @input="getValue" @blur="phoneNoBlur" data-id="phoneNo" type='number'
				 maxlength='11' placeholder='请输入手机号' placeholder-class='placeholder'></input>
			</view>
			<!-- 验证码 -->
			<view class='vscode-view common-view'>
				<input class='login-input' :value="smsCode" @input="getValue" data-id="smsCode" maxlength='6' placeholder='输入验证码'
				 placeholder-class='placeholder'></input>
				<view class='line'></view>
				<text class='vscode-text' @click='onGetCode'>{{getCodeText}}</text>
			</view>
			<!-- 新密码 -->
			<view class='vscode-view common-view'>
				<input class='login-input' :value="password" @input="getValue" data-id="password" type='default' maxlength='20'
				 placeholder='请输入新的密码' placeholder-class='placeholder' :password="!seePsw"></input>
				<view class="seePsw-view" @click="onSeePsw">
					<image class="seePsw-img" :src="seePsw?'/static/notsee.png':'/static/see.png'"></image>
				</view>
			</view>
			<!-- 注册按钮 -->
			<button class='submit-btn' style="margin-bottom: 30rpx;" :loading="isLoading" @click="submitHandler" :disabled="isDisable">{{buttonText}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				getCodeText: '获取验证码',
				isLoading: false,
				buttonText: '重置',
				isDisable: true,
				phoneNo: "",
				smsCode: "",
				password: "",
				isDisabled: true,
				seePsw: false
			}
		},
		onLoad(options) {
			this.phoneNo = uni.getStorageSync('phoneNo')
		},
		methods: {
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
				if (type == "smsCode") {
					this.smsCode = e.detail.value.replace(/\s+/g, '')
				}
				if (type == "password") {
					this.password = e.detail.value.replace(/\s+/g, '')
				}
				this.validateEmpty();
			},

			validateEmpty() {
				if (this.phoneNo == '' || this.smsCode == '' || this.password == '') {
					this.isDisable = true
				} else {
					this.isDisable = false
				}
			},

			onSeePsw() {
				this.seePsw = !this.seePsw
			},

			onGetCode() {
				if (this.phoneNo.length == 0) {
					uni.showToast({
						title: '手机号不能为空',
						icon: "none"
					})
				} else if (this.phoneNo.length != 11 || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNo))) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
				} else {
					if (this.isDisabled == true) {
						uni.showToast({
							title: '加载中…',
							icon: 'loading'
						})
						this.getCodeRequest();
					} else {
						uni.showToast({
							title: '已获取验证码,请稍后再试',
							icon: 'none'
						})
					}
				}
			},

			/**
			 * 获取短信验证码
			 */
			async getCodeRequest() {
				var that = this
				return await that.$http(that.$api.getRegisterSMSCodeUrl + "?phone=" + that.phoneNo, {
					method: 'POST',
					data: {},
					token: ''
				}).then(res => {
					that.handleRequestResult(res)
				}).catch(err => {})
			},

			handleRequestResult(res) {
				uni.hideToast()
				if (res.code == 200) {
					uni.showToast({
						title: '获取验证码成功',
						icon: "none"
					})
					var _this = this
					var coden = 60 //定义60秒的倒计时
					var codeV = setInterval(function() {
						_this.getCodeText = (--coden) + 's' + '后重试'
						_this.isDisabled = false
						if (coden == -1) { //清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
							clearInterval(codeV)
							_this.getCodeText = '获取验证码'
							_this.isDisabled = true
						}
					}, 1000) //1000是1秒
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none"
					})
				}
			},

			submitHandler: function submitHandler() {
				if (this.phoneNo.length == 0) {
					uni.showToast({
						title: '手机号不能为空',
						icon: 'none'
					})
					return
				}
				if (this.smsCode.length == 0) {
					uni.showToast({
						title: '验证码不能为空',
						icon: 'none'
					})
					return
				}
				if (this.password.length == 0) {
					uni.showToast({
						title: '密码不能为空',
						icon: 'none'
					})
					return
				}
				if (this.password.length < 6 || this.password.length > 20) {
					uni.showToast({
						title: '请设置6-20字符长度的密码',
						icon: 'none'
					})
					return
				}
				if (!this.$common.isPsd(this.password)) {
					uni.showToast({
						title: '密码只可以为数字或字母',
						icon: 'none'
					})
					return
				}
				this.isLoading = true
				this.buttonText = this.fromID == 0 ? '注册中...' : '提交中...'
				this.isDisable = true
				this.onRegisterRequest()
			},

			async onRegisterRequest() {
				var that = this
				return await that.$http(that.fromID == 0 ? that.$api.registerUrl : that.$api.changePasswordUrl, {
					method: that.fromID == 0 ? 'POST' : 'PUT',
					data: that.fromID == 0 ? {
						mobile: that.phoneNo,
						mobileCode: that.smsCode,
						password: that.password
					} : {
						mobile: that.phoneNo,
						verifyCode: that.smsCode,
						newPassword: that.password
					},
					token: ''
				}).then(res => {
					that.isLoading = false
					that.buttonText = that.fromID == 0 ? '注册' : '提交'
					that.isDisable = false
					if (res.code == 200) {
						if (that.fromID == 0 || that.fromID == 1) {
							var pages = getCurrentPages();
							var currPage = pages[pages.length - 1]; //当前页面
							var prevPage = pages[pages.length - 2];
							prevPage.$vm.phoneNo = that.phoneNo
							prevPage.$vm.password = that.password
							prevPage.$vm.loginType = 1
							that.$utils.$emit('validateEmpty')
						}
						uni.showToast({
							title: that.fromID == 0 ? '注册成功' : '提交成功',
							icon: 'none',
							success: (res) => {
								uni.navigateBack({
									delta: 1
								});
							}
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(err => {
					that.isLoading = false
					that.buttonText = that.fromID == 0 ? '注册' : '提交'
					that.isDisable = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/css/fr.css";

	.forget_container {
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
</style>
