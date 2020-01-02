<template>
<div id="matchCreation" v-loading="loading" element-loading-text="Updating..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-form :model="matchForm" :rules="rules" ref="matchForm" label-width="120px" class="demo-ruleForm">
        <el-tabs type="border-card" style="height: 80vh; border: 1px solid #eee ; font-size:15px; font-weight:500;">
            <el-tab-pane label="General">
                <el-container style="font-size:15px; font-weight:500;">
                    <el-main style="border-right: 1px solid #eee; text-align:left">
                        <el-form-item label="Name" prop="name">
                            <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="name" v-model="matchForm.name" style="width: 500px">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="Venue" prop="venue">
                            <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="venue" v-model="matchForm.venue" style="width: 500px">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="Date" prop="matchDate">
                            <el-date-picker v-model="matchForm.matchDate" type="datetime" placeholder="Select date and time" default-time="12:00:00">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="Format" prop="format">
                            <el-checkbox-group v-model="matchForm.format" :max="1">
                                <el-checkbox v-for="item in format_type" :key="item.id" :label="item.name" :value="item.id"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="Country" prop="country">
                            <el-select v-model="matchForm.country" value-key="country" placeholder="Select">
                                <el-option v-for="item in countryData" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-main>
                </el-container>
            </el-tab-pane>
            <el-tab-pane label="Team">
                <el-container style="font-size:15px; font-weight:500;">
                    <el-main style="border-right: 1px solid #eee; text-align:left">
                        <el-collapse v-model="activeName" accordion>
                            <el-collapse-item title="Team A" name="1">
                                <br />
                                <el-form-item label="Team A" prop="team_a">
                                    <el-select v-model="matchForm.team_a" value-key="team_a" v-on:change="OnChangeA" placeholder="Select">
                                        <el-option v-for="item in teams" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-transfer filterable :filter-method="filterMethod" :titles="['Players', 'Squad']" filter-placeholder="Players name" v-model="teama_values" :data="teama_data" :format="{
                                    noCheckeda: '${total}',
                                    hasCheckeda: '${checked}/${total}'
                                    }" @change="handleChangeA" @right-check-change="handleRightChangeA" target-order="push" :right-default-checked="default_check_teama">
                                    </el-transfer>
                                </el-form-item>
                            </el-collapse-item>
                            <el-collapse-item title="Team B" name="2">
                                <br />
                                <el-form-item label="Team B" prop="team_b">
                                    <el-select v-model="matchForm.team_b" value-key="team_b" v-on:change="OnChangeB" placeholder="Select">
                                        <el-option v-for="item in teams" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-transfer filterable :filter-method="filterMethod" :titles="['Players', 'Squad']" filter-placeholder="Players name" v-model="teamb_values" :data="teamb_data" :format="{
                                    noCheckedb: '${total}',
                                    hasCheckedb: '${checked}/${total}'
                                    }" @change="handleChangeB" @right-check-change="handleRightChangeB" target-order="push" :right-default-checked="default_check_teamb">
                                    </el-transfer>
                                </el-form-item>
                            </el-collapse-item>
                        </el-collapse>
                    </el-main>
                </el-container>
            </el-tab-pane>
            <el-tab-pane label="Match Type" style="padding:30px">
                <el-container style="font-size:15px; font-weight:500;">
                    <el-main style="border-right: 1px solid #eee; text-align:left">
                        <el-form-item>
                            <el-radio v-model="radioType" label="1" @change="OnChangeRadio">Series</el-radio>
                            <el-radio v-model="radioType" label="2" @change="OnChangeRadio">Tournament</el-radio>
                        </el-form-item>
                        <el-form-item v-if="series_down" prop="series">
                            <el-select v-model="matchForm.series" value-key="series" placeholder="Select">
                                <el-option v-for="item in seriesData" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="tourn_down" prop="tournament">
                            <el-select v-model="matchForm.tournament" value-key="tournament" placeholder="Select">
                                <el-option v-for="item in tournamentData" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-main>
                </el-container>
            </el-tab-pane>
            <el-tab-pane label="Match Description" style="padding:30px">
                <el-container style="font-size:15px; font-weight:500;">
                    <el-main style="border-right: 1px solid #eee; text-align:left">
                        <el-form-item label="Match Description" prop="match_description">
                            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="Match Description" v-model="matchForm.match_description" style="width: 500px">
                            </el-input>
                        </el-form-item>
                    </el-main>
                </el-container>
            </el-tab-pane>
        </el-tabs>
    </el-form>
    <div style="border: 2px solid #eee; background-color:#e6e6ff ;padding:15px">
        <!-- <el-button type="info" style="font-size:18px; font-weight:800;">Reset</el-button> -->
        <el-button type="primary" style="font-size:18px; font-weight:800;" @click="submitForm('matchForm')">Submit</el-button>
    </div>
</div>
</template>

<script>
import match from '../api-services/match.service'
import player from '../api-services/player.service'
import config from '../api-services/config.service'

import {
    handleUnauthorize
} from '../common/util.js'

export default {
    name: "matchCreation",
    data() {
        return {
            loading: false,
            teama_data: [],
            default_check_teama: [],
            default_check_teamb: [],
            teamb_data: [],
            teama_values: [],
            teamb_values: [],
            selected_teamb: [],
            selected_teama: [],
            activeName: '1',
            total: 0,
            filterMethod(query, item) {
                return item.initial.toLowerCase().indexOf(query.toLowerCase()) > -1;
            },
            series_down: true,
            tourn_down: false,
            radioTeam: '1',
            radioType: '1',
            tournamentData: [],
            seriesData: [],
            teams: [],
            countryData: [],
            format_type: [],
            format_type_enum: {},
            teamAPlayer: '',
            teamBPlayer: '',
            team_a_Selection: [],
            team_b_Selection: [],
            totalPlayersA: [],
            totalPlayersB: [],
            totalPlayersA_selected: [],
            totalPlayersB_selected: [],
            format: {},
            enum_team: {},
            matchForm: {
                name: '',
                venue: '',
                matchDate: '',
                format: [],
                country: '',
                team_a: '',
                team_b: '',
                series: '',
                tournament: '',
                match_description: '',
            },
            rules: {
                name: [{
                    required: true,
                    message: 'Please enter name of the match',
                    trigger: 'blur'
                }],
                venue: [{
                    required: true,
                    message: 'Please enter the venue',
                    trigger: 'blur'
                }],
                matchDate: [{
                    required: true,
                    message: 'Please select the date',
                    trigger: 'change'
                }],
                format: [{
                    type: 'array',
                    required: true,
                    message: 'Please select the format',
                    trigger: 'change'
                }],
                country: [{
                    required: true,
                    message: 'Please select the country',
                    trigger: 'change'
                }],
                team_a: [{
                    required: true,
                    message: 'Please select the team A',
                    trigger: 'change'
                }],
                team_b: [{
                    required: true,
                    message: 'Please enter the team B',
                    trigger: 'change'
                }],
                series: [{
                    required: true,
                    message: 'Please enter the series',
                    trigger: 'change'
                }],
                tournament: [{
                    required: true,
                    message: 'Please enter the tournament',
                    trigger: 'change'
                }],
                match_description: [{
                    required: true,
                    message: 'Please enter the match description',
                    trigger: 'blur'
                }],
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
        handleChangeA(value, direction, movedKeys) {
            this.totalPlayersA = value
        },
        handleChangeB(value, direction, movedKeys) {
            this.totalPlayersB = value
        },
        handleRightChangeA(value, direction, movedKeys) {
            this.totalPlayersA_selected = value
        },
        handleRightChangeB(value, direction, movedKeys) {
            this.totalPlayersB_selected = value
        },
        fetchData() {
            if (this.$store.state.config.teams) {
                this.tournamentData = this.$store.state.config.tournament_match_list
                this.seriesData = this.$store.state.config.series_match_list
                this.teams = this.$store.state.config.teams
                this.countryData = this.$store.state.config.countries
                this.enum_team = this.$store.state.config.team_enum
                this.format_type = this.$store.state.config.format_type
                this.format_type_enum = this.$store.state.config.format_type_enum
            } else {
                config.getConfig().then(res => {
                    this.$store.commit('addConfig', res.data.data)
                    this.tournamentData = this.$store.state.config.tournament_match_list
                    this.seriesData = this.$store.state.config.series_match_list
                    this.teams = this.$store.state.config.teams
                    this.countryData = this.$store.state.config.countries
                    this.enum_team = this.$store.state.config.team_enum
                    this.format_type = this.$store.state.config.format_type
                    this.format_type_enum = this.$store.state.config.format_type_enum
                }).catch(err => console.log(err))
            }

            if (this.$route.params.id) {
                match.getMatch(this.$route.params.id)
                    .then(response => {
                        this.matchForm.name = response.data.data.name
                        this.matchForm.venue = response.data.data.venue
                        this.matchForm.matchDate = response.data.data.date
                        let for_obj = {}
                        for_obj['id'] = 1
                        for_obj['name'] = 'ODI'
                        this.matchForm.format.push(response.data.data.format_name)
                        let teamA = 0,
                            teamB = 0;
                        response.data.data.team_squad_1.forEach(function (player) {
                            teamA = player.team
                        })
                        this.matchForm.team_a = teamA
                        response.data.data.team_squad_2.forEach(function (player) {
                            teamB = player.team
                        })
                        this.matchForm.team_b = teamB
                        let response_teama = [],
                            response_teamb = [],
                            selected_players_a = [],
                            selected_players_b = [],
                            teamA_obj = [],
                            teamB_obj = []

                        response.data.data.team_squad_1.forEach(function (player) {
                            if (player.selected) {
                                selected_players_a.push(player.id + ":" + player.name + ":" + player.team + ":" + player.selected)
                            }
                            teamA_obj.push({
                                id: player.id,
                                status: player.selected
                            })
                            response_teama.push(player.id + ":" + player.name + ":" + player.team + ":" + player.selected);
                        })
                        this.OnChangeA_init(teamA, teamA_obj).then(response => {
                            this.teama_data = response
                            this.default_check_teama = selected_players_a
                        })
                        // this.teama_data = this.OnChangeA_init(teamA, teamA_obj)
                        this.teama_values = response_teama
                        response.data.data.team_squad_2.forEach(function (player) {
                            if (player.selected) {
                                selected_players_b.push(player.id + ":" + player.name + ":" + player.team + ":" + player.selected)
                            }
                            teamB_obj.push({
                                id: player.id,
                                status: player.selected
                            })
                            response_teamb.push(player.id + ":" + player.name + ":" + player.team + ":" + player.selected);
                        })
                        // this.OnChangeB(teamB, teamB_obj)
                        this.OnChangeB_init(teamB, teamB_obj).then(response => {
                            this.teamb_data = response
                            this.default_check_teamb = selected_players_b
                        })
                        this.teamb_values = response_teamb
                        // this.default_check_teamb = selected_players_b
                        this.matchForm.country = response.data.data.country_id;
                        this.matchForm.match_description = response.data.data.description
                        if (response.data.data.match_type === 'SERIES') {
                            this.matchForm.series = response.data.data.matchtype_id
                        } else if (response.data.data.match_type === 'TOURNAMENT') {
                            this.matchForm.tournament = response.data.data.matchtype_id
                            this.series_down = false
                            this.tourn_down = true
                            this.radioType = "2"
                        }

                    })
                    .catch(err => {
                        console.log(err);
                        handleUnauthorize(err)
                    })
            } else {
                this.teama_data = []
                this.teamb_data = []
                if (this.$refs['matchForm']) {
                    this.$refs['matchForm'].resetFields();
                }
            }
        },
        OnChangeRadio(val) {
            if (val === "1") {
                this.series_down = true;
                this.tourn_down = false;
            } else {
                this.series_down = false;
                this.tourn_down = true;
            }
        },
        team_a_toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.team_a_multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.team_a_multipleTable.clearSelection();
            }
        },
        team_a_handleSelectionChange(val) {
            this.team_a_Selection = val;
        },
        team_b_toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.team_b_multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.team_b_multipleTable.clearSelection();
            }
        },
        team_b_handleSelectionChange(val) {
            this.team_b_Selection = val;
        },
        OnChangeA(val, arrObj) {
            // console.log(arrObj)
            this.teama_data = []
            this.teama_values = []
            player.getPlayerByTeam(val).then(response => {
                let team = response.data.data
                let data = [],
                    temp = {}
                team.forEach((player) => {
                    if (arrObj && arrObj.length > 0) {
                        arrObj.forEach(function (extPlayer) {
                            if (player.id == extPlayer.id) {
                                temp = {
                                    id: player.id,
                                    label: player.name,
                                    key: player.id + ":" + player.name + ":" + player.team_id + ":" + extPlayer.status,
                                    initial: player.name
                                };
                                if (!data.find(o => o.id == player.id)) {
                                    data.push(temp)
                                }
                            }
                        })
                    }
                    temp = {
                        id: player.id,
                        label: player.name,
                        key: player.id + ":" + player.name + ":" + player.team_id + ":" + false,
                        initial: player.name
                    };
                    if (!data.find(o => o.id == player.id)) {
                        data.push(temp)
                    }
                });
                this.teama_data = data
            }).catch(err => {})
        },
        OnChangeA_init(val, arrObj) {
            // console.log(arrObj)
            this.teama_data = []
            this.teama_values = []
            return player.getPlayerByTeam(val).then(response => {
                let team = response.data.data
                let data = [],
                    temp = {}
                team.forEach((player) => {
                    if (arrObj && arrObj.length > 0) {
                        arrObj.forEach(function (extPlayer) {
                            if (player.id == extPlayer.id) {
                                temp = {
                                    id: player.id,
                                    label: player.name,
                                    key: player.id + ":" + player.name + ":" + player.team_id + ":" + extPlayer.status,
                                    initial: player.name
                                };
                                if (!data.find(o => o.id == player.id)) {
                                    data.push(temp)
                                }
                            }
                        })
                    }
                    temp = {
                        id: player.id,
                        label: player.name,
                        key: player.id + ":" + player.name + ":" + player.team_id + ":" + false,
                        initial: player.name
                    };
                    if (!data.find(o => o.id == player.id)) {
                        data.push(temp)
                    }
                });
                return data
            }).catch(err => {})
        },
        OnChangeB(val, arrObj) {
            this.teamb_data = []
            this.teamb_values = []
            player.getPlayerByTeam(val).then(response => {
                let team = response.data.data
                let data = [],
                    temp = {}
                team.forEach((player) => {
                    if (arrObj && arrObj.length > 0) {
                        arrObj.forEach(function (extPlayer) {
                            if (player.id == extPlayer.id) {
                                temp = {
                                    id: player.id,
                                    label: player.name,
                                    key: player.id + ":" + player.name + ":" + player.team_id + ":" + extPlayer.status,
                                    initial: player.name
                                };
                                if (!data.find(o => o.id == player.id)) {
                                    data.push(temp)
                                }
                            }
                        })
                    }
                    temp = {
                        id: player.id,
                        label: player.name,
                        key: player.id + ":" + player.name + ":" + player.team_id + ":" + false,
                        initial: player.name
                    };
                    if (!data.find(o => o.id == player.id)) {
                        data.push(temp)
                    }
                });
                this.teamb_data = data
            }).catch(err => {})
        },
        OnChangeB_init(val, arrObj) {
            this.teamb_data = []
            this.teamb_values = []
            return player.getPlayerByTeam(val).then(response => {
                let team = response.data.data
                let data = [],
                    temp = {}
                team.forEach((player) => {
                    if (arrObj && arrObj.length > 0) {
                        arrObj.forEach(function (extPlayer) {
                            if (player.id == extPlayer.id) {
                                temp = {
                                    id: player.id,
                                    label: player.name,
                                    key: player.id + ":" + player.name + ":" + player.team_id + ":" + extPlayer.status,
                                    initial: player.name
                                };
                                if (!data.find(o => o.id == player.id)) {
                                    data.push(temp)
                                }
                            }
                        })
                    }
                    temp = {
                        id: player.id,
                        label: player.name,
                        key: player.id + ":" + player.name + ":" + player.team_id + ":" + false,
                        initial: player.name
                    };
                    if (!data.find(o => o.id == player.id)) {
                        data.push(temp)
                    }
                });
                return data
            }).catch(err => {})
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true
                    let obj = {}
                    obj.name = this.matchForm.name
                    obj.venue = this.matchForm.venue
                    obj.date = this.matchForm.matchDate
                    let counter = 1;
                    let counter_b = 1;
                    obj.format = Object.keys(this.format_type_enum).find(key => this.format_type_enum[key] === this.matchForm.format[0])
                    if (this.radioType === "1") {
                        obj.match_type = this.matchForm.series
                    } else {
                        obj.match_type = this.matchForm.tournament
                    }
                    obj.country = this.matchForm.country
                    obj.description = this.matchForm.match_description
                    let teamSquadA = [],
                        teamSquadB = [],
                        selected_teama = [],
                        selected_teamb = []

                    //team squad selection
                    // console.log('totalPlayersA_selected')
                    // console.log(this.totalPlayersA_selected);
                    // console.log('teama_values')
                    // console.log(this.teama_values)
                    this.totalPlayersA_selected.forEach(function (player_string) {
                        let player = player_string.split(":")
                        let selected_id = parseInt(player[0]);
                        selected_teama.push(selected_id);
                    })

                    this.teama_values.forEach(function (player_string) {
                        let player = player_string.split(":")
                        let id = parseInt(player[0]);
                        let name = player[1];
                        let team = parseInt(player[2]);
                        let status = false
                        if (player[3] === "true") {
                            status = true;
                        }
                        let temp = {};
                        if (selected_teama.length > 0) {
                            if (selected_teama.includes(id)) {
                                temp = {
                                    'player': id,
                                    'team': team,
                                    'status': true
                                };
                            } else {
                                temp = {
                                    'player': id,
                                    'team': team,
                                    'status': false
                                };
                            }
                        } else {
                            temp = {
                                'player': id,
                                'team': team,
                                'status': status
                            }
                        }
                        temp['position'] = counter
                        teamSquadA.push(temp);
                        counter = counter + 1
                    });
                    obj.team_squad_1 = teamSquadA

                    // console.log('team_squad_1')
                    // console.log(obj.team_squad_1)

                    this.totalPlayersB_selected.forEach(function (player_string) {
                        let player = player_string.split(":")
                        let selected_id = parseInt(player[0]);
                        selected_teamb.push(selected_id);
                    })
                    this.teamb_values.forEach(function (player_string) {
                        let player = player_string.split(":")
                        let id = parseInt(player[0]);
                        let name = player[1];
                        let team = parseInt(player[2]);
                        let status = false
                        if (player[3] === "true") {
                            status = true;
                        }
                        let temp = {};
                        if (selected_teamb.length > 0) {
                            if (selected_teamb.includes(id)) {
                                temp = {
                                    'player': id,
                                    'team': team,
                                    'status': true
                                };
                            } else {
                                temp = {
                                    'player': id,
                                    'team': team,
                                    'status': false
                                };
                            }
                        } else {
                            temp = {
                                'player': id,
                                'team': team,
                                'status': status
                            }
                        }

                        temp['position'] = counter_b
                        teamSquadB.push(temp);
                        counter_b = counter_b + 1

                    });
                    obj.team_squad_2 = teamSquadB

                    obj.team_a = this.matchForm.team_a
                    obj.team_b = this.matchForm.team_b
                    obj.match_status = 'UPCOMING'
                    console.log(obj)
                    if (this.$route.params.id) {
                        obj.id = this.$route.params.id
                        match.matchUpdate(obj)
                            .then(response => {
                                this.loading = false
                                this.$notify({
                                    title: 'Success',
                                    message: 'Match Update Successfully',
                                    type: 'success'
                                });
                                this.$router.replace({
                                    name: "MatchList"
                                });
                            })
                            .catch(err => {
                                this.loading = false
                                handleUnauthorize(err)
                            })
                    } else {
                        match.matchCreation(obj)
                            .then(response => {
                                this.loading = false
                                this.$notify({
                                    title: 'Success',
                                    message: 'Match Created Successfully',
                                    type: 'success'
                                });
                                this.$router.replace({
                                    name: "MatchList"
                                });
                            })
                            .catch(err => {
                                this.loading = false
                                handleUnauthorize(err)
                            })
                    }
                }
            });
        }
    }
}
</script>
