<template>
  <div>
    <h1>Héros</h1><hr>
    <router-view name="currentHero"></router-view>
    <List
        listName="Héros"
        :data="heroes"
        :attributes="['_id', 'publicName']"
        :filters="['_id', 'publicName']"
        @loadData="getHeroesFromAPI"
    >
    </List>
    <Form
        formName="Sélectionner un héro"
        :text-fields="[
          {name:'idHero',type:'text',value:currentHero ? currentHero._id : null,required:true},
          {name:'secret',type:'text',value:currentOrg ? currentOrg.secret : null,required:true}
      ]"
        send-button="Obtenir"
        @sendData="selectHero"
    >
    </Form>
    <Form
        formName="Créer un héro"
        :text-fields="[
              {name:'publicName',type:'text',required:true},
              {name:'realName',type:'text',required:true},
              {name:'powers',type:'add',components:[
                  {name:'name',type:'text',required:true},
                  {name:'type',type:'number',min:1,max:7,required:true},
                  {name:'level',type:'number',min:0,max:100,required:true}
              ],required:false}
          ]"
        send-button="Créer"
        @sendData="create"
    >
    </Form>
    <Form
        formName="Modifier un héro"
        :text-fields="[
              {name:'_id',type:'text',value:currentHero ? currentHero._id : null,required:true},
              {name:'publicName',type:'text',required:false},
              {name:'realName',type:'text',required:false},
              {name:'powers',type:'add',components:[
                  {name:'name',type:'text',required:true},
                  {name:'type',type:'number',min:1,max:7,required:true},
                  {name:'level',type:'number',min:0,max:100,required:true}
              ],required:false},
              {name:'secret',type:'text',value:currentOrg ? currentOrg.secret : null,required:true},
          ]"
        send-button="Modifier"
        @sendData="updateHero"
    >
    </Form>
  </div>
</template>

<script>
import List from "@/components/List.vue";
import Form from "@/components/Form.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: "HeroView",
  components: {
    List,
    Form
  },
  computed:{
    ...mapState(['heroes','currentHero','currentOrg'])
  },
  data(){
    return{
      heroById:null
    }
  },
  methods:{
    ...mapActions([
        'getHeroesFromAPI',
        'createHero',
        'updateHero',
        'getHeroById'
    ]),
    async create(data){
      this.createHero(data).then(()=>{
        this.getHeroesFromAPI()
      })
    },
    async selectHero(data){
      this.getHeroById(data).then(()=>{
        if(this.currentHero) this.$router.push(`/heroes/${this.currentHero._id}`)
      })
    }
  },
  created() {
    if(this.currentHero) this.$router.push(`/heroes/${this.currentHero._id}`)
  }
}
</script>

<style scoped>

</style>