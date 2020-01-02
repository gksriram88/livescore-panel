import Axios from 'axios'
const RESOURCE_NAME = '/squad'

export default {
  getSquad(innings,ballid,matchid,type) {
    return Axios.get(RESOURCE_NAME+"?innings="+innings+"&ballid="+ballid+"&matchid="+matchid+"&type="+type);
  }
};