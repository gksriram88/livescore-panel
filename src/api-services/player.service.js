import Axios from 'axios'
const RESOURCE_NAME = '/player'

export default {
  getPlayerList(offset,limit) {
    return Axios.get(RESOURCE_NAME+"?offset="+offset+"&limit="+limit);
  },

  playerCreation(payload) {
    return Axios.post(RESOURCE_NAME,payload);
  },
  getPlayer(id) {
    return Axios.get(RESOURCE_NAME+"?id="+id);
  },
  playerUpdate(payload){
    return Axios.put(RESOURCE_NAME,payload);
  },
  getPlayerByTeam(teamID)
  {
    return Axios.get(RESOURCE_NAME+"?teamid="+teamID)
  }

};