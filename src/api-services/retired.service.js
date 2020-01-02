import Axios from 'axios'
const RESOURCE_NAME = '/retired'

export default {
    retireBatsman(payload) {
    return Axios.put(RESOURCE_NAME,payload);
  }
};