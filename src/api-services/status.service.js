import Axios from 'axios'
const RESOURCE_NAME = '/status'

export default {
  addMatchStatus(payload) {
    return Axios.post(RESOURCE_NAME,payload);
  }

};