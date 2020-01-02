<template>
<div id="matchlist">
    <el-tabs type="border-card" v-model="activeTab" style="height: auto; border: 1px solid #eee ; font-size:15px; font-weight:500;">
        <el-tab-pane name="upcoming" label="Upcoming">
            <el-table stripe :data="upcomingList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: auto">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column label="Name" prop="name">
                </el-table-column>
                <el-table-column label="Date" prop="date">
                </el-table-column>
                <el-table-column label="Venue" prop="venue">
                </el-table-column>
                <el-table-column label="Country" prop="country">
                </el-table-column>
                <el-table-column label="Toss" prop="toss">
                </el-table-column>
                <el-table-column align="right">
                    <template slot="header">
                        <el-input v-model="search" size="mini" placeholder="Type to search" />
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button size="mini" @click="announceMatchForm(scope.$index, scope.row)" v-if="!scope.row['toss'] && winningTossChoose==''">Announce Toss</el-button>
                        <el-button size="mini" @click="dialogVisibleMatchStart = true" v-if="scope.row['toss'] || winningTossChoose!=''">Make Live</el-button>
                        <el-dialog :title="scope.row['name']" :visible.sync="dialogFormVisible" style="text-align:center; font-size:50px; font-weight:600; padding:10px;">
                            <el-form style="text-align:right;  padding:20px;  border: 3px solid #eee ;">
                                <el-form-item label="Won_The_Toss" :label-width="formLabelWidth">
                                    <el-select v-model="toss" placeholder="Select">
                                        <el-option v-for="item in selectedTeam" :key="item.id" :label="item.name" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="What did they Choose" :label-width="formLabelWidth">
                                    <el-select v-model="winningTossChoose" placeholder="Select">
                                        <el-option label="Batting" value="Batting">
                                        </el-option>
                                        <el-option label="Bowling" value="Bowling">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="handleCancle()">Cancel</el-button>
                                <el-button type="primary" @click="announceToss(scope.$index, scope.row)">Announce Toss</el-button>
                            </span>
                        </el-dialog>
                        <el-dialog title="Warning" :visible.sync="dialogVisibleMatchStart" :show-close="!dialogVisibleMatchStart" width="50%" center>
                            <span>Are you sure want to start the MATCH !</span>
                            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleMatchStart = false">Cancel</el-button>
    <el-button type="primary" @click="MakeLive(scope.$index, scope.row)">Confirm</el-button>
    </span>
                        </el-dialog>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane name="past" label="Past">
            <el-table stripe :data="pastList.filter(data => !searchPast || data.name.toLowerCase().includes(searchPast.toLowerCase()))" style="width: auto ">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column label="Name" prop="name">
                </el-table-column>
                <el-table-column label="Date" prop="date">
                </el-table-column>
                <el-table-column label="Venue" prop="venue">
                </el-table-column>
                <el-table-column label="Country" prop="country">
                </el-table-column>
                <el-table-column label="Toss" prop="toss">
                </el-table-column>
                <el-table-column align="right">
                    <template slot="header">
                        <el-input v-model="searchPast" size="mini" placeholder="Type to search" />
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleView(scope.$index, scope.row)">View</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import match from '../api-services/match.service'
import toss from '../api-services/toss.service'
import config from '../api-services/config.service'
import makelive from '../api-services/makelive.service'
import moment from 'moment'

import {
    handleUnauthorize
} from '../common/util.js'

export default {
    name: "matchlist",
    data() {
        return {
            activeTab: 'upcoming',
            upcomingList: [],
            pastList: [],
            search: '',
            searchPast: '',
            dialogFormVisible: false,
            dialogVisibleMatchStart: false,
            toss: '',
            team_a: '',
            team_b: '',
            winningTossChoose: '',
            formLabelWidth: 'auto',
            team: {},
            team_enum: {},
            selectedTeam: [],
            country_enum: {},
            matchId: '',
            matchName: 'test'
        }
    },
    methods: {
        handleEdit(index, row) {
            this.$router.replace({
                name: "MatchEdit",
                params: {
                    id: row['id']
                }
            })
        },
        handleCancle() {
            this.dialogFormVisible = false
            this.toss = ''
            this.team_a = ''
            this.winningTossChoose = ''
        },
        handleView(index, row) {
            this.$router.replace({
                name: "PastMatch",
                params: {
                    id: row['id']
                }
            })
        },
        announceToss(index, row) {
            if (this.toss != '' && this.winningTossChoose != '') {
                let key;
                if (this.winningTossChoose == "Batting") {
                    this.team_a = this.toss
                    for (key in this.selectedTeam) {
                        if (this.team_a != this.selectedTeam[key]['id']) {
                            this.team_b = this.selectedTeam[key]['id']
                        }
                    }
                } else if (this.winningTossChoose == "Bowling") {
                    this.team_b = this.toss
                    for (key in this.selectedTeam) {
                        if (this.team_b != this.selectedTeam[key]['id']) {
                            this.team_a = this.selectedTeam[key]['id']
                        }
                    }
                }
                let payload = {
                    "id": this.matchId,
                    "team_a": this.team_a,
                    "team_b": this.team_b,
                    "toss": this.toss
                }
                this.dialogFormVisible = false
                toss.updateMatchLive(payload)
                    .then(response => {
                        this.$notify({
                            title: 'Success',
                            message: 'Announced Toss',
                            type: 'success'
                        });
                        this.dialogFormVisible = false
                    })
                    .catch(err => {
                        handleUnauthorize(err)
                        this.dialogFormVisible = false
                    })
            } else {
                this.$notify({
                    title: 'Error',
                    message: 'Please choose toss and what they choose',
                    type: 'error'
                });
            }
        },
        MakeLive(index, row) {
            if (!this.matchId) {
                this.matchId = row['id']
                this.team_a = row['team_a']
                this.team_b = row['team_b']
            }
            let payload = {
                "id": this.matchId
            }
            makelive.updateMatchLive(payload)
                .then(response => {
                    this.$notify({
                        title: 'Success',
                        message: 'Match is live',
                        type: 'success'
                    });
                    this.dialogVisibleMatchStart = false

                    this.$router.replace({
                        name: "LiveScorePanel",
                        params: {
                            id: this.matchId
                        },
                        query: {
                            dialogFormVisible: true,
                            team_a: this.team_a,
                            team_b: this.team_b
                        }
                    });
                })
                .catch(err => {
                    handleUnauthorize(err)
                    this.dialogVisibleMatchStart = false
                })
        },
        announceMatchForm(index, row) {
            this.dialogFormVisible = true
            let key;
            let selected = {};
            this.selectedTeam = []
            this.matchId = row['id']
            this.matchName = row['name']
            this.team_a = row['team_a']
            this.team_b = row['team_b']
            for (key in this.team) {
                if (row['team_a'] == this.team[key]['id'] || row['team_b'] == this.team[key]['id']) {
                    selected['id'] = this.team[key]['id']
                    selected['name'] = this.team[key]['name']
                    this.selectedTeam.push(selected)
                    selected = {}
                }
            }
        }

    },
    created() {
        if (this.$route.query.activeTab)
            this.activeTab = this.$route.query.activeTab
        else
            this.activeTab = 'upcoming'
        if (this.$store.state.config.teams) {
            this.team = this.$store.state.config.teams
            this.team_enum = this.$store.state.config.team_enum
            this.country_enum = this.$store.state.config.country_enum

        } else {
            config.getConfig().then(res => {
                this.$store.commit('addConfig', res.data.data)
                this.team = this.$store.state.config.teams
                this.team_enum = this.$store.state.config.team_enum
                this.country_enum = this.$store.state.config.country_enum

            }).catch(err => console.log(err))
        }
        match.getMatchList("UPCOMING")
            .then(response => {
                let data = response.data.data
                let match
                let upcomingMatchData = {}
                for (match in data) {
                    upcomingMatchData['id'] = data[match]['id']
                    upcomingMatchData['team_a'] = data[match]['team_a']
                    upcomingMatchData['team_b'] = data[match]['team_b']
                    upcomingMatchData['name'] = data[match]['name']
                    upcomingMatchData['date'] = moment.utc(data[match]['date']).local().format('llll')
                    upcomingMatchData['venue'] = data[match]['venue']
                    upcomingMatchData['country'] = this.country_enum[data[match]['country_id']]
                    upcomingMatchData['toss'] = this.team_enum[data[match]['toss']]
                    this.upcomingList.push(upcomingMatchData)
                    upcomingMatchData = {}
                }
            })
            .catch(e => {
                handleUnauthorize(e)
            })
        match.getMatchList("PAST")
            .then(response => {
                let data = response.data.data
                let match
                let pastMatchData = {}
                for (match in data) {
                    pastMatchData['id'] = data[match]['id']
                    pastMatchData['name'] = data[match]['name']
                    pastMatchData['date'] = moment.utc(data[match]['date']).local().format('llll')
                    pastMatchData['venue'] = data[match]['venue']
                    pastMatchData['country'] = this.country_enum[data[match]['country_id']]
                    pastMatchData['toss'] = this.team_enum[data[match]['toss']]
                    this.pastList.push(pastMatchData)
                    pastMatchData = {}
                }
            })
            .catch(err => {
                handleUnauthorize(err)
            })
    }

}
</script>

<style>
/* .el-dialog__title {
    font-size: 40px,

} */
</style>
