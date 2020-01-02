<template>
<div id="matchtypeCreation">
    <el-tabs type="border-card" style="height: 80vh; border: 1px solid #eee ; font-size:15px; font-weight:500;">
        <el-tab-pane label="Series/Tournament Creation">
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form :model="matchtypeCreationForm" :rules="rules" ref="matchtypeCreationForm" label-width="200px" class="demo-matchtypeCreationForm">
                            <el-form-item label="Name" prop="matchtype_name">
                                <el-input v-model="matchtypeCreationForm.matchtype_name"></el-input>
                            </el-form-item>
                            <el-form-item label="Type">
                                <el-select v-model="matchtypeCreationForm.match_type" value-key="match_type" placeholder="Select Type" label-width="200px">
                                    <el-option v-for="item in matchTypeData" :key="item.name" :label="item.name" :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Start Date">
                                <el-date-picker v-model="matchtypeCreationForm.start_date" type="datetime" placeholder="Select date and time" default-time="12:00:00">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="End Date">
                                <el-date-picker v-model="matchtypeCreationForm.end_date" type="datetime" placeholder="Select date and time" default-time="12:00:00">
                                </el-date-picker>
                            </el-form-item>

                            <el-form-item label="Venue">
                                <el-select v-model="matchtypeCreationForm.venue_country" value-key="team_country" placeholder="Select Country" label-width="200px">
                                    <el-option v-for="item in countryData" :key="item.id" :label="item.name" :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Teams">
                                <el-table ref="teams_multipleTable" :data="teamData" style="width: auto;" height="250" @selection-change="team_handleSelectionChange">
                                    <el-table-column type="selection" width="55">
                                    </el-table-column>
                                    <el-table-column label="Name" width="300">
                                        <template slot-scope="scope">{{ scope.row.name }}</template>
                                    </el-table-column>
                                </el-table>

                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('matchtypeCreationForm')">Create</el-button>
                                <el-button @click="resetForm('matchtypeCreationForm')">Reset</el-button>
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
import matchtype from '../api-services/matchtype.service'
import config from '../api-services/config.service'
import moment from 'moment'
export default {
    name: "matchtypeCreation",
    data() {
        return {
            matchtypeCreationForm: {
                matchtype_name: '',
                match_type: '',
                venue_country: '',
                start_date: '',
                end_date: '',
                teams: [],
                matchtype_status: true
            },
            matchTypeData: [{
                    "name": "SERIES"
                },
                {
                    "name": "TOURNAMENT"
                }
            ],
            countryData: [],
            teamData: [],
            rules: {
                matchtype_name: [{
                    required: true,
                    message: 'Please enter name',
                    trigger: 'blur'
                }],
                match_type: [{
                    required: true,
                    message: 'Please select match type',
                    trigger: 'blur'
                }],
                start_date: [{
                    required: true,
                    message: 'Please select start date',
                    trigger: 'blur'
                }],
                end_date: [{
                    required: true,
                    message: 'Please select end date',
                    trigger: 'blur'
                }],
                venue_country: [{
                    required: true,
                    message: 'Please select country',
                    trigger: 'change'
                }],
                team: [{
                    required: true,
                    message: 'Please select team',
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
                this.teamData = this.$store.state.config.teams
                console.log(this.teamData)
            } else {
                config.getConfig().then(res => {
                    this.$store.commit('addConfig', res.data.data)
                    this.countryData = this.$store.state.config.countries
                    this.teamData = this.$store.state.config.teams
                    console.log(this.countryData)
                }).catch(err => console.log(err))
            }
            if (this.$route.params.id) {
                matchtype.getMatchtype(this.$route.params.id)
                    .then(response => {
                        this.matchtypeCreationForm.matchtype_name = response.data.data.name
                        this.matchtypeCreationForm.match_type = response.data.data.type
                        this.matchtypeCreationForm.start_date = response.data.data.start_date
                        this.matchtypeCreationForm.end_date = response.data.data.end_date
                        this.matchtypeCreationForm.venue_country = response.data.data.end_date

                    })
                    .catch(err => {
                        this.errors.push(e)
                    })
            } else {
                this.matchtypeCreationForm.matchtype_name = null
                this.matchtypeCreationForm.match_type = null
                this.matchtypeCreationForm.start_date = null
                this.matchtypeCreationForm.end_date = null
                this.matchtypeCreationForm.venue_country = null
            }
        },
        team_toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.teams_multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.teams_multipleTable.clearSelection();
            }
        },
        team_handleSelectionChange(val) {
            this.matchtypeCreationForm.team_Selection = val;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let obj = {}
                    obj.name = this.matchtypeCreationForm.matchtype_name
                    obj.type = this.matchtypeCreationForm.match_type
                    obj.startdate = this.matchtypeCreationForm.start_date
                    obj.enddate = this.matchtypeCreationForm.end_date
                    var temp = new Date() 
                    var cdate=moment(temp, 'mm/dd/yyyy');
                    obj.created =cdate
                    obj.modified = cdate
                    obj.venue = this.matchtypeCreationForm.venue_country
                    let teamsTornament = []
                    this.matchtypeCreationForm.team_Selection.forEach(function (team) {
                        teamsTornament.push(team.id)
                    })
                    obj.teams = teamsTornament
                    if (this.$route.params.id) {
                        obj.id = this.$route.params.id
                        matchtype.matchtypeUpdate(obj)
                            .then(response => {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Series/Tournament Updated Successfully',
                                    type: 'success'
                                });
                                this.$router.replace({
                                    name: "MatchtypeList"
                                });
                            })
                            .catch(e => {
                                this.errors.push(e)
                            })
                    } else {
                        matchtype.matchtypeCreation(obj)
                            .then(response => {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Series/Tournament Created Successfully',
                                    type: 'success'
                                });
                                this.$router.replace({
                                    name: "MatchtypeList"
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

<style>
/* .el-select>.el-input {
    display: block;
    width: 630px;
} */

/* .el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 630px;
} */
</style>>
