import {router} from '../router'

export  const  handleUnauthorize = function (err) {
    if (err.response.status == 401) {
        delete localStorage.token
        delete localStorage.username
        router.replace({
            name: "LoginPage",
            query: {
                unauthorize : true
            }
        });
    }
} 