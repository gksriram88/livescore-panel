<template>
<el-container class="header" style="border-bottom: 1px solid #eee">
    <el-header style="text-align: center; font-size: 30px ">
        <img src="../assets/logo.png"  ALIGN="left" alt="logo" height="60" width="160">
        <span style="color:white">LIVE SCORE PANEL </span>
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
        {{this.username}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">Log Out</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-header>
</el-container>
</template>

<script>
export default {
    name: "header",
    data() {
        return {
            username: ''
        };
    },
    created() {
        this.username = localStorage.username.charAt(0).toUpperCase() + localStorage.username.slice(1)

    },
    methods: {
        handleCommand(command) {
            if (command == "logout")
                this.logout();
        },
        logout(req) {
            delete localStorage.token
            delete localStorage.username
            this.$router.replace({
                name: "LoginPage"
            });
        }
    }
}
</script>

<style>
.el-dropdown {
    float: right;
    padding: 5px
}

.el-dropdown-link {
    cursor: pointer;
    color: black;
    font-size: 20px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: 100;
    background-color: aliceblue;
    padding: 8px;
    display: block;
}

.el-icon-arrow-down {
    font-size: 12px;
}
</style>
