<template>
<div class="LoginPage">
    <el-row :gutter="20">
        <el-col :span="8">
            <div class="grid-content bg-purple">&nbsp;</div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <el-row>
                            <img src="../assets/logo.png">
                    </el-row>
                            <span>Cricket Score Panel</span>
                    </div>
                    <div class="alert alert-danger" style="color:red;" v-if="error">{{ error }}</div>
                    <div style="margin-top: 15px;">
                        <el-input placeholder="Enter Username" v-model="username">
                            <template slot="prepend"><i class="el-icon-message"></i></template>
                        </el-input>
                    </div>
                    <div style="margin-top: 15px;">
                        <el-input placeholder="Enter Password" v-model="password" show-password>
                            <template slot="prepend"><i class="el-icon-question"></i></template>
                        </el-input>
                    </div>
                    <div style="margin-top: 15px;">
                        <el-button type="primary" @click="logIn">Login</el-button>
                        <!-- <router-link to="/register" style="padding:10px;float:right">Create New Account</router-link> -->
                    </div>
                </el-card>
            </div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple">&nbsp;</div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import login from '../api-services/login.service'
import config from '../api-services/config.service'
import CryptoJS from 'crypto-js'
import Axios from 'axios'

export default {
    name: "LoginPage",
    data() {
        return {
            username: '',
            password: '',
            error: false
        }
    },

    methods: {
        logIn() {
            if (this.username == '' || this.password == '')
                this.error = 'Please Enter Username and Password'
            else {
                let payload = {
                    "username": this.username,
                    "password": this.password
                }
                login.postLogin(payload)
                    .then(request => this.loginSuccessful(request))
                    .catch(() => this.loginFailed())
            }
        },
        loginSuccessful(req) {
            if (!req.data.token) {
                this.loginFailed()
                return
            }
            //encrypt token
            localStorage.token = CryptoJS.AES.encrypt(req.data.token, process.env.VUE_APP_SECRET_KEY);
            localStorage.username = this.username
            let decryptedBytes = CryptoJS.AES.decrypt(localStorage.token, process.env.VUE_APP_SECRET_KEY)
            Axios.defaults.headers.Authorization = 'Bearer ' + decryptedBytes.toString(CryptoJS.enc.Utf8);
            this.error = false
            config.getConfig().then(res => {
                this.$store.commit('addConfig', res.data.data)
                this.$router.replace({
                    name: "MatchList"
                });
            }).catch(err => console.log(err))

        },
        loginFailed() {
            this.error = 'Username Or Password is Incorrect !'
            delete localStorage.token
            delete localStorage.username
        },
    },
    created() {
        if (this.$route.query.unauthorize)
            this.error = "Authentication expired,Please login again !"
    }
}
</script>

<style scoped>
text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 480px;
}

.LoginPage {
    padding: 20px;
    align-content: center;
    margin-top: 100px
}
</style>
