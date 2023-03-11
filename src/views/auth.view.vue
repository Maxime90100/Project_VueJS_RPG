<template>
  <div class="card">
    <h1>Authentification</h1>
    <input v-model="pwd" placeholder="Secret password">
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "authenticationView",
  computed:{
    ...mapState('auth',['password'])
  },
  methods:{
    ...mapMutations('auth',['setPassword'])
  },
  data(){
    return{
      pwd:this.password
    }
  },
  watch:{
    pwd(secret){
      this.setPassword(secret)
    }
  }
}
</script>

<style scoped>

</style>