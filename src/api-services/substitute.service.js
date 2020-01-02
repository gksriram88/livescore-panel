import Axios from 'axios'
const RESOURCE_NAME = '/substitute'

export default {
  addSubPlayer(payload) {
    return Axios.put(RESOURCE_NAME,payload);
  }

};