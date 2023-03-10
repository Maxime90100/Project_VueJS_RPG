<template>
  <div>
    <h1>Organisations</h1><hr>
    <router-view name="currentOrg"></router-view>
    <List
        listName="Organisations"
        :data="orgs"
        :attributes="['_id','name']"
        :filters="['_id','name']"
        @loadData="getOrgsFromAPI"
    >
    </List>
    <Form
        formName="Sélectionner une Organisation"
        :text-fields="[
          {name:'idOrg',type:'text',value:currentOrg ? currentOrg._id : null,required:true}
      ]"
        send-button="Obtenir"
        @sendData="selectOrg"
    >
    </Form>
    <Form
        formName="Créer une Organisation"
        :text-fields="[
              {name:'name',type:'text',required:true},
              {name:'secret',type:'text',required:true}
          ]"
        send-button="Créer"
        @sendData="create"
    >
    </Form>
    <Form
        formName="Ajouter une Team"
        :text-fields="[
              {name:'idTeam',type:'text',value:currentTeam ? currentTeam._id : null,required:true},
              {name:'secret',type:'text',value:currentOrg ? currentOrg.secret : null,required:true}
          ]"
        send-button="Ajouter"
        @sendData="addTeamToOrg"
    >
    </Form>
    <Form
        formName="Supprimer une Team"
        :text-fields="[
              {name:'idTeam',type:'text',value:currentTeam ? currentTeam._id : null,required:true},
              {name:'secret',type:'text',value:currentOrg ? currentOrg.secret : null,required:true}
          ]"
        send-button="Supprimer"
        @sendData="removeTeamFromOrg"
    >
    </Form>
  </div>
</template>

<script>
import List from "@/components/List.vue";
import Form from "@/components/Form.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: "OrgView",
  components: {
    List,
    Form
  },
  computed:{
    ...mapState(['orgs','currentOrg','currentTeam'])
  },
  methods:{
    ...mapActions([
        'getOrgsFromAPI',
        'createOrg',
        'addTeamToOrg',
        'removeTeamFromOrg',
        'getOrgById'
    ]),
    async create(data){
      this.createOrg(data).then(()=>{
        this.getOrgsFromAPI()
      })
    },
    async selectOrg(data){
      this.getOrgById(data).then(()=>{
        if(this.currentOrg) this.$router.push(`/orgs/${this.currentOrg._id}`)
      })
    }
  },
  created() {
    if(this.currentOrg) this.$router.push(`/orgs/${this.currentOrg._id}`)
  }
}
</script>

<style scoped>

</style>