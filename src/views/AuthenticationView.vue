<template>
  <div class="card">
    <h1>Authentification</h1>
    <input v-model="password" placeholder="Secret password">
  </div>
</template>

<script>
export default {
  name: "authenticationView",
  data(){
    return{
      password:null
    }
  },
  watch:{
    password(secret){
      this.$store.commit('setPassword',secret)
    }
  }
}
</script>

<style scoped>

</style>