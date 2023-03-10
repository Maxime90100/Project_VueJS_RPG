import Vue from 'vue'
import VueRouter from 'vue-router'

import HeroView from "@/views/HeroView.vue";
import TeamView from "@/views/TeamView.vue";
import OrgView from "@/views/OrgView.vue";
import CurrentOrgView from "@/views/CurrentOrgView.vue";
import CurrentTeamView from "@/views/CurrentTeamView.vue";
import CurrentHeroView from "@/views/CurrentHeroView.vue";
import AuthenticationView from "@/views/AuthenticationView.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/heroes',
        name: 'heroes',
        components:{
            central: HeroView
        },
        children:[
            {
                path: ':id',
                components: {
                    currentHero: CurrentHeroView
                }
            }
        ]
    },
    {
        path: '/teams',
        name: 'teams',
        components: {
            central: TeamView
        },
        children:[
            {
                path: ':id',
                components: {
                    currentTeam: CurrentTeamView
                }
            }
        ]
    },
    {
        path: '/orgs',
        name: 'orgs',
        components: {
            central: OrgView
        },
        children:[
            {
                path: ':id',
                components: {
                    currentOrg: CurrentOrgView
                }
            }
        ]
    },
    {
        path: '/auth',
        name: 'authentication',
        components: {
            central: AuthenticationView
        },
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
