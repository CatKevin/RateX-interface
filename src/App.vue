<template>
  <div id="app">
    <navbar />
    <router-view style="padding-top: 80px"/>
  </div>
</template>

<script>
import navbar from '@/components/navBar/NavBar';


export default {
  name: 'App',
  components: {
    navbar
  }
}
</script>

<style>
@import './assets/Global.css'; 
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
