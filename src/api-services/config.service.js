import Axios from 'axios'
const RESOURCE_NAME = '/config';

export default {
  getConfig(){
    return Axios.get(RESOURCE_NAME);
  }
};