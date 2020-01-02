import Axios from 'axios'
const RESOURCE_NAME = '/revised'


export default {
  addRevised(payload) {
    return Axios.put(RESOURCE_NAME,payload);
  }
};