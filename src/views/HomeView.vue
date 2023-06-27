<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/treslounge.png">
    <HelloWorld msg="Hello World!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style>
.home{
  text-align: center;
}
</style>
