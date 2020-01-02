import Axios from 'axios'
const RESOURCE_NAME = '/login';

export default {
  postLogin(payload){
    return Axios.post(RESOURCE_NAME,payload);
  }
};