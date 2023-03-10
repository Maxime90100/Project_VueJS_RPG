<template>
  <div id="app">
    <v-app>

      <ErrorDialogComponent
          title="Error"
          width="500"
      ></ErrorDialogComponent>

      <v-app-bar
          app
          dark
      >
        <table>
          <tr>
            <td v-for="(btn,i) in btns" :key="'btns-'+i">
              <v-btn v-on:click="goTo(btn.path)">{{btn.title}}</v-btn>
            </td>
          </tr>
        </table>
        {{$store.state.password}}
      </v-app-bar>

      <v-main>
        <router-view name="central"/>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import ErrorDialogComponent from "@/components/error.dialog.component.vue";

export default {
  name: 'App',
  components:{
    ErrorDialogComponent
  },
  data: () => ({
    index:-1,
    btns:[
      {title:'Heroes',path:'/heroes'},
      {title:'Teams',path:'/teams'},
      {title:'Organisations',path:'/orgs'},
      {title:'Authentication',path:'/auth'}
    ]
  }),
  methods: {
    goTo(path) {
      this.$router.push(path)
    }
  },
  mounted() {
    this.$store.watch(
        state => state.message,
        data => alert(data)
    )
  }
}
</script>

<style scoped>
table{
  margin: 10px auto;
  text-align: center;
}
</style>
