import Axios from 'axios'
const RESOURCE_NAME = '/matchtype'
const RESOURCE_POINTS_NAME = '/points'

export default {
  getMatchtypeList(offset,limit) {
    return Axios.get(RESOURCE_NAME+"?offset="+offset+"&limit="+limit);
  },
  matchtypeCreation(payload) {
    return Axios.post(RESOURCE_NAME,payload);
  },
  getMatchtype(id) {
    return Axios.get(RESOURCE_NAME+"?id="+id);
  },
  getPoints(id) {
    return Axios.get(RESOURCE_POINTS_NAME+"?id="+id);
  },
  matchtypeUpdate(payload){
    return Axios.put(RESOURCE_NAME,payload);
  }

};