<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: 'App',
  created(){
    console.log('Auth :',this.$msal);
    console.log('Axios :', this.$axios);
    console.log('Lodash :', this.$_);
    this.signIn();
    this.getUserProfile();
  },
  methods:{
    ...mapActions('appAuth',["signIn","getUserProfile"]),
  }
}
</script>
