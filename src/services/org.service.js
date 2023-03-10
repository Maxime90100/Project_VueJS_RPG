import {getRequest, patchRequest, postRequest} from "@/services/axios.service";

async function getAllOrgs() {
    let res  = await getRequest('/orgs/get', 'ORG:getAllOrgs')
    if (res.error !== 0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else{
        let orgs = []
        res.data.forEach(o => orgs.push(o))
        return {error: 0, status: 200, data: orgs}
    }
}
async function createOrg(name,secret) {
    let res = await postRequest('/orgs/create', {name,secret}, 'ORG:createOrg' )
    if(res.error!==0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else return {error:0,status:200,data:`A new Organisation has been created ! [${res.data._id}]`}
}

async function addTeamToOrg(TeamID,secret) {
    let res = await patchRequest(`/orgs/addteam?org-secret=${secret}`, {idTeam:TeamID} , 'ORG:addTeamToOrg' )
    if(res.error!==0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else return {error:0,status:200,data:`Team[${TeamID}] has been added to Organisation!`}
}

async function removeTeamFromOrg(TeamID,secret) {
    let res = await patchRequest(`/orgs/removeteam?org-secret=${secret}`, {idTeam:TeamID} , 'ORG:removeTeamFromOrg' )
    if(res.error!==0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else return {error:0,status:200,data:`Team[${TeamID}] has been deleted from Organisation!`}
}


async function getOrgById(id,secret) {
    let res = await getRequest(`/orgs/getbyid/${id}?org-secret=${secret}`, 'ORG:getOrgById')
    if(res.error!==0) return {error:res.data.error,status:res.data.status,data:res.data.data}
    else return {error:0,status:200,data:res.data[0]}
}

export {
    getAllOrgs,
    createOrg,
    addTeamToOrg,
    removeTeamFromOrg,
    getOrgById
}