import Axios from 'axios'
const RESOURCE_NAME = '/manualCommentry'


export default {
    getManualCommentryList(matchid) {
        return Axios.get(RESOURCE_NAME+"/"+matchid);
    },
    updateManualCommentry(payload) {
        return Axios.put(RESOURCE_NAME,payload);
    },
    addManualCommentry(payload) {
        return Axios.post(RESOURCE_NAME,payload);
    },
    deleteManualCommentry(payload) {
        return Axios.delete(RESOURCE_NAME,{ data: payload });
    }
};