import Axios from 'axios'
const RESOURCE_NAME = '/toss'


export default {
  updateMatchLive(payload) {
    return Axios.put(RESOURCE_NAME,payload);
  },
};