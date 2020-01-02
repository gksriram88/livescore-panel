import Axios from 'axios'
const RESOURCE_NAME = '/quickscorecard';

export default {
  getQuickCard(match_id){
    return Axios.get(RESOURCE_NAME+"?match_id="+match_id);
  },
  updateQuickCard(payload){
    return Axios.put(RESOURCE_NAME,payload);
  }
};