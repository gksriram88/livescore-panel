<template>
<el-card class="score-card" body-style="padding:0px" shadow="always">
    <div slot="header" style="height: auto;" v-if="this.$store.state.showScoreCard">
        <h4 class="scoreCard">{{this.$store.state.scoreCardHeader.battingTeam}}</h4>
        <h4 class="scoreCard">{{this.$store.state.scoreCardHeader.runs + "/" + this.$store.state.scoreCardHeader.wickets + "(" + this.$store.state.scoreCardHeader.over + " ovs)"}}</h4>
        <h4 class="scoreCard">{{this.$store.state.scoreCardHeader.currentRunRate}}(CRR)</h4>
        <h4 class="scoreCard" v-if="this.$store.state.scoreCard.req_rate">{{this.$store.state.scoreCard.req_rate}}(RR)</h4>
        <h4 class="scoreCard" v-if="this.$store.state.scoreCardHeader.rvsOver">(rvs Over {{this.$store.state.scoreCardHeader.rvsOver}})</h4>
        <h4 class="scoreCard" v-if="this.$store.state.scoreCardHeader.extras">extras : {{this.$store.state.scoreCardHeader.extras}}</h4>
        <span class="scoreCard" style="float:right; margin-top: 20px; padding-right:20px;"><a :href="'http://18.220.191.122:8082/fullscorecard/'+this.$store.state.scoreCard.match_id"  target="_blank">Fullscore Card</a></span>
        <span class="scoreCard" style="float:left; margin-top: 20px; padding-right:20px;"  v-if="this.$store.state.scoreCardHeader.targetScore"> Target {{this.$store.state.scoreCardHeader.targetScore}} runs on {{this.$store.state.scoreCardHeader.remainingballs}} balls</span>
    </div>
    <el-row>
        <el-col :span="10" v-if="this.$store.state.showScoreCard">
            <table style="width:100% ; font-size:12px;">
                <tr style=" background-color: #eee;">
                    <th>Batsman</th>
                    <th>R</th>
                    <th>B</th>
                    <th>4s</th>
                    <th>6s</th>
                    <th>SR</th>
                </tr>
                <tr v-if="this.$store.state.highlight1stCol" style="background-color: lightskyblue;">
                    <td>{{this.$store.state.playersName.strikerName}}</td>
                    <td>{{this.$store.state.scoreCard.striker_run}}</td>
                    <td>{{this.$store.state.scoreCard.striker_balls}}</td>
                    <td>{{this.$store.state.scoreCard.striker_4}}</td>
                    <td>{{this.$store.state.scoreCard.striker_6}}</td>
                    <td>{{this.$store.state.scoreCard.striker_strikerate}}</td>
                </tr>
                <tr v-else>
                    <td>{{this.$store.state.playersName.strikerName}}</td>
                    <td>{{this.$store.state.scoreCard.striker_run}}</td>
                    <td>{{this.$store.state.scoreCard.striker_balls}}</td>
                    <td>{{this.$store.state.scoreCard.striker_4}}</td>
                    <td>{{this.$store.state.scoreCard.striker_6}}</td>
                    <td>{{this.$store.state.scoreCard.striker_strikerate}}</td>
                </tr>
                <tr v-if="this.$store.state.highlight2ndCol" style="background-color: lightskyblue;">
                    <td>{{this.$store.state.playersName.nonstrikerName}}</td>
                    <td>{{this.$store.state.scoreCard.non_striker_run}}</td>
                    <td>{{this.$store.state.scoreCard.non_striker_balls}}</td>
                    <td>{{this.$store.state.scoreCard.non_striker_4}}</td>
                    <td>{{this.$store.state.scoreCard.non_striker_6}}</td>
                    <td>{{this.$store.state.scoreCard.non_striker_strikerate}}</td>
                </tr>
                <tr v-else>
                    <td>{{this.$store.state.playersName.nonstrikerName}}</td>
                    <td>{{this.$store.state.scoreCard.non_striker_run}}</td>
                    <td>{{this.$store.state.scoreCard.non_striker_balls}}</td>
                    <td>{{this.$store.state.scoreCard.non_striker_4}}</td>
                    <td>{{this.$store.state.scoreCard.non_striker_6}}</td>
                    <td>{{this.$store.state.scoreCard.non_striker_strikerate}}</td>
                </tr>
                <tr style=" background-color: #eee;">
                    <th>Bowler</th>
                    <th>O</th>
                    <th>R</th>
                    <th>M</th>
                    <th>W</th>
                    <th>EC</th>
                </tr>
                <tr>
                    <td>{{this.$store.state.playersName.curBowlerName}}</td>
                    <td v-if="(this.$store.state.scoreCard.cur_bowler_over % 1).toFixed(2) == '0.60'">{{Math.round(this.$store.state.scoreCard.cur_bowler_over)}}</td>
                    <td v-else>{{this.$store.state.scoreCard.cur_bowler_over}}</td>
                    <td>{{this.$store.state.scoreCard.cur_bowler_run}}</td>
                    <td>{{this.$store.state.scoreCard.cur_bowler_mai}}</td>
                    <td>{{this.$store.state.scoreCard.cur_bowler_wic}}</td>
                    <td>{{this.$store.state.scoreCard.cur_bowler_eco}}</td>
                </tr>
                <tr v-if="this.$store.state.playersName.prvBowlerName">
                    <td>{{this.$store.state.playersName.prvBowlerName}}</td>
                    <td v-if="(this.$store.state.scoreCard.prv_bowler_over % 1).toFixed(2) == '0.60'">{{Math.round(this.$store.state.scoreCard.prv_bowler_over)}}</td>
                    <td v-else>{{this.$store.state.scoreCard.prv_bowler_over}}</td>
                    <td>{{this.$store.state.scoreCard.prv_bowler_run}}</td>
                    <td>{{this.$store.state.scoreCard.prv_bowler_mai}}</td>
                    <td>{{this.$store.state.scoreCard.prv_bowler_wic}}</td>
                    <td>{{this.$store.state.scoreCard.prv_bowler_eco}}</td>
                </tr>
            </table>
        </el-col>
        <el-col :span="14">
            <el-row style="margin-top: 12px;">
                <el-col :span="8">
                    <span style="margin-left:30px;"><b><u>Quick Score</u></b></span>
                </el-col>
                <el-col :span="8">
                    <span v-if="quickScore">{{this.$store.state.quickScore}}</span>
                    <span v-else>Please add Score</span>
                </el-col>
                <el-col :span="8">
                    <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="dialogVisibleQuickScore=true" v-if="quickScore"></el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <p>Run</p>
                </el-col>
                <el-col :span="20">
                    <el-radio-group v-model="strikerScore" style="margin-top:10px;">
                        <el-radio-button v-for="item in score" :key="item.id" :label="item.name" :value="item.value" :disabled="!item.status"></el-radio-button>
                    </el-radio-group>
                    <el-button size="mini" type="primary" @click="UpdateQuickScore()" v-if="strikerScore">Submit</el-button>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
    <el-dialog title="Quick Score" :visible.sync="dialogVisibleQuickScore" width="50%" style="text-align:center;" :show-close="!dialogVisibleQuickScore" :close-on-click-modal="!dialogVisibleQuickScore" :close-on-press-escape="!dialogVisibleQuickScore">
        <div class="col-player">
            <h4>{{battingTeam}}</h4>
            <el-row :gutter="10">
                <el-col :span="8">
                    <div><span style="padding-top:10px">Score</span></div>
                </el-col>
                <el-col :span="16">
                    <el-input class="revised-input" placeholder="EX: 120" v-model="scoreTotal" clearable max=4>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <div> <span>Wicket</span></div>
                </el-col>
                <el-col :span="16">
                    <el-input class="revised-input" placeholder="EX: 2" v-model="wicket" clearable max=3>
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <div> <span>Over</span></div>
                </el-col>
                <el-col :span="16">
                    <el-input class="revised-input" placeholder="EX: 2.4" v-model="over" clearable max=3>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleQuickScore = false">Cancel</el-button>
            <el-button type="primary" @click="UpdateQuickScore()">Update</el-button>
        </span>
    </el-dialog>
    <div class="last10-col-1" v-if="this.$store.state.showScoreCard">
        <span :class="last10ScoreClass(score)" v-for="(score , index) in this.$store.state.scoreCardHeader.last10Score" :key="index" >{{score}}</span>
    </div>
</el-card>
</template>

<script>
import quickscorecard from '../api-services/quickscorecard.service'
export default {
    name: "sidemenu",
    data() {
        return {
            scoreCardHeader: false,
            dialogVisibleQuickScore: false,
            strikerScore: '',
            scoreTotal: '',
            wicket: '',
            over: '',
            timeOut: '',
            battingTeam: '',
            quickScore: '',
            team_enum: {},
            score: [{
                    "id": 1,
                    "name": '.',
                    "status": true
                },
                {
                    "id": 2,
                    "name": 1,
                    "status": true
                },
                {
                    "id": 3,
                    "name": 2,
                    "status": true
                },
                {
                    "id": 4,
                    "name": 3,
                    "status": true
                },
                {
                    "id": 5,
                    "name": 4,
                    "status": true
                },
                {
                    "id": 6,
                    "name": 5,
                    "status": true
                },
                {
                    "id": 7,
                    "name": 6,
                    "status": true
                },
                {
                    "id": 8,
                    "name": 7,
                    "status": true
                },
                {
                    "id": 9,
                    "name": 8,
                    "status": true
                },
                {
                    "id": 10,
                    "name": 'W',
                    "status": true
                }
            ]
        }
    },
    methods: {
        last10ScoreClass(score) {
            if ((score.includes("W") && !score.includes("Wd")) || score.includes("+W"))
                return "circle-red"
            else if (score.includes("Wd") || score.includes("NB") || score.includes("B") || score.includes("L"))
                return "circle-blue"
            else if (score == 4 || score == 6)
                return "circle-green"
            else if (score == '|')
                return ""
            else
                return "circle-grey"
        },
        getQuickScoreCard() {
            if (this.$store.state.scoreCard.match_id) {
                quickscorecard.getQuickCard(this.$store.state.scoreCard.match_id)
                    .then(res => {
                        this.quickScore = res.data.data
                        this.$store.commit('changequickScore', this.quickScore)
                        this.battingTeam = this.quickScore.substring(0, this.quickScore.indexOf("-") + 1).trim();
                        this.scoreTotal = this.quickScore.substring(this.quickScore.indexOf("-") + 1, this.quickScore.indexOf("/")).trim();
                        this.wicket = this.quickScore.substring(this.quickScore.indexOf("/") + 1, this.quickScore.indexOf("(")).trim();
                        this.over = this.quickScore.substring(this.quickScore.indexOf("(") + 1, this.quickScore.indexOf(")")).trim();
                    })
                    .catch(err => {
                        console.log(err)
                    })

            } else {
                this.timeOut = window.setTimeout(this.getQuickScoreCard, 100)
            }
        },
        UpdateQuickScore() {
            let key;
            this.battingTeam = this.$store.state.battingTeam;
            if (this.strikerScore) {
                this.quickScore = this.$store.state.quickScore
                this.scoreTotal = this.quickScore.substring(this.quickScore.indexOf("-") + 1, this.quickScore.indexOf("/")).trim();
                this.wicket = this.quickScore.substring(this.quickScore.indexOf("/") + 1, this.quickScore.indexOf("(")).trim();
                this.over = this.quickScore.substring(this.quickScore.indexOf("(") + 1, this.quickScore.indexOf(")")).trim();
                if (this.strikerScore == "W")
                    this.wicket = parseInt(this.wicket) + 1
                else if (this.strikerScore > 0 && this.strikerScore != '.')
                    this.scoreTotal = parseInt(this.scoreTotal) + this.strikerScore
                this.over = parseFloat(this.over)
                if ((this.over % 1).toFixed(2) == "0.60") {
                    this.over = Math.trunc(this.over) + 1.1
                } else {
                    this.over = Math.round((this.over + 0.1) * 1e1) / 1e1
                }
                key = this.battingTeam + "- " + this.scoreTotal + "/" + this.wicket + "(" + this.over + ")"

            } else {
                key = this.battingTeam + "- " + this.scoreTotal + "/" + this.wicket + "(" + this.over + ")"
            }
            let payload = {
                "match_id": this.$store.state.scoreCard.match_id,
                "key": key
            }
            if (this.over != '' && this.scoreTotal != '' && this.wicket != '') {
            quickscorecard.updateQuickCard(payload)
                .then(res => {
                    this.quickScore = key
                    this.$store.commit('changequickScore', this.quickScore)
                    this.strikerScore = ''
                    this.dialogVisibleQuickScore = false
                    this.$notify({
                        title: 'Success',
                        message: 'Score Updated Successfully',
                        type: 'success'
                    });
                })
                .catch(err => {
                    this.dialogVisibleQuickScore = false
                    this.$notify({
                        title: 'Error',
                        message: 'Server Error,Plase try again',
                        type: 'error'
                    });
                })
                 } else {
                this.$notify({
                    title: 'Error',
                    message: 'Please Enter Total Score ,Over and wicket',
                    type: 'error'
                });
            }

        }
    },
    created() {
        if (this.$store.state.scoreCard.match_id)
            this.getQuickScoreCard()
        else {
            this.timeOut = window.setTimeout(this.getQuickScoreCard, 100)
        }
        if (this.$store.state.scoreCardHeader.battingTeam)
            this.scoreCardHeader = true
        else
            this.scoreCardHeader = false
    }
}
</script>

<style>
.last10-col-1 {
    border-top: 5px Solid #e6e6e6;
    padding: 10px;
}

.circle-grey {
    background: #e3e3e3;
    padding: 0.2rem 0.6rem;
    text-align: center;
    text-transform: uppercase;
    font-size: 14px;
    border-radius: 1.2rem;
    font-weight: bold;
    margin: 12px;
}

.circle-green {
    padding: 0.2rem 0.6rem;
    font-size: 14px;
    text-align: center;
    background: #20801e;
    color: #FFFFFF;
    border-radius: 1.2rem;
    font-weight: bold;
    margin: 12px;
}

.circle-red {
    background: #af0e1e;
    padding: 0.2rem 0.6rem;
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    color: #fff;
    border-radius: 1.2rem;
    font-weight: bold;
    margin: 12px;
}

.circle-blue {
    background: #2171f2;
    padding: 0.2rem 0.3rem;
    text-transform: uppercase;
    text-align: center;
    font-size: 12px;
    text-transform: uppercase;
    color: #fff;
    border-radius: 1.2rem;
    font-weight: bold;
    margin: 12px;
}

.score-card {
    width: auto;
}

.el-card__header {
    padding: 0px
}

h4.scoreCard,
h5.batsman {
    display: inline-block;
    padding-left: 5px;
    padding-right: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.quickScore {
    background-color: lightcyan;
}
</style>
