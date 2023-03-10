<template>
  <div>
    <h1>Teams</h1><hr>
    <router-view name="currentTeam"></router-view>
    <List
        listName="Teams"
        :data="teams"
        :attributes="['_id','name','nbAffiliations']"
        :filters="['_id','name']"
        @loadData="getTeamsFromAPI"
    >
    </List>
    <Form
        formName="Sélectionner une Team"
        :text-fields="[
          {name:'idTeam',type:'text',value:currentTeam ? currentTeam._id : null,required:true}
      ]"
        send-button="Obtenir"
        @sendData="selectTeam"
    >
    </Form>
    <Form
        formName="Créer une Team"
        :text-fields="[
              {name:'name',type:'text',required:true}
          ]"
        send-button="Créer"
        @sendData="create"
    >
    </Form>
    <Form
        formName="Ajouter des membres"
        :text-fields="[
              {name:'idTeam',type:'text',value:currentTeam ? currentTeam._id : null,required:true},
              {name:'idHeroes',type:'add',components:[
                  {name:'idHero',type:'text',value:currentHero ? currentHero._id : null,required:true}
              ], required: true}
          ]"
        send-button="Ajouter"
        @sendData="addHeroesToTeam"
    >
    </Form>
    <Form
        formName="Supprimer des membres"
        :text-fields="[
              {name:'idTeam',type:'text',value:currentTeam ? currentTeam._id : null,required:true},
              {name:'idHeroes',type:'add',components:[
                  {name:'idHero',type:'text',required:true}
              ], required: true}
          ]"
        send-button="Supprimer"
        @sendData="removeHeroesFromTeam"
    >
    </Form>
  </div>
</template>

<script>
import List from "@/components/List.vue";
import Form from "@/components/Form.vue";
import {mapActions, mapState} from "vuex";
export default {
  name: "TeamView",
  components: {
    List,
    Form
  },
  computed:{
    ...mapState(['teams','currentTeam','currentHero'])
  },
  methods:{
    ...mapActions([
        'getTeamsFromAPI',
        'createTeam',
        'addHeroesToTeam',
        'removeHeroesFromTeam',
        'getTeamById'
    ]),
    async create(data){
      this.createTeam(data).then(()=>{
        this.getTeamsFromAPI()
      })
    },
    async selectTeam(data){
      this.getTeamById(data).then(()=>{
        if(this.currentTeam) this.$router.push(`/teams/${this.currentTeam._id}`)
      })
    }
  },
  created() {
    if(this.currentTeam) this.$router.push(`/teams/${this.currentTeam._id}`)
  }
}
</script>

<style scoped>

</style>