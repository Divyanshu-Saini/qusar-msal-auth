<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  created(){
    console.log('Auth :',this.$msal);
    console.log('Axios :', this.$axios);
  }
}
</script>
