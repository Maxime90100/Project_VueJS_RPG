import {getRequest, postRequest, putRequest} from "@/services/axios.service";

async function getAllHeroes() {
    let res = await getRequest('/heroes/getaliases', 'HERO:getAllHeroes')
    if (res.error !== 0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else{
        let heroes = []
        res.data.forEach(h => heroes.push(h))
        return {error: 0, status: 200, data: heroes}
    }
}
async function createHero(publicName,realName,powers) {
    let data = {
        publicName:publicName,
        realName:realName,
        powers:powers
    }
    let res = await postRequest('/heroes/create', data,'HERO:createHero')
    if(res.error!==0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else return {error:0,status:200,data:`A new Hero has been created ! [${res.data._id}]`}
}

async function updateHero(id,publicName,realName,powers,secret) {
    let data = {
        _id:id,
        publicName:publicName,
        realName:realName,
        powers:powers
    }
    let res = await putRequest(`/heroes/update?org-secret=${secret}`,data,'HERO:updateHero')
    if(res.error!==0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else return {error:0,status:200,data:`Hero[${id}] has been updated !`}
}

async function getHeroById(id,secret){
    let res = await getRequest(`/heroes/getbyid/${id}?org-secret=${secret}`, 'HERO:getHeroById')
    if(res.error!==0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else return {error:0,status:200,data:res.data[0]}
}

export {
    getAllHeroes,
    createHero,
    updateHero,
    getHeroById
}