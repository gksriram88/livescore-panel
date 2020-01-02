import Axios from 'axios'
const RESOURCE_NAME = '/makelive'


export default {
  updateMatchLive(payload) {
    return Axios.post(RESOURCE_NAME,payload);
  },
};