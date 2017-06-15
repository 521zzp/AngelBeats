<template>
	<div class="clearfix download-page">
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
export default {
	data () {
		return {
			
		}
	}
}

</script>

<style scoped="scoped" lang="less">
@import url("../../config/base.less");

.download-icon{
	font-size: .5rem;
}
.download-group{
	margin-top: 1.5rem;
}
.download-item{
	display: block;
	width: 70%;
	height: 1rem;
	line-height: 1rem;
	font-size: .34rem;
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
	width: 2.3rem;
}
.download-page{
	width: 100%;
	min-height: 12.5rem;
	overflow: hidden;
	background-image: url('@{image}/login-regist/regist-bg.jpg');
	background-size: cover;
}
</style>