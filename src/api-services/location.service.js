import Axios from 'axios'
const RESOURCE_NAME = '/location'

export default {
  getLocationList() {
    var countryid=3
    return Axios.get(RESOURCE_NAME+"?countryid="+countryid);
  },
  getLocation(id) {
    return Axios.get(RESOURCE_NAME+"?id="+id);
  },
  locationCreation(payload) {
    return Axios.post(RESOURCE_NAME,payload);
  },
  locationUpdate(payload){
    return Axios.put(RESOURCE_NAME,payload);
  }
  
};