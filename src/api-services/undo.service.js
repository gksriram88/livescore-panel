import Axios from 'axios'
const RESOURCE_NAME = '/undo'

export default {
  undoLastBall(id) {
    return Axios.get(RESOURCE_NAME+"?matchid="+id);
  }

};