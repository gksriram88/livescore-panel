<template>
<div id="pastMatch" class="pastMatch">
    <div class="cb-col cb-mtch-result">{{this.result}}
    </div>
    <el-collapse v-model="activeNames">
        <el-collapse-item title="Match Info" name="1">
            <div class="cb-col cb-col-100 cb-mtch-info-itm">
                <div class="cb-col cb-mtch-info-content col-27">
                    Match
                </div>
                <div class="cb-col col-73 cb-mtch-info-content">
                    {{this.name}}
                </div>
            </div>
            <div class="cb-col cb-col-100 cb-mtch-info-itm">
                <div class="cb-col col-27 cb-mtch-info-content">
                    Match Type
                </div>
                <div class="cb-col col-73 cb-mtch-info-content">
                    {{this.matchType}}
                </div>
            </div>
            <div class="cb-col cb-col-100 cb-mtch-info-itm">
                <div class="cb-col col-27 cb-mtch-info-content">
                    Date
                </div>
                <div class="cb-col col-73 cb-mtch-info-content">
                    date
                </div>
            </div>
            <div class="cb-col cb-col-100 cb-mtch-info-itm">
                <div class="cb-col col-27 cb-mtch-info-content">
                    Toss
                </div>
                <div class="cb-col col-73 cb-mtch-info-content">
                    {{this.toss}}
                </div>
            </div>
            <div class="cb-col cb-col-100 cb-mtch-info-itm">
                <div class="cb-col col-27 cb-mtch-info-content">
                    Venue
                </div>
                <div class="cb-col col-73 cb-mtch-info-content">
                    {{this.venue}}
                </div>
            </div>
            <div class="cb-col cb-col-100 cb-mtch-info-itm">
                <div class="cb-col col-27 cb-mtch-info-content">
                    Format
                </div>
                <div class="cb-col col-73 cb-mtch-info-content">
                    {{this.format}}
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
                    {{this.team_a}} Squad
                </div>
                <div class="cb-col col-73 cb-mtch-info-content">
                    {{this.teamAPlayer}}
                </div>
            </div>
            <div class="cb-col cb-col-100 cb-mtch-info-itm">
                <div class="cb-col col-27 cb-mtch-info-content">
                    {{this.team_b}} Squad
                </div>
                <div class="cb-col col-73 cb-mtch-info-content">
                    {{this.teamBPlayer}}
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="Score Card" name="2">
            <el-tabs type="border-card" v-model="activeName">
                <el-tab-pane :label=scoreTeamA :title="scoreTeamA" name="scoreTeamA">
                    <table class="text-left cb-font-14 bottom-border" style="width:100% ;">
                        <tr class="bottom-border padding-10">
                            <th style="padding: 10px 20px;">Batting</th>
                            <th>R</th>
                            <th>B</th>
                            <th>4s</th>
                            <th>6s</th>
                            <th>SR</th>
                        </tr>
                        <tr class="bottom-border" v-for="(battingTeam,index) in battingInning1" :key="index" style="margin-bottom:15px">
                            <td style="padding-left:20px"><span>{{ battingTeam.name }}</span><br>
                                <span>{{ battingTeam.status }}</span></td>
                            <td>{{battingTeam.run}}</td>
                            <td>{{battingTeam.balls}}</td>
                            <td>{{battingTeam.four}}</td>
                            <td>{{battingTeam.six}}</td>
                            <td>{{battingTeam.strikeRate}}</td>
                        </tr>
                    </table>
                    <el-row class="text-left cb-font-14 bottom-border padding-10" v-if="this.extrasInning1">
                        <el-col :span="15">
                            <div class='text-bold' style="padding-left:10px"><span>Extras</span></div>
                        </el-col>
                        <el-col :span="7">
                            <div><span>{{this.extrasInning1}}</span></div>
                        </el-col>
                    </el-row>
                    <el-row class="text-left cb-font-14 bottom-border padding-10">
                        <el-col :span="15">
                            <div class='text-bold' style="padding-left:10px"><span>Total runs</span></div>
                        </el-col>
                        <el-col :span="7">
                            <div><span>{{this.totalRunInning1}}</span></div>
                        </el-col>
                    </el-row>
                    <div class="bottom-border" v-if="this.yetToBatInning1">
                        <div class="text-bold cb-font-14 text-left" style="color: #606266; padding: 12px 20px;"><span>Yet to bat</span></div>
                        <div class="text-left cb-font-14" style="padding: 0px 20px 10px 20px;">
                            {{this.yetToBatInning1}}
                        </div>
                    </div>
                    <div class="bottom-border" v-if="this.fallOfWicketsInnings1">
                        <div class="text-bold cb-font-14 text-left" style="color: #606266; padding: 12px 20px;">Fall of wickets </div>
                        <div class="text-left cb-font-14" style="padding: 0px 20px 10px 20px;">
                            {{this.fallOfWicketsInnings1}}
                        </div>
                    </div>
                    <table class="text-left cb-font-14 bottom-border" style="width:100% ;">
                        <tr class='bottom-border'>
                            <th style="padding: 10px 20px;">Bowling</th>
                            <th>O</th>
                            <th>M</th>
                            <th>R</th>
                            <th>W</th>
                            <th>Econ</th>
                        </tr>
                        <tr class="bottom-border" v-for="(bowlingTeam,index) in BowlingInning1" :key="index" style="margin-bottom:15px">
                            <td style="padding: 10px 20px;">{{ bowlingTeam.name }}</td>
                            <td>{{bowlingTeam.over}}</td>
                            <td>{{bowlingTeam.maiden}}</td>
                            <td>{{bowlingTeam.run}}</td>
                            <td>{{bowlingTeam.wicket}}</td>
                            <td>{{bowlingTeam.economy}}</td>
                        </tr>
                    </table>
                </el-tab-pane>
                <el-tab-pane :label=scoreTeamB :title="scoreTeamB" name="scoreTeamB" v-if="fullscorecard.currentInnings != 1">
                    <table class="text-left cb-font-14 bottom-border" style="width:100% ;">
                        <tr class="bottom-border padding-10">
                            <th style="padding: 10px 20px;">Batting</th>
                            <th>R</th>
                            <th>B</th>
                            <th>4s</th>
                            <th>6s</th>
                            <th>SR</th>
                        </tr>
                        <tr class="bottom-border" v-for="(battingTeam,index) in battingInning2" :key="index" style="margin-bottom:15px">
                            <td style="padding-left:20px"><span>{{ battingTeam.name }}</span><br>
                                <span>{{ battingTeam.status }}</span></td>
                            <td>{{battingTeam.run}}</td>
                            <td>{{battingTeam.balls}}</td>
                            <td>{{battingTeam.four}}</td>
                            <td>{{battingTeam.six}}</td>
                            <td>{{battingTeam.strikeRate}}</td>
                        </tr>
                    </table>
                    <el-row class="text-left cb-font-14 bottom-border padding-10" v-if="this.extrasInning2">
                        <el-col :span="15">
                            <div class='text-bold' style="padding-left:10px"><span>Extras</span></div>
                        </el-col>
                        <el-col :span="7">
                            <div><span>{{this.extrasInning2}}</span></div>
                        </el-col>
                    </el-row>
                    <el-row class="text-left cb-font-14 bottom-border padding-10">
                        <el-col :span="15">
                            <div class='text-bold' style="padding-left:10px"><span>Total runs</span></div>
                        </el-col>
                        <el-col :span="7">
                            <div><span>{{this.totalRunInning2}}</span></div>
                        </el-col>
                    </el-row>
                    <div class="bottom-border" v-if="this.yetToBatInning2">
                        <div class="text-bold cb-font-14 text-left" style="color: #606266; padding: 12px 20px;"><span>Yet to bat</span></div>
                        <div class="text-left cb-font-14" style="padding: 0px 20px 10px 20px;">
                            {{this.yetToBatInning2}}
                        </div>
                    </div>
                    <div class="bottom-border" v-if="this.fallOfWicketsInnings2">
                        <div class="text-bold cb-font-14 text-left" style="color: #606266; padding: 12px 20px;">Fall of wickets </div>
                        <div class="text-left cb-font-14" style="padding: 0px 20px 10px 20px;">
                            {{this.fallOfWicketsInnings2}}
                        </div>
                    </div>
                    <table class="text-left cb-font-14 bottom-border" style="width:100% ;">
                        <tr class='bottom-border'>
                            <th style="padding: 10px 20px;">Bowling</th>
                            <th>O</th>
                            <th>M</th>
                            <th>R</th>
                            <th>W</th>
                            <th>Econ</th>
                        </tr>
                        <tr class="bottom-border" v-for="(bowlingTeam,index) in BowlingInning2" :key="index" style="margin-bottom:15px">
                            <td style="padding: 10px 20px;">{{ bowlingTeam.name }}</td>
                            <td>{{bowlingTeam.over}}</td>
                            <td>{{bowlingTeam.maiden}}</td>
                            <td>{{bowlingTeam.run}}</td>
                            <td>{{bowlingTeam.wicket}}</td>
                            <td>{{bowlingTeam.economy}}</td>
                        </tr>
                    </table>
                </el-tab-pane>
            </el-tabs>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
import match from '../api-services/match.service'
import config from '../api-services/config.service'
import livestatus from '../api-services/livestatus.service'
import fullscorecard from '../api-services/fullscorecard.service'

import {
    handleUnauthorize
} from '../common/util.js'

export default {
    name: "pastMatch",
    data() {
        return {
            activeNames: ['1'],
            name: '',
            venue: '',
            date: '',
            format: [],
            matchType: '',
            tournament: '',
            country: '',
            toss: '',
            teamAPlayer: '',
            teamBPlayer: '',
            enum_team: {},
            enum_format: {},
            enum_matchType: {},
            result: '',
            country_enum: {},
            activeName: 'scoreTeamA',
            scoreTeamA: '',
            scoreTeamB: '',
            teamA: '',
            teamB: '',
            yetToBatInning1: '',
            yetToBatInning2: '',
            fallOfWicketsInnings1: '',
            fallOfWicketsInnings2: '',
            battingInning1: [],
            battingInning2: [],
            BowlingInning1: [],
            BowlingInning2: [],
            fullscorecard: {},
            extrasInning1: '',
            extrasInning2: '',
            totalRunInning1: '',
            totalRunInning2: '',
            preBall: "",
            timeOutID: '',
            match_status: '',
            team_a: '',
            team_b: ''

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
                if (this.$store.state.config.team_enum) {
                    this.enum_team = this.$store.state.config.team_enum
                    this.enum_matchType = this.$store.state.config.match_type_enum
                    this.enum_format = this.$store.state.config.format_type_enum
                    this.country_enum = this.$store.state.config.country_enum
                } else {
                    config.getConfig().then(res => {
                        this.$store.commit('addConfig', res.data.data)
                        this.enum_team = this.$store.state.config.team_enum
                        this.enum_matchType = this.$store.state.config.match_type_enum
                        this.enum_format = this.$store.state.config.format_type_enum
                        this.country_enum = this.$store.state.config.country_enum
                    }).catch(err => console.log(err))
                }
                this.liveStatus()
                match.getMatch(this.$route.params.id)
                    .then(response => {
                        let player, team_squad_1, team_squad_2, choose;
                        this.name = response.data.data.name
                        this.venue = response.data.data.venue
                        this.date = response.data.data.date
                        this.format = this.enum_format[response.data.data.format_id]
                        team_squad_1 = response.data.data.team_squad_1
                        team_squad_2 = response.data.data.team_squad_2
                        this.team_a = this.enum_team[response.data.data.team_a]
                        this.team_b = this.enum_team[response.data.data.team_b]
                        for (player in team_squad_1) {
                            if (this.teamAPlayer)
                                this.teamAPlayer = this.teamAPlayer + ' ,' + team_squad_1[player]['name']
                            else
                                this.teamAPlayer = team_squad_1[player]['name']
                        }
                        for (player in team_squad_2) {
                            if (this.teamBPlayer)
                                this.teamBPlayer = this.teamBPlayer + ' ,' + team_squad_2[player]['name']
                            else
                                this.teamBPlayer = team_squad_2[player]['name']
                        }
                        this.country = this.country_enum[response.data.data.country_id]
                        this.matchType = this.enum_matchType[response.data.data.format_id];
                        choose = (response.data.data.team_a == response.data.data.toss) ? "bat" : "bowl"
                        this.toss = this.enum_team[response.data.data.toss] + " won the toss and opt to " + choose
                    })
                    .catch(err => {
                        handleUnauthorize(err)
                    })
            }
        },
        liveStatus() {
            livestatus.getLiveStatus(this.$route.params.id)
                .then(response => {
                    let data = response.data.data.current
                    this.result = data.match_status
                    this.getFullScore(data.innings, data.ball, this.$route.params.id)
                }).catch(err => {
                    handleUnauthorize(err)
                })
        },
        getFullScore(innings, ballid, matchid) {
            fullscorecard.getFullScoreCard(innings, ballid, matchid)
                .then(res => {
                    this.fullscorecard = res.data.data.fullcard
                    this.scoreTeamA = this.fullscorecard.teamA
                    this.scoreTeamB = this.fullscorecard.teamB
                    if (this.fullscorecard.currentInnings == 1) {
                        this.teamA = this.fullscorecard.teamA
                        this.teamB = this.fullscorecard.teamB
                        this.activeName = 'scoreTeamA'
                    } else {
                        this.teamA = this.fullscorecard.teamB
                        this.teamB = this.fullscorecard.teamA
                        this.activeName = 'scoreTeamB'
                    }
                    this.battingInning1 = []
                    for (let player in this.fullscorecard.innings_1.batting) {
                        if (this.fullscorecard.innings_1.batting[player].position) {
                            this.battingInning1.push(this.fullscorecard.innings_1.batting[player])
                        }
                    }
                    this.battingInning1.sort((a, b) => (a.position > b.position) ? 1 : -1)
                    this.yetToBatInning1 = ''
                    for (let yetToBat in this.fullscorecard.innings_1.yetToBat) {
                        if (this.yetToBatInning1)
                            this.yetToBatInning1 = this.yetToBatInning1 + ' , ' + this.fullscorecard.innings_1.yetToBat[yetToBat]
                        else
                            this.yetToBatInning1 = this.fullscorecard.innings_1.yetToBat[yetToBat]
                    }
                    this.extrasInning1 = this.fullscorecard.innings_1.extras.byes + this.fullscorecard.innings_1.extras.legByes + this.fullscorecard.innings_1.extras.wide + this.fullscorecard.innings_1.extras.noBall + this.fullscorecard.innings_1.extras.pnlt
                    this.extrasInning1 = this.extrasInning1 + ' ('
                    if (this.fullscorecard.innings_1.extras.byes)
                        this.extrasInning1 = this.extrasInning1 + "B " + this.fullscorecard.innings_1.extras.byes + ","
                    if (this.fullscorecard.innings_1.extras.legByes)
                        this.extrasInning1 = this.extrasInning1 + " LB " + this.fullscorecard.innings_1.extras.legByes + ","
                    if (this.fullscorecard.innings_1.extras.wide)
                        this.extrasInning1 = this.extrasInning1 + " W " + this.fullscorecard.innings_1.extras.wide + ","
                    if (this.fullscorecard.innings_1.extras.noBall)
                        this.extrasInning1 = this.extrasInning1 + " NB " + this.fullscorecard.innings_1.extras.noBall + ","
                    if (this.fullscorecard.innings_1.extras.pnlt)
                        this.extrasInning1 = this.extrasInning1 + " P " + this.fullscorecard.innings_1.extras.pnlt
                    if (this.extrasInning1[this.extrasInning1.length - 1] == ',')
                        this.extrasInning1 = this.extrasInning1.slice(0, -1);
                    this.extrasInning1 = this.extrasInning1 + ')'
                    if (this.extrasInning1 == "0 ()")
                        this.extrasInning1 = ''

                    if ((this.fullscorecard.innings_1.totalOvers % 1).toFixed(2) == "0.60")
                        this.fullscorecard.innings_1.totalOvers = Math.round(this.fullscorecard.innings_1.totalOvers)
                    this.totalRunInning1 = this.fullscorecard.innings_1.totalRuns + " (" + this.fullscorecard.innings_1.totalWickets + " wkts, " + this.fullscorecard.innings_1.totalOvers + "ov)"
                    this.fallOfWicketsInnings1 = ''
                    for (let fallWickets in this.fullscorecard.innings_1.fallOfWickets) {
                        if (this.fallOfWicketsInnings1)
                            this.fallOfWicketsInnings1 = this.fallOfWicketsInnings1 + ' , ' + this.fullscorecard.innings_1.fallOfWickets[fallWickets]
                        else
                            this.fallOfWicketsInnings1 = this.fullscorecard.innings_1.fallOfWickets[fallWickets]
                    }
                    this.BowlingInning1 = []
                    for (let player in this.fullscorecard.innings_1.Bowling) {
                        if ((this.fullscorecard.innings_1.Bowling[player].over % 1).toFixed(2) == "0.60")
                            this.fullscorecard.innings_1.Bowling[player].over = Math.round(this.fullscorecard.innings_1.Bowling[player].over)
                        this.BowlingInning1.push(this.fullscorecard.innings_1.Bowling[player])
                    }
                    this.battingInning2 = []
                    for (let player in this.fullscorecard.innings_2.batting) {
                        if (this.fullscorecard.innings_2.batting[player].position) {
                            this.battingInning2.push(this.fullscorecard.innings_2.batting[player])
                        }
                    }
                    this.battingInning2.sort((a, b) => (a.position > b.position) ? 1 : -1)

                    this.extrasInning2 = this.fullscorecard.innings_2.extras.byes + this.fullscorecard.innings_2.extras.legByes + this.fullscorecard.innings_2.extras.wide + this.fullscorecard.innings_2.extras.noBall + this.fullscorecard.innings_2.extras.pnlt
                    this.extrasInning2 = this.extrasInning2 + ' ('
                    if (this.fullscorecard.innings_2.extras.byes)
                        this.extrasInning2 = this.extrasInning2 + "B " + this.fullscorecard.innings_2.extras.byes + ","
                    if (this.fullscorecard.innings_2.extras.legByes)
                        this.extrasInning2 = this.extrasInning2 + " LB " + this.fullscorecard.innings_2.extras.legByes + ","
                    if (this.fullscorecard.innings_2.extras.wide)
                        this.extrasInning2 = this.extrasInning2 + " W " + this.fullscorecard.innings_2.extras.wide + ","
                    if (this.fullscorecard.innings_2.extras.noBall)
                        this.extrasInning2 = this.extrasInning2 + " NB " + this.fullscorecard.innings_2.extras.noBall + ","
                    if (this.fullscorecard.innings_2.extras.pnlt)
                        this.extrasInning2 = this.extrasInning2 + " P " + this.fullscorecard.innings_2.extras.pnlt
                    if (this.extrasInning2[this.extrasInning2.length - 1] == ',')
                        this.extrasInning2 = this.extrasInning2.slice(0, -1);
                    this.extrasInning2 = this.extrasInning2 + ')'
                    if (this.extrasInning2 == "0 ()")
                        this.extrasInning2 = ''

                    if ((this.fullscorecard.innings_2.totalOvers % 1).toFixed(2) == "0.60")
                        this.fullscorecard.innings_2.totalOvers = Math.round(this.fullscorecard.innings_2.totalOvers)
                    this.totalRunInning2 = this.fullscorecard.innings_2.totalRuns + "(" + this.fullscorecard.innings_2.totalWickets + " wkts, " + this.fullscorecard.innings_2.totalOvers + " ov)"
                    this.yetToBatInning2 = ''
                    for (let yetToBat in this.fullscorecard.innings_2.yetToBat) {
                        if (this.yetToBatInning2)
                            this.yetToBatInning2 = this.yetToBatInning2 + ' , ' + this.fullscorecard.innings_2.yetToBat[yetToBat]
                        else
                            this.yetToBatInning2 = this.fullscorecard.innings_2.yetToBat[yetToBat]
                    }
                    this.fallOfWicketsInnings2 = ''
                    for (let fallWickets in this.fullscorecard.innings_2.fallOfWickets) {
                        if (this.fallOfWicketsInnings2)
                            this.fallOfWicketsInnings2 = this.fallOfWicketsInnings2 + ' , ' + this.fullscorecard.innings_2.fallOfWickets[fallWickets]
                        else
                            this.fallOfWicketsInnings2 = this.fullscorecard.innings_2.fallOfWickets[fallWickets]
                    }

                    this.BowlingInning2 = []
                    for (let player in this.fullscorecard.innings_2.Bowling) {
                        if ((this.fullscorecard.innings_2.Bowling[player].over % 1).toFixed(2) == "0.60")
                            this.fullscorecard.innings_2.Bowling[player].over = Math.round(this.fullscorecard.innings_2.Bowling[player].over)
                        this.BowlingInning2.push(this.fullscorecard.innings_2.Bowling[player])
                    }

                })
                .catch(err => {})
        }
    }
}
</script>

<style>
.pastMatch {
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

.score-card {
    font-weight: 500
}

.text-left {
    text-align: left;
}

.cb-font-14 {
    font-size: 14px;
}

.bottom-border {
    border-bottom: 1px solid #e6e6e6 !important;
}

table {
    border-collapse: collapse;
}

tr.bottom-border {
    border-bottom: 1px solid #e6e6e6 !important;
}

.padding-10 {
    padding: 10px !important;
}
.text-bold{
    font-weight: bold;
}
</style>
