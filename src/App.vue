<template>
  <div id="app" class="clearfix">
    <router-view></router-view>
    <Global/>
  </div>
</template>

<script>
import Global from '@/components/page/Global'
export default {
  name: 'app',
  components:{
  	Global
  }
}
</script>

<style>
	
</style>
