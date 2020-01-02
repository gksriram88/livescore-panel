<template>
<div class="RegisterPage">
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
                        <el-input placeholder="Enter Name" v-model="name">
                            <template slot="prepend"><i class="el-icon-message"></i></template>
                        </el-input>
                    </div>
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
                        <el-button type="primary" @click="register">Register</el-button>
                        <router-link to="/login" style="padding:10px;float:right">Login</router-link>
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
import register from '../api-services/register.service'
export default {
    name: "RegisterPage",
    data() {
        return {
            name: '',
            username: '',
            password: '',
            error: false
        }
    },

    methods: {
        register() {
            if (this.name == '' || this.username == '' || this.password == '')
                this.error = 'Please Enter all fields'
            else {
                let payload = {
                    "name": this.name,
                    "username": this.username,
                    "password": this.password
                }
                register.postRegister(payload)
                    .then(request => this.registerSuccessful(request))
                    .catch(() => this.registerFailed())
            }
        },
        registerSuccessful(req) {
            this.$notify({
                title: 'Success',
                message: 'Registered Successfully, Please Login.',
                type: 'success'
            });
            this.$router.replace({
                name: "LoginPage"
            });
        },
        registerFailed() {
            this.error = 'Something went wrong ,Please try again'
        }
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
</style>
