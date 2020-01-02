import Axios from 'axios'
const RESOURCE_NAME = '/register';

export default {
  postRegister(payload){
    return Axios.post(RESOURCE_NAME,payload);
  }
};