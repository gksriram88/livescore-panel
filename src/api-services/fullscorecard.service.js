import Axios from 'axios'
const RESOURCE_NAME = '/fullscorecard?';

export default {
  getFullScoreCard(innings,ballid,matchid){
    return Axios.get(RESOURCE_NAME+"innings="+innings+"&ballid="+ballid+"&matchid="+matchid);
  }
};