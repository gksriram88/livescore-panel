import Axios from 'axios'
const RESOURCE_NAME = '/commentry'


export default {
  getAutomatedCommentry(matchid,ball,innings) {
    return Axios.get(RESOURCE_NAME+"?id="+matchid+"&ball="+ball+"&innings="+innings);
  },
  updateAutomatedCommentry(payload) {
    return Axios.put(RESOURCE_NAME,payload);
  }
};