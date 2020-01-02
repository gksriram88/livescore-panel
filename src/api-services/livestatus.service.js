import Axios from 'axios'
const RESOURCE_NAME = '/livestatus'

export default {
  changeMatchStatus(payload) {
    return Axios.put(RESOURCE_NAME,payload);
  },
  getLiveStatus(id){
      return Axios.get(RESOURCE_NAME+"?match_id="+id)
  }
};