import {getRequest, patchRequest, postRequest} from "@/services/axios.service";

async function getAllOrgs() {
    let result = {error: 0, status: 200, data: null}
    let response = await getRequest('/orgs/get', 'ORG:getAllOrgs')
    if (response.error === 0) {
        let orgs = []
        response.data.forEach(o => orgs.push(o))
        result.data =  orgs
    }
    else result = response
    return result
}
async function createOrg(name,secret) {
    let res = await postRequest('/orgs/create', {name,secret}, 'ORG:createOrg' )
    if(res.error!==0) return `Error:${res.data.error}\nStatus:${res.data.status}\n${res.data.data}`
    else return `A new Organisation has been created with the id: ${res.data._id} !`
}

async function addTeamToOrg(TeamID,secret) {
    let res = await patchRequest(`/orgs/addteam?org-secret=${secret}`, {idTeam:TeamID} , 'ORG:addTeamToOrg' )
    if(res.error!==0) return `Error:${res.data.error}\nStatus:${res.data.status}\n${res.data.data}`
    else return `Team[${TeamID}] has been added to Organisation!`
}

async function removeTeamFromOrg(TeamID,secret) {
    let res = await patchRequest(`/orgs/removeteam?org-secret=${secret}`, {idTeam:TeamID} , 'ORG:removeTeamFromOrg' )
    if(res.error!==0) return `Error:${res.data.error}\nStatus:${res.data.status}\n${res.data.data}`
    else return `Team[${TeamID}] has been deleted from Organisation!`
}


async function getOrgById(id,secret) {
    let res = await getRequest(`/orgs/getbyid/${id}?org-secret=${secret}`, 'ORG:getOrgById')
    if(res.error!==0) return `Error:${res.data.error}\nStatus:${res.data.status}`
    else return res.data[0]
}

export {
    getAllOrgs,
    createOrg,
    addTeamToOrg,
    removeTeamFromOrg,
    getOrgById
}