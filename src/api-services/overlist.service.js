import Axios from 'axios'
const RESOURCE_NAME = '/overlist'


export default {
  getOverList(id) {
    return Axios.get(RESOURCE_NAME+"?match_id="+id);
  }
};