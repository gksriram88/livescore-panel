<template>
<div id="teamDetails" class="teamDetails">
    <el-collapse v-model="activeNames">
        <el-collapse-item title="Team Info" name="1">
            <div class="cb-col cb-col-100 cb-mtch-info-itm">
                <div class="cb-col cb-mtch-info-content col-27">
                    Logo
                </div>
                <div class="cb-col col-73 cb-mtch-info-content">
                    {{this.logo}}
                </div>
            </div>
            <div class="cb-col cb-col-100 cb-mtch-info-itm">
                <div class="cb-col col-27 cb-mtch-info-content">
                    Name
                </div>
                <div class="cb-col col-73 cb-mtch-info-content">
                    {{this.name}}
                </div>
            </div>
            <div class="cb-col cb-col-100 cb-mtch-info-itm">
                <div class="cb-col col-27 cb-mtch-info-content">
                    Short Name
                </div>
                <div class="cb-col col-73 cb-mtch-info-content">
                    {{this.shortname}}
                </div>
            </div>
            <div class="cb-col cb-col-100 cb-mtch-info-itm">
                <div class="cb-col col-27 cb-mtch-info-content">
                    Country
                </div>
                <div class="cb-col col-73 cb-mtch-info-content">
                    {{this.country}}
                </div>
            </div>
            <div class="cb-col cb-col-100 cb-mtch-info-itm">
                <div class="cb-col col-27 cb-mtch-info-content">
                    Status
                </div>
                <div class="cb-col col-73 cb-mtch-info-content">
                    {{this.status}}
                </div>
            </div>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
import team from '../api-services/team.service'
export default {
    name: "teamDetails",
    data() {
        return {
            activeNames: ['1'],
            name: '',
            logo: '',
            shortname: '',
            country: '',
            status: ''
        };
    },
    created() {
        this.fetchData()
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData() {
            if (this.$route.params.id) {
                team.getTeam(this.$route.params.id)
                    .then(response => {
                        this.name = response.data.data.name
                        this.logo = response.data.data.logo
                        this.shortname = response.data.data.shortname
                        this.country = response.data.data.c_id
                    })
                    .catch(err => {
                        this.errors.push(e)
                    })
            }
        }
    }
}
</script>

<style>
.matchDetails {
    border: 1px solid black;
}

.el-collapse-item__header {
    width: auto;
    background-color: black;
    color: white;
    text-align: center;
    padding-left: 50px;
    font-size: 18px
}

.col-27 {
    width: 27%
}

.col-73 {
    width: 73%
}

.col-100 {
    width: 100%
}

.cb-mtch-info-itm {
    padding: 10px 10px;
    border-bottom: 1px solid #ecebeb;
    float: left;
    width: 100%;
    text-align: left;
    font-weight: 500
}

.cb-mtch-info-content {
    display: inline-block;
    box-sizing: border-box;
    padding: 10px
}

.cb-mtch-result {
    background-color: white;
    font-weight: 800;
    padding: 10px;
}
</style>
