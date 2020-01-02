import Axios from 'axios'
const RESOURCE_NAME = '/country'

export default {
  getCountryList() {
    return Axios.get(RESOURCE_NAME);
  },
  getCountry(id) {
    return Axios.get(RESOURCE_NAME+"?id="+id);
  },
  countryCreation(payload) {
    return Axios.post(RESOURCE_NAME,payload);
  },
  countryUpdate(payload){
    return Axios.put(RESOURCE_NAME,payload);
  }
  
};