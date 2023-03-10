import {getRequest, postRequest, putRequest} from "@/services/axios.service";
import {Hero} from "@/services/data.service";

async function getAllHeroes() {
    let result = {error: 0, status: 200, data: null}
    let response = await getRequest('/heroes/getaliases', 'HERO:getAllHeroes')
    if (response.error === 0) {
        let heroes = []
        response.data.forEach(h => heroes.push(Hero.fromAPI(h)))
        result.data = heroes
    }
    else result = response
    return result
}
async function createHero(publicName,realName,powers) {
    let data = {
        publicName:publicName,
        realName:realName,
        powers:powers
    }
    let res = await postRequest('/heroes/create', data,'HERO:createHero')
    if(res.error!==0) return `Error:${res.data.error}\nStatus:${res.data.status}\n${res.data.data}`
    else return `A new Hero has been created with the id: ${res.data._id} !`
}

async function updateHero(id,publicName,realName,powers,secret) {
    let data = {
        _id:id,
        publicName:publicName,
        realName:realName,
        powers:powers
    }
    let res = await putRequest(`/heroes/update?org-secret=${secret}`,data,'HERO:updateHero')
    if(res.error!==0) return `Error:${res.data.error}\nStatus:${res.data.status}\n${res.data.data}`
    else return `Hero[${id}] has been updated !`
}

async function getHeroById(id,secret){
    let res = await getRequest(`/heroes/getbyid/${id}?org-secret=${secret}`, 'HERO:getHeroById')
    if(res.error!==0) return `Error:${res.data.error}\nStatus:${res.data.status}`
    else return res.data[0]
}

export {
    getAllHeroes,
    createHero,
    updateHero,
    getHeroById
}