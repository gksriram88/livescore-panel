import Axios from 'axios'
const RESOURCE_NAME = '/penalty'


export default {
  addPenalty(payload) {
    return Axios.put(RESOURCE_NAME,payload);
  }
};