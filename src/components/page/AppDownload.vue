<template>
	<div class="clearfix download-page" :style="fullScreenStyle">
		<img class="logo" src="../../assets/icon/spa-logo.png"/>
		<div class="download-group">
			<a href="http://139.196.104.97/static_img/app/yhb-release.apk" class="android download-item">
				<svg class="iconfont download-icon" aria-hidden="true" >
				    <use xlink:href="#icon-android"></use>
				</svg>
				Android
			</a>
			<a href="https://itunes.apple.com/cn/app/id1180849280" class="ios download-item">
				<svg class="iconfont download-icon"  aria-hidden="true">
				    <use xlink:href="#icon-ios"></use>
				</svg>
			IOS
			</a>
		</div>
	</div>
</template>

<script>
import {fullScreenStyle} from '@/config/style'

export default {
	data () {
		return {
			fullScreenStyle: fullScreenStyle,
		}
	},
}

</script>

<style scoped="scoped" lang="less">
@import url("../../config/base.less");

.download-icon{
	font-size: .6rem;
}
.download-group{
	margin-top: 2.5rem;
}
.download-item{
	display: block;
	width: 70%;
	height: 1.3rem;
	line-height: 1.3rem;
	font-size: 0.48rem;
	margin: .5rem auto;
	text-align: center;
	color: #FFFFFF;
	background-color: #f25159;
	border: 1px solid #FFFFFF;
	border-radius: 6px;
}
.logo{
	display: block;
	margin-left: auto;
	margin-right: auto;
	margin-top: 2rem;
	width: 3.066666rem;
}
.download-page{
	width: 100%;
	min-height: 12.5rem;
	overflow: hidden;
	background-image: url('@{image}/login-regist/regist-bg.jpg');
	background-size: cover;
}
</style>