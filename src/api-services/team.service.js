import Axios from 'axios'
const RESOURCE_NAME = '/team'
const PLAYER_RESOURCE_NAME = '/player'

export default {
  getTeamList() {
    return Axios.get(RESOURCE_NAME);
  },
  teamCreation(payload) {
    return Axios.post(RESOURCE_NAME,payload);
  },
  getTeam(id) {
    return Axios.get(RESOURCE_NAME+"?id="+id);
  },
  getTeamPlayers(team_id) {
    return Axios.get(PLAYER_RESOURCE_NAME+"?teamid="+team_id);
  },
  teamUpdate(payload){
    return Axios.put(RESOURCE_NAME,payload);
  }

};