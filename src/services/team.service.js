import {getRequest, patchRequest, postRequest} from "@/services/axios.service";

async function getAllTeams() {
    let result = {error: 0, status: 200, data: null}
    let response = await getRequest('/teams/get', 'TEAM:getAllTeams')
    if (response.error === 0) {
        let teams = []
        response.data.forEach(t => teams.push(t))
        result.data = teams
    }
    else result = response
    return result
}
async function createTeam(name) {
    let res = await postRequest('/teams/create', {name:name}, 'TEAM:createTeam' )
    if(res.error!==0) return `Error:${res.data.error}\nStatus:${res.data.status}\n${res.data.data}`
    else return `A new Team has been created with the id: ${res.data._id} !`
}

async function addHeroesToTeam(HeroesID,TeamID) {
    let res = await patchRequest('/teams/addheroes', { idHeroes: HeroesID, idTeam: TeamID}, 'TEAM:addHeroesToTeam' )
    if(res.error!==0) return `Error:${res.data.error}\nStatus:${res.data.status}\n${res.data.data}`
    else return `Heroes ${HeroesID} have been added to Team[${TeamID}]!`
}

async function removeHeroesFromTeam(HeroesID,TeamID) {
    let res = await patchRequest('/teams/removeheroes', { idHeroes: HeroesID, idTeam: TeamID}, 'TEAM:removeHeroesFromTeam' )
    if(res.error!==0) return `Error:${res.data.error}\nStatus:${res.data.status}\n${res.data.data}`
    else return `Heroes ${HeroesID} have been deleted from Team[${TeamID}]!`
}
async function getTeamById(TeamID){
    let res = await getRequest('/teams/get', 'TEAM:getAllTeams')
    if(res.error !== 0) return `Error:${res.error}\nStatus:${res.status}`
    else return res.data.filter(t=>{return t._id === TeamID})[0]
}

export {
    getAllTeams,
    createTeam,
    addHeroesToTeam,
    removeHeroesFromTeam,
    getTeamById
}