<template>
<div id="teamCreation">
    <el-tabs type="border-card" style="height: 80vh; border: 1px solid #eee ; font-size:15px; font-weight:500;">
        <el-tab-pane label="Team Creation">
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form :model="teamCreationForm" :rules="rules" ref="teamCreationForm" label-width="200px" class="demo-teamCreationForm">
                            <el-form-item label="Team Name" prop="team_name">
                                <el-input v-model="teamCreationForm.team_name"></el-input>
                            </el-form-item>
                            <el-form-item label="Team Logo" prop="team_logo">
                                <el-input v-model="teamCreationForm.team_logo"></el-input>
                            </el-form-item>
                            <el-form-item label="Team Short Name" prop="team_short_name">
                                <el-input v-model="teamCreationForm.team_short_name"></el-input>
                            </el-form-item>
                            <el-form-item label="Country">
                                <el-select v-model="teamCreationForm.team_country" value-key="team_country" placeholder="Select Country" label-width="200px">
                                    <el-option v-for="item in countryData" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Status" prop="team_status">
                                <el-switch v-model="teamCreationForm.team_status"></el-switch>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('teamCreationForm')" v-if="this.$route.params.id">Update</el-button>
                                <el-button type="primary" @click="submitForm('teamCreationForm')" v-else>Create</el-button>
                                <el-button @click="resetForm('teamCreationForm')">Reset</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light"></div>
                </el-col>
            </el-row>
        </el-tab-pane>
    </el-tabs>

</div>
</template>

<script>
import team from '../api-services/team.service'
import config from '../api-services/config.service'

export default {
    name: "teamCreation",
    data() {
        return {
            teamCreationForm: {
                team_name: '',
                team_logo: '',
                team_short_name: '',
                team_country: '',
                team_status: true
            },
            countryData: [],
            rules: {
                team_name: [{
                    required: true,
                    message: 'Please enter team name',
                    trigger: 'blur'
                }],
                team_logo: [{
                    required: true,
                    message: 'Please enter team logo (url)',
                    trigger: 'blur'
                }],
                team_short_name: [{
                    required: true,
                    message: 'Please enter team short name',
                    trigger: 'blur'
                }],
                team_country: [{
                    required: true,
                    message: 'Please select country',
                    trigger: 'change'
                }]
            }
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
            if (this.$store.state.config.countries) {
                this.countryData = this.$store.state.config.countries
            } else {
                config.getConfig().then(res => {
                    this.$store.commit('addConfig', res.data.data)
                    console.log(this.$store.state.config.countries)
                    this.countryData = this.$store.state.config.countries
                }).catch(err => console.log(err))
            }
            console.log(this.countryData)
            if (this.$route.params.id) {
                team.getTeam(this.$route.params.id)
                    .then(response => {
                        this.teamCreationForm.team_name = response.data.data.name
                        this.teamCreationForm.team_logo = response.data.data.logo
                        this.teamCreationForm.team_short_name = response.data.data.shortname
                        this.teamCreationForm.team_country = response.data.data.c_id;
                    })
                    .catch(err => {
                        this.errors.push(e)
                    })
            } else {
                this.team_name = null
                this.team_logo = null
                this.team_short_name = null
                this.team_country = null
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let obj = {}
                    obj.name = this.teamCreationForm.team_name
                    obj.logo = this.teamCreationForm.team_logo
                    obj.shortname = this.teamCreationForm.team_short_name
                    obj.country = this.teamCreationForm.team_country
                    obj.status = this.teamCreationForm.team_status
                    if (this.$route.params.id) {
                        obj.id = this.$route.params.id
                        team.teamUpdate(obj)
                            .then(response => {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Team Updated Successfully',
                                    type: 'success'
                                });
                                this.$router.replace({
                                    name: "TeamList"
                                });
                            })
                            .catch(e => {
                                this.errors.push(e)
                            })
                    } else {
                        team.teamCreation(obj)
                            .then(response => {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Team Created Successfully',
                                    type: 'success'
                                });
                                this.$router.replace({
                                    name: "TeamList"
                                });
                            })
                            .catch(e => {
                                this.errors.push(e)
                            })
                    }

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
