<template>
<div id="panel" style="border-top: 10px solid #ecebeb; background-color: white;" v-loading="loading" element-loading-text="Updating..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div v-if="lockScreen">
        <el-button @click="unlockScreen()">Unlock Panel</el-button>
    </div>
    <div v-loading="lockScreen" element-loading-text="Click Unlock to unlock" element-loading-spinner="el-icon-lock" element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-row :gutter="50" style="margin-top: 10px;">
            <el-col :span="16">
                <el-button size="mini" type="info" @click="onChageInnings()" :disabled="inningsStatus">Change Innings</el-button>
                <el-button size="mini" type="primary" @click="onSuperOver()" v-if="superOver">Super Over</el-button>
                <el-button size="mini" type="primary" @click="dialogFormVisibleMatchStatus = true">Match Status</el-button>
                <el-button size="mini" type="primary" @click="undo()" v-if="matchStart">Undo</el-button>
                <el-button size="mini" type="primary" @click="dialogVisibleRetired = true" v-if="matchStart">Retired</el-button>
                <el-button size="mini" type="primary" @click="getOverList()" v-if="matchStart">Penalty</el-button>
                <el-button size="mini" type="primary" @click="dialogVisibleRevised = true" v-if="matchStart">Revised</el-button>
                <el-button size="mini" type="primary" @click="dialogVisibleSub = true" v-if="matchStart">Substitute</el-button>
                <span class="blinking" v-if="superOverValue" style="margin-left:15px;">SUPER OVER</span>
            </el-col>
            <el-col :span="4">
                <span style="margin-right: 10px;font-weight:500;">{{this.match_status_name}}</span>
            </el-col>
            <el-col :span="4">
                <el-button size="mini" type="danger" @click="dialogVisibleMatchEnd = true">End Match</el-button>
            </el-col>
        </el-row>
        <el-dialog title="Match Status" :visible.sync="dialogFormVisibleMatchStatus" width="80%" style="text-align:center;" :show-close="!dialogFormVisibleMatchStatus" :close-on-click-modal="!dialogFormVisibleMatchStatus" :close-on-press-escape="!dialogFormVisibleMatchStatus">
            <div class="col-player">
                <el-radio-group v-model="match_status_name">
                    <el-radio-button v-for="item in match_status" :key="item.id" :label="item.name" :value="item.id"></el-radio-button>
                </el-radio-group>
                <el-button @click="addOtherMatchStatus = true">Others</el-button>
                <el-input placeholder="Enter Match Status" v-model="otherMatchStatus" clearable v-if="addOtherMatchStatus">
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="cancelMatchStatus">Cancel</el-button>
            <el-button type="primary" @click="addMatchStatus(false)">Save</el-button>
            <el-button type="primary" @click="addMatchStatus(true)">Save & Lock Panel</el-button>
        </span>
        </el-dialog>
        <el-dialog title="Choose ball and team to add penalty" :visible.sync="dialogVisiblePenalty" width="95%" style="text-align:center;" :show-close="!dialogVisiblePenalty" :close-on-click-modal="!dialogVisiblePenalty" :close-on-press-escape="!dialogVisiblePenalty">
            <div class="col-player">
                <div>
                    <span><b>Innings {{this.innings}}</b></span>
                </div>
                <!-- <div class="over"> -->
                <!-- <span style="padding:10px;">Innings {{this.innings}}</span> -->
                <!-- <el-select v-model="innings" placeholder="Select" v-on:change="OnchangeInnings">
                        <el-option label=1 value=1>
                        </el-option>
                        <el-option label=2 value=2>
                        </el-option>
                    </el-select> -->
                <!-- </div> -->
                <div class="over">
                    <span style="padding:10px;">Over </span>
                    <el-select v-model="over" placeholder="Select" v-on:change="OnchangeOver">
                        <el-option v-for="item in lastOver" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div class="over">
                    <span style="padding:10px;">Ball </span>
                    <el-select v-model="ball" placeholder="Select" v-on:change="OnchangeBall">
                        <el-option v-for="item in ballList" :key="item.id" :label="item.over" :value="item.ball_id">
                        </el-option>
                    </el-select>
                </div>
                <div class="over">
                    <el-radio-group v-model="penaltyType" style="margin-left:30px;">
                        <el-radio-button :label="batingTeam"></el-radio-button>
                        <el-radio-button :label="bowlingTeam"></el-radio-button>
                    </el-radio-group>
                </div>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div><span>Add reason for Penalty </span></div>
                    </el-col>
                    <el-col :span="16">
                        <el-input type="textarea" :rows="2" v-model="penaltyCommentary">
                        </el-input>
                    </el-col>
                </el-row>
                <!-- <div>
                    <span><b>{{this.penaltyCommentary}}</b></span>
                </div> -->
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisiblePenalty = false">Cancel</el-button>
            <el-button type="primary" @click="penalty()">Add Penalty</el-button>
        </span>
        </el-dialog>
        <el-dialog title="Choose Sub Player" :visible.sync="dialogVisibleSub" :show-close="!dialogVisibleSub" :close-on-click-modal="!dialogVisibleSub" :close-on-press-escape="!dialogVisibleSub" width="80%" style="text-align:center;">
            <div class="col-player">
                <div style="margin-top: 20px">
                    Field Players
                    <el-radio-group v-model="player_main">
                        <el-radio-button v-for="item in field_players" :key="item.id" :label="item.name" :value="item.id"></el-radio-button>
                    </el-radio-group>
                </div>
                <div style="margin-top: 20px">
                    Substitute Players
                    <el-radio-group v-model="player_sub">
                        <el-radio-button v-for="item in sub_players" :key="item.id" :label="item.name" :value="item.id"></el-radio-button>
                    </el-radio-group>
                </div>
                <div style="margin-top: 20px">
                    <el-row>
                        <el-col :span="6">
                            <div><span style="padding-top:10px;">Add reason for Substitute </span></div>
                        </el-col>
                        <el-col :span="2">
                            <div><span style="padding-top:10px;">::</span></div>
                        </el-col>
                        <el-col :span="16">
                            <el-input type="textarea" :rows="2" v-model="subPlayerCommentary">
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleSub = false">Cancel</el-button>
            <el-button type="primary" @click="addSubPlayer">Ok</el-button>
        </span>
        </el-dialog>
        <el-dialog title="Choose Batsman to retire" :visible.sync="dialogVisibleRetired" width="80%" style="text-align:center;" :show-close="!dialogVisibleRetired" :close-on-click-modal="!dialogVisibleRetired" :close-on-press-escape="!dialogVisibleRetired">
            <div class="col-player">
                <div class="col-player">
                    <el-radio-group v-model="activeRetirePlayer">
                        <el-radio :label="1">BatsMan</el-radio>
                        <el-radio :label="2">Bowler </el-radio>
                    </el-radio-group>
                </div>
                <div style="padding:10px">
                    <el-radio-group v-model="retiredname" v-if="activeRetirePlayer==1">
                        <el-radio-button :label="this.striker"></el-radio-button>
                        <el-radio-button :label="this.nonStriker"></el-radio-button>
                    </el-radio-group>
                    <el-radio-group v-model="retiredname" v-if="activeRetirePlayer==2">
                        <el-radio-button :label="this.currentBowler"></el-radio-button>
                    </el-radio-group>
                </div>
                <div style="padding:10px">
                    <el-row>
                        <el-col :span="6">
                            <div><span style="padding-top:10px;">Add reason for Retired </span></div>
                        </el-col>
                        <el-col :span="2">
                            <div><span style="padding-top:10px;">::</span></div>
                        </el-col>
                        <el-col :span="10">
                            <el-input type="textarea" :rows="2" v-model="retiredPlayerCommentary">
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <div></div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleRetired = false">Cancel</el-button>
            <el-button type="primary" @click="retired()">Ok</el-button>
        </span>
        </el-dialog>
        <el-dialog title="Revised" :visible.sync="dialogVisibleRevised" width="50%" style="text-align:center;" :show-close="!dialogVisibleRevised" :close-on-click-modal="!dialogVisibleRevised" :close-on-press-escape="!dialogVisibleRevised">
            <div class="col-player">
                <el-row :gutter="10" v-if="card.innings == 2">
                    <el-col :span="12">
                        <div><span style="padding-top:10px">1st Innings target</span></div>
                    </el-col>
                    <el-col :span="12">
                        <el-input class="revised-input" placeholder="EX: 120" v-model="rvs_a_target" clearable max=4>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div> <span>1st Innings Over</span></div>
                    </el-col>
                    <el-col :span="16">
                        <el-input class="revised-input" placeholder="EX: 20" v-model="rvs_a_over" clearable max=3>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div> <span>2st Innings Over</span></div>
                    </el-col>
                    <el-col :span="16">
                        <el-input class="revised-input" placeholder="EX: 20" v-model="rvs_b_over" clearable max=3>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div><span>Add reason for Revised </span></div>
                    </el-col>
                    <el-col :span="16">
                        <el-input type="textarea" :rows="2" v-model="revisedCommentary">
                        </el-input>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleRevised = false">Cancel</el-button>
            <el-button type="primary" @click="revised()">Ok</el-button>
        </span>
        </el-dialog>
        <div class="player-selection-div">
            <div class="players">
                Current Bowler : {{this.currentBowler}}
            </div>
            <div class="players" style="background-color: lightskyblue;">
                <font color="red">*</font> Striker : {{this.striker}}
            </div>
            <div class="players">
                Non Striker : {{this.nonStriker}}
            </div>
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="onPlayerSelection" style="margin-left:15px"></el-button>
        </div>
        <el-dialog title="Player Selection" :visible.sync="dialogFormVisible" width="80%" style="text-align:center;" :show-close="!dialogFormVisible" :close-on-click-modal="!dialogFormVisible" :close-on-press-escape="!dialogFormVisible" v-loading="loadingInnings" element-loading-text="Loading..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <div class="col-player">
                <h2>{{this.bowlingTeam}}</h2>
                Current Bowler
                <el-radio-group v-model="currentBowler">
                    <el-radio-button v-for="item in bowling_players" :key="item.id" :label="item.name" :value="item.id" :disabled="!item.selected"></el-radio-button>
                </el-radio-group>
            </div>
            <div class="col-player">
                <h2>{{this.batingTeam}}</h2>
                <div style="margin-top: 20px">
                    Striker
                    <el-radio-group v-model="striker">
                        <el-radio-button v-for="item in striker_players" :key="item.id" :label="item.name" :value="item.id" :disabled="!item.selected"></el-radio-button>
                    </el-radio-group>
                </div>
                <div style="margin-top: 20px">
                    Non Striker
                    <el-radio-group v-model="nonStriker">
                        <el-radio-button v-for="item in non_striker_players" :key="item.id" :label="item.name" :value="item.id" :disabled="!item.selected"></el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="cancelPlayerSelection" v-if="matchStart">Cancel</el-button>
            <el-button type="primary" @click="addPlayerSelection">Ok</el-button>
        </span>
        </el-dialog>
        <el-dialog title="Player Selection" :visible.sync="dialogFormVisibleBowler" :show-close="!dialogFormVisibleBowler" :close-on-click-modal="!dialogFormVisibleBowler" :close-on-press-escape="!dialogFormVisibleBowler" width="80%" style="text-align:center;">
            <div class="col-player">
                <h2>{{this.bowlingTeam}}</h2>
                Current Bowler
                <el-radio-group v-model="currentBowler">
                    <el-radio-button v-for="item in bowling_players" :key="item.id" :label="item.name" :value="item.id" :disabled="!item.selected"></el-radio-button>
                </el-radio-group>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addCurrentBowler">Ok</el-button>
        </span>
        </el-dialog>
        <el-dialog title="Player Selection" :visible.sync="dialogFormVisibleBatting" :show-close="!dialogFormVisibleBatting" :close-on-click-modal="!dialogFormVisibleBatting" :close-on-press-escape="!dialogFormVisibleBatting" width="80%" style="text-align:center;">
            <div class="col-player">
                <h2>{{this.batingTeam}}</h2>
                <div style="margin-top: 20px">
                    Striker
                    <el-radio-group v-model="striker">
                        <el-radio-button v-for="item in striker_players" :key="item.id" :label="item.name" :value="item.id" :disabled="!item.selected"></el-radio-button>
                    </el-radio-group>
                </div>
                <div style="margin-top: 20px">
                    Non Striker
                    <el-radio-group v-model="nonStriker">
                        <el-radio-button v-for="item in non_striker_players" :key="item.id" :label="item.name" :value="item.id" :disabled="!item.selected"></el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addStrikerNonStriker">Ok</el-button>
        </span>
        </el-dialog>
        <el-dialog title="Warning" :visible.sync="dialogVisibleMatchEnd" :show-close="!dialogVisibleMatchEnd" :close-on-click-modal="!dialogVisibleMatchEnd" :close-on-press-escape="!dialogVisibleMatchEnd" width="50%" center>
            <span>Are you sure want to end the MATCH !</span>
            <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEndMatch()">Cancel</el-button>
        <el-button type="primary" @click="endMatch()">Confirm</el-button></span>
        </el-dialog>
        <el-dialog title="ERROR" :visible.sync="dialogNetworkIssue" :show-close="!dialogNetworkIssue" :close-on-click-modal="!dialogNetworkIssue" :close-on-press-escape="!dialogNetworkIssue" width="50%" center>
            <span>Not connected to internet please retry. </span>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkNetwork()">Retry</el-button></span>
        </el-dialog>
        <div style="margin-top: 20px">
            Ball Type
            <el-radio-group v-model="ballTypeValue" :disabled="ballTypeStatus" style="margin-left:10px;">
                <el-radio-button v-for="item in balltype" :key="item.id" :label="item.name" :value="item.id"></el-radio-button>
            </el-radio-group>
        </div>
        <div style="margin-top: 20px">
            Shot Type
            <el-radio-group v-model="shot_type" :disabled="shotTypeStatus" style="margin-left:10px;">
                <el-radio-button v-for="item in shottype" :key="item.id" :label="item.name" :value="item.id"></el-radio-button>
            </el-radio-group>
        </div>
        <div style="margin-top: 20px">
            Field Position
            <el-radio-group v-model="fieldPositionValue" :disabled="fieldPositionStatus" style="margin-left:10px;">
                <el-radio-button v-for="item in fieldPosition" :key="item.id" :label="item.name" :value="item.id"></el-radio-button>
            </el-radio-group>
        </div>
        <div style="margin-top: 20px">
            Run
            <el-radio-group v-model="strikerScore" :disabled="strikerScoreStatus" style="margin-left:10px;">
                <el-radio-button v-for="item in score" :key="item.id" :label="item.name" :value="item.value" :disabled="!item.status"></el-radio-button>
            </el-radio-group>
        </div>
        <div style="margin-top: 20px">
            Out
            <el-radio-group v-model="outPlayer" :disabled="outPlayerStatus" style="margin-left:10px;">
                <el-radio-button label="Striker" value=1></el-radio-button>
                <el-radio-button label="Non Striker" value=2></el-radio-button>
            </el-radio-group>
            <el-radio-group v-model="outType" :disabled="outTypeStatus" style="margin-left:30px;">
                <el-radio-button v-for="item in out" :key="item.id" :label="item.name" :value="item.id" :disabled="!item.status"></el-radio-button>
            </el-radio-group>
            <el-button type="danger" icon="el-icon-delete" circle size="mini" :disabled="outTypeStatus" @click="resetOut()" style="margin-left:15px"></el-button>
        </div>
        <div style="margin-top: 20px">
            Field Player
            <el-radio-group v-model="fieldPlayer" :disabled="fieldPlayerStatus" style="margin-left:30px;">
                <el-radio-button v-for="item in field_players" :key="item.id" :label="item.name" :value="item.id"></el-radio-button>
            </el-radio-group>
            <el-button type="danger" icon="el-icon-delete" circle size="mini" :disabled="fieldPlayerStatus" @click="resetFieldPlayer()" style="margin-left:15px"></el-button>
        </div>
        <div style="margin-top: 20px; margin-bottom: 20px">
            Extra
            <el-radio-group v-model="extraValue" :disabled="extraStatus" style="margin-left:30px;">
                <el-radio-button v-for="item in extra" :key="item.id" :label="item.name" :value="item.id"></el-radio-button>
            </el-radio-group>
            <el-radio-group v-model="illegalBallType" :disabled="extraStatus" style="margin-left:30px;">
                <el-radio-button v-for="item in illegal_ball" :key="item.id" :label="item.name" :value="item.id"></el-radio-button>
            </el-radio-group>
            <el-button type="danger" icon="el-icon-delete" circle size="mini" :disabled="extraStatus" @click="resetExtra()" style="margin-left:15px"></el-button>
            <el-radio-group v-model="noBallType" v-if="illegalBallType=='No Ball'" style="margin-left:30px;">
                <el-radio-button label="Crease"></el-radio-button>
                <el-radio-button label="Others"></el-radio-button>
            </el-radio-group>
            <!-- <el-radio-group v-model="penaltyType" v-if="extraValue=='Penalty'" style="margin-left:30px;">
                <el-radio-button label="Bowling"></el-radio-button>
                <el-radio-button label="Batting"></el-radio-button>
            </el-radio-group> -->
        </div>
        <div style="border: 2px solid #eee; background-color:#e6e6ff ;padding:15px">
            <el-button type="primary" style="font-size:15px; font-weight:500;" @click="submitForm()" :disabled="submitButtonStatus">Submit</el-button>
            <el-button @click="resetForm()" style="font-size:15px; font-weight:500;">Reset</el-button>
        </div>
    </div>
</div>
</template>

<script>
import Axios from "axios";
import livescore from '../api-services/livescore.service'
import result from '../api-services/result.service'
import config from '../api-services/config.service'
import match from '../api-services/match.service'
import squad from '../api-services/squad.service'
import livestatus from '../api-services/livestatus.service'
import undo from '../api-services/undo.service'
import retired from '../api-services/retired.service'
import overlist from '../api-services/overlist.service'
import penalty from '../api-services/penalty.service'
import revised from '../api-services/revised.service'
import matchStatus from '../api-services/status.service'
import substitute from '../api-services/substitute.service'
import quickscorecard from '../api-services/quickscorecard.service'

import {
    handleUnauthorize
} from '../common/util.js'

export default {
    name: 'panel',
    data() {
        return {
            loading: false,
            timeOutID: '',
            matchStart: false,
            loadingInnings: false,
            dialogFormVisibleBowler: false,
            dialogFormVisibleBatting: false,
            dialogFormVisibleMatchStatus: false,
            dialogNetworkIssue: false,
            lockScreen: false,
            dialogVisibleRetired: false,
            dialogVisiblePenalty: false,
            dialogVisibleRevised: false,
            dialogVisibleSub: false,
            retiredname: '',
            retiredPlayerCommentary: '',
            penaltyCommentary: '',
            revisedCommentary: '',
            subPlayerCommentary: '',
            activeRetirePlayer: 1,
            dialogVisibleMatchEnd: false,
            dialogFormVisible: false,
            inningsStatus: false,
            inningsCount: 1,
            shotTypeStatus: true,
            ballTypeStatus: false,
            fieldPositionStatus: true,
            strikerScoreStatus: true,
            outPlayer: '',
            outPlayerStatus: true,
            outType: '',
            outTypeStatus: true,
            fieldPlayer: '',
            fieldPlayerStatus: true,
            extraValue: '',
            illegalBallType: '',
            noBallType: '',
            penaltyType: '',
            extraStatus: true,
            submitButtonStatus: true,
            freeHit: false,
            strikerScore: '',
            ballTypeValue: '',
            fieldPositionValue: '',
            otherMatchStatus: '',
            addOtherMatchStatus: false,
            bowling_players: [],
            field_players: [],
            sub_players: [],
            player_sub: '',
            player_main: '',
            team: [],
            superOver: false,
            superOverValue: false,
            matchdata: {},
            rvs_a_target: null,
            rvs_a_over: null,
            rvs_b_over: null,
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
                }
            ],
            extra: [{
                    "id": 1,
                    "name": "Byes",
                    "status": true
                },
                {
                    "id": 2,
                    "name": "Leg Byes",
                    "status": true
                },
                {
                    "id": 3,
                    "name": "1's",
                    "status": true
                },
                {
                    "id": 4,
                    "name": "2's",
                    "status": true
                },
                {
                    "id": 5,
                    "name": "3's",
                    "status": true
                },
                {
                    "id": 6,
                    "name": "4's",
                    "status": true
                },
                {
                    "id": 7,
                    "name": "5's",
                    "status": true
                },
                {
                    "id": 8,
                    "name": "6's",
                    "status": true
                }
            ],
            illegal_ball: [{
                    "id": 1,
                    "name": "Wide",
                    "status": true
                },
                {
                    "id": 2,
                    "name": "No Ball",
                    "status": true
                }
            ],
            team_enum: {},
            teamEnumShort: {},
            batting_players: [],
            out: [],
            shottype: [],
            balltype: [],
            balltype_spin: [],
            balltype_fast: [],
            balltype_common: [],
            fieldPosition: [],
            match_status: [],
            match_status_name: '',
            fieldPositionEnum: {},
            match_status_id: '',
            match_status_enum: {},
            card: {},
            currentRunRate: '',
            data: {},
            team_a_name: '',
            team_b_name: '',
            striker: '',
            nonStriker: '',
            striker_position: '',
            non_striker_position: '',
            ball_type: '',
            shot_type: '',
            striker_out: null,
            striker_wicket: null,
            non_striker_out: null,
            non_striker_wicket: null,
            bowling_checkList: [],
            striker_4_6: [],
            striker_score: 0,
            currentBowler: '',
            non_striker_players: [],
            striker_players: [],
            batingTeam: '',
            bowlingTeam: '',
            strikerSquad: [],
            nonStrikerSquad: [],
            tempStrikerScore: '',
            shottype_enum: {},
            innings: 1,
            over: '',
            lastOver: '',
            ball: '',
            ballList: [],
            apiResposeOverList: [],
            overListApiResponse: {},
            penaltyBallId: '',
            newBowler: {}
        };
    },
    methods: {
        submitForm() {
            this.loading = true
            let cur_bowler_id, cur_bowler_id_temp, currentOver, fieldPlayer_id = null
            let striker_name, nonStriker_name, balltypeID, shottypeID, key, recentArray, lastball, currentRun
            this.card.striker_name = this.striker
            this.card.non_striker_name = this.nonStriker
            this.card.cur_bowler_name = this.currentBowler
            this.card.field_player_name = this.fieldPlayer
            this.card.prv_bowler_name = ''
            this.card.prv_bowler_first_name = ''
            this.card.prv_bowler_last_name = ''
            cur_bowler_id_temp = this.card.cur_bowler
            this.freeHit = false
            this.card["field_player_sub"] = false
            this.card.field_pos = null
            if (this.strikerScore == '.') {
                this.strikerScore = 0
            }
            recentArray = this.card.recent.split(" ")
            if (recentArray.length > 1) {
                if (!recentArray[recentArray.length - 1].includes("+"))
                    lastball = recentArray[recentArray.length - 1].slice(-2)
                else
                    lastball = recentArray[recentArray.length - 1]
            }
            if (this.card.innings == 1)
                currentOver = this.card.team_a_over
            else
                currentOver = this.card.team_b_over
            if (lastball != 'NB+W' && lastball != 'Wd+W' && lastball != 'Wd' && lastball != "NB" && ((currentOver % 1).toFixed(2) == "0.60" || currentOver == 0) && (this.card.team_a_over != 0 || this.card.team_b_over != 0)) {
                this.card.recent = this.card.recent + " |"
            }
            recentArray = this.card.recent.split(" ")
            if ((recentArray.length - this.card.recent.replace(/[^|]/g, "").length) > 11) {
                recentArray.shift()
                if (recentArray[0] == '|') {
                    recentArray.shift()
                }
                this.card.recent = recentArray.join(' ')
            }
            for (key in this.striker_players) {
                if (this.striker_players[key]['name'] == this.striker) {
                    striker_name = this.striker_players[key]['id']
                    this.card.striker_batting_style = this.striker_players[key]['batting_style']
                    this.card.striker_first_name = this.striker_players[key]['first_name']
                    this.card.striker_last_name = this.striker_players[key]['last_name']
                }
                if (this.striker_players[key]['name'] == this.nonStriker) {
                    nonStriker_name = this.striker_players[key]['id']
                    this.card.non_striker_batting_style = this.striker_players[key]['batting_style']
                    this.card.non_striker_first_name = this.striker_players[key]['first_name']
                    this.card.non_striker_last_name = this.striker_players[key]['last_name']
                }
            }
            for (key in this.bowling_players) {
                if (this.bowling_players[key]['name'] == this.currentBowler) {
                    cur_bowler_id = this.bowling_players[key]['id']
                    this.card.cur_bowler_first_name = this.bowling_players[key]['first_name']
                    this.card.cur_bowler_last_name = this.bowling_players[key]['last_name']
                    this.card.cur_bowler_bowling_cat = this.bowling_players[key]['bowling_cat']
                    break
                }
                if (this.bowling_players[key]['id'] == this.card.prv_bowler) {
                    this.card.prv_bowler_name = this.bowling_players[key]['name']
                    this.card.prv_bowler_first_name = this.bowling_players[key]['first_name']
                    this.card.prv_bowler_last_name = this.bowling_players[key]['last_name']
                }
            }
            console.log(Object.keys(this.newBowler).length)
            console.log("llll")
            if(this.inningsStatus && this.card.team_b_over==0){
                console.log("if")
                this.card.prv_bowler = null
                this.card.prv_bowler_over = 0
                this.card.prv_bowler_eco = 0
                this.card.prv_bowler_mai = 0
                this.card.prv_bowler_wic = 0
                this.card.prv_bowler_run = 0
                this.card.prv_bowler_name =''
                this.card.prv_bowler_first_name = ''
                this.card.prv_bowler_last_name = ''
                this.card.cur_bowler_run = 0
                this.card.cur_bowler_over = 0
                this.card.cur_bowler_eco = 0
                this.card.cur_bowler_wic = 0
                this.card.cur_bowler_mai = 0
            }else if (cur_bowler_id_temp != cur_bowler_id && Object.keys(this.newBowler).length>0) {
                console.log("else")
                this.card.prv_bowler = this.card.cur_bowler
                this.card.prv_bowler_over = this.card.cur_bowler_over
                this.card.prv_bowler_eco = this.card.cur_bowler_eco
                this.card.prv_bowler_mai = this.card.cur_bowler_mai
                this.card.prv_bowler_wic = this.card.cur_bowler_wic
                this.card.prv_bowler_run = this.card.cur_bowler_run
                this.card.prv_bowler_name = this.card.cur_bowler_name
                this.card.prv_bowler_first_name = this.card.cur_bowler_first_name
                this.card.prv_bowler_last_name = this.card.cur_bowler_first_name
                this.card.cur_bowler_run = this.newBowler['cur_bowler_run']
                this.card.cur_bowler_over = this.newBowler['cur_bowler_over']
                this.card.cur_bowler_eco = this.newBowler['cur_bowler_eco']
                this.card.cur_bowler_wic = this.newBowler['cur_bowler_wic']
                this.card.cur_bowler_mai = this.newBowler['cur_bowler_mai']
            }
            for (key in this.bowling_players) {
                if (this.bowling_players[key]['id'] == this.card.prv_bowler) {
                    this.card.prv_bowler_name = this.bowling_players[key]['name']
                    this.card.prv_bowler_first_name = this.bowling_players[key]['first_name']
                    this.card.prv_bowler_last_name = this.bowling_players[key]['last_name']
                    break
                }
            }
            for (key in this.field_players) {
                if (this.field_players[key]['name'] == this.fieldPlayer) {
                    fieldPlayer_id = this.field_players[key]['id']
                    if (!this.field_players[key]['selected'])
                        this.card.field_player_sub = true
                    break
                }
            }
            for (key in this.balltype) {
                if (this.balltype[key]['name'] == this.ballTypeValue) {
                    balltypeID = this.balltype[key]['id']
                }
            }
            for (key in this.shottype) {
                if (this.shottype[key]['name'] == this.shot_type) {
                    shottypeID = this.shottype[key]['id']
                }
            }
            this.card.cur_bowler = cur_bowler_id
            if (this.extraValue) {
                if (this.extraValue.toLowerCase() == 'byes') {
                    if (this.illegalBallType.toLowerCase() == 'no ball') {
                        this.card.innings == 1 ? this.card.team_a_score = this.card.team_a_score + this.strikerScore + 1 : this.card.team_b_score = this.card.team_b_score + this.strikerScore + 1
                        this.card.run_scored = this.strikerScore + 1
                        this.card.byes = this.card.byes + this.strikerScore + 1
                        if (!this.outType) {
                            this.card.recent = this.card.recent + " B+NB"
                        }
                    } else {
                        this.card.innings == 1 ? this.card.team_a_score = this.card.team_a_score + this.strikerScore : this.card.team_b_score = this.card.team_b_score + this.strikerScore
                        this.card.run_scored = this.strikerScore
                        this.card.byes = this.card.byes + this.strikerScore
                        if (!this.outType) {
                            if (this.strikerScore != 0)
                                this.card.recent = this.card.recent + " " + this.strikerScore + "B"
                            else
                                this.card.recent = this.card.recent + " B"
                        }
                    }
                }
                if (this.extraValue.toLowerCase() == 'leg byes') {
                    if (this.illegalBallType.toLowerCase() == 'no ball') {
                        this.card.leg_byes = this.card.leg_byes + this.strikerScore + 1
                        this.card.innings == 1 ? this.card.team_a_score = this.card.team_a_score + this.strikerScore + 1 : this.card.team_b_score = this.card.team_b_score + this.strikerScore + 1
                        this.card.run_scored = this.strikerScore + 1
                        if (!this.outType) {
                            this.card.recent = this.card.recent + " L+NB"
                        }
                    } else {
                        this.card.leg_byes = this.card.leg_byes + this.strikerScore
                        this.card.innings == 1 ? this.card.team_a_score = this.card.team_a_score + this.strikerScore : this.card.team_b_score = this.card.team_b_score + this.strikerScore
                        this.card.run_scored = this.strikerScore
                        if (!this.outType) {
                            if (this.strikerScore != 0)
                                this.card.recent = this.card.recent + " " + this.strikerScore + "L"
                            else
                                this.card.recent = this.card.recent + " L"
                        }
                    }
                }
                // if (this.extraValue.toLowerCase() == 'penalty') {
                //     this.card.pnlt = this.card.pnlt + 5
                //     if (this.penaltyType.toLowerCase() == 'bowling') {
                //         this.card.innings == 1 ? this.card.team_a_score = this.card.team_a_score + 5 : this.card.team_b_score = this.card.team_b_score + 5
                //     } else if (this.penaltyType.toLowerCase() == 'batting') {
                //         this.card.innings == 1 ? this.card.team_a_score = this.card.team_a_score - 5 : this.card.team_b_score = this.card.team_b_score - 5
                //     }
                //     if (!this.outType)
                //         this.card.recent = this.card.recent + " 5P"
                // }
                if (this.extraValue == "1's") {
                    this.card.innings == 1 ? this.card.team_a_score = this.card.team_a_score + this.strikerScore + 1 : this.card.team_b_score = this.card.team_b_score + this.strikerScore + 1
                    this.card.run_scored = this.strikerScore + 1
                    this.card.striker_run = this.card.striker_run + this.strikerScore + 1
                    this.card.striker_balls = this.card.striker_balls + 1
                    this.card.cur_bowler_run = this.card.cur_bowler_run + this.strikerScore + 1
                    this.card.recent = this.card.recent + " 1"

                }
                if (this.extraValue == "2's") {
                    this.card.innings == 1 ? this.card.team_a_score = this.card.team_a_score + this.strikerScore + 2 : this.card.team_b_score = this.card.team_b_score + this.strikerScore + 2
                    this.card.run_scored = this.strikerScore + 2
                    this.card.striker_run = this.card.striker_run + this.strikerScore + 2
                    this.card.striker_balls = this.card.striker_balls + 1
                    this.card.cur_bowler_run = this.card.cur_bowler_run + this.strikerScore + 2
                    this.card.recent = this.card.recent + " 2"

                }
                if (this.extraValue == "3's") {
                    this.card.innings == 1 ? this.card.team_a_score = this.card.team_a_score + this.strikerScore + 3 : this.card.team_b_score = this.card.team_b_score + this.strikerScore + 3
                    this.card.run_scored = this.strikerScore + 3
                    this.card.striker_run = this.card.striker_run + this.strikerScore + 3
                    this.card.striker_balls = this.card.striker_balls + 1
                    this.card.cur_bowler_run = this.card.cur_bowler_run + this.strikerScore + 3
                    this.card.recent = this.card.recent + " 3"

                }
                if (this.extraValue == "4's") {
                    this.card.innings == 1 ? this.card.team_a_score = this.card.team_a_score + this.strikerScore + 4 : this.card.team_b_score = this.card.team_b_score + this.strikerScore + 4
                    this.card.run_scored = this.strikerScore + 4
                    this.card.striker_run = this.card.striker_run + this.strikerScore + 4
                    this.card.striker_balls = this.card.striker_balls + 1
                    this.card.cur_bowler_run = this.card.cur_bowler_run + this.strikerScore + 4
                    this.card.recent = this.card.recent + " 4"

                }
                if (this.extraValue == "5's") {
                    this.card.innings == 1 ? this.card.team_a_score = this.card.team_a_score + this.strikerScore + 5 : this.card.team_b_score = this.card.team_b_score + this.strikerScore + 5
                    this.card.run_scored = this.strikerScore + 5
                    this.card.striker_run = this.card.striker_run + this.strikerScore + 5
                    this.card.striker_balls = this.card.striker_balls + 1
                    this.card.cur_bowler_run = this.card.cur_bowler_run + this.strikerScore + 5
                    this.card.recent = this.card.recent + " 5"

                }
                if (this.extraValue == "6's") {
                    this.card.innings == 1 ? this.card.team_a_score = this.card.team_a_score + this.strikerScore + 6 : this.card.team_b_score = this.card.team_b_score + this.strikerScore + 6
                    this.card.run_scored = this.strikerScore + 6
                    this.card.striker_run = this.card.striker_run + this.strikerScore + 6
                    this.card.striker_balls = this.card.striker_balls + 1
                    this.card.cur_bowler_run = this.card.cur_bowler_run + this.strikerScore + 6
                    this.card.recent = this.card.recent + " 6"
                }
            } else if (this.illegalBallType) {
                if (this.illegalBallType.toLowerCase() == 'wide') {
                    this.card.wide = this.card.wide + this.strikerScore + 1
                    this.card.cur_bowler_run = this.card.cur_bowler_run + this.strikerScore + 1
                    this.card.run_scored = this.strikerScore + 1
                    this.card.innings == 1 ? this.card.team_a_score = this.card.team_a_score + this.strikerScore + 1 : this.card.team_b_score = this.card.team_b_score + this.strikerScore + 1
                    if (!this.outType) {
                        if (this.strikerScore != 0) {
                            let tempScore = this.strikerScore + 1
                            this.card.recent = this.card.recent + " " + tempScore + "Wd"
                        } else
                            this.card.recent = this.card.recent + " 1Wd"
                    } else {
                        this.card.recent = this.card.recent + " Wd+W"
                    }

                }
                if (this.illegalBallType.toLowerCase() == 'no ball') {
                    this.card.no_ball = this.card.no_ball + 1
                    this.card.innings == 1 ? this.card.team_a_score = this.card.team_a_score + this.strikerScore + 1 : this.card.team_b_score = this.card.team_b_score + this.strikerScore + 1
                    this.card.cur_bowler_run = this.card.cur_bowler_run + this.strikerScore + 1
                    this.card.run_scored = this.strikerScore + 1
                    this.card.striker_run = this.card.striker_run + this.strikerScore
                    this.card.striker_balls = this.card.striker_balls + 1
                    this.freeHit = true
                    if (!this.outType) {
                        if (this.strikerScore != 0) {
                            let tempScore = this.strikerScore + 1
                            this.card.recent = this.card.recent + " " + tempScore + "NB"
                        } else
                            this.card.recent = this.card.recent + " 1NB"
                    } else {
                        this.card.recent = this.card.recent + " NB+W"
                    }
                    if (this.strikerScore == 4)
                        this.card.striker_4 = this.card.striker_4 + 1
                    if (this.strikerScore == 6)
                        this.card.striker_6 = this.card.striker_6 + 1

                }
            } else {
                if (this.strikerScore > 0 && this.strikerScore != 4 && this.strikerScore != 6) {
                    this.card.striker_run = this.card.striker_run + this.strikerScore
                    this.card.cur_bowler_run = this.card.cur_bowler_run + this.strikerScore
                    this.card.run_scored = this.strikerScore
                } else if (this.strikerScore == 4) {
                    this.card.striker_run = this.card.striker_run + 4
                    this.card.striker_4 = this.card.striker_4 + 1
                    this.card.cur_bowler_run = this.card.cur_bowler_run + 4
                    this.card.run_scored = 4
                } else if (this.strikerScore == 6) {
                    this.card.striker_run = this.card.striker_run + 6
                    this.card.cur_bowler_run = this.card.cur_bowler_run + 6
                    this.card.striker_6 = this.card.striker_6 + 1
                    this.card.run_scored = 6
                } else {
                    this.card.run_scored = 0
                }
                if (!this.outType)
                    this.card.recent = this.card.recent + " " + this.card.run_scored
                this.card.innings == 1 ? this.card.team_a_score = this.card.team_a_score + this.card.run_scored : this.card.team_b_score = this.card.team_b_score + this.card.run_scored
            }
            this.card.non_striker_out = null
            this.card.non_striker_out_name = ''
            this.card.non_striker_wicket = null
            this.card.non_striker_wicket_name = ''
            this.card.striker_out = null
            this.card.striker_out_name = ''
            this.card.striker_wicket = null
            this.card.striker_wicket_name = ''
            this.card.striker = striker_name
            this.card.non_striker = nonStriker_name
            this.card.field_player = fieldPlayer_id
            this.card.ball_type = balltypeID
            this.card.shot_type = shottypeID
            this.card.ball_type_name = this.ballTypeValue
            this.card.shot_type_name = this.shot_type
            this.card.team_a_name = this.team_enum[this.$route.query.team_a]
            this.card.team_b_name = this.team_enum[this.$route.query.team_b]
            this.card.team_a_srt_name = this.teamEnumShort[this.$route.query.team_a]
            this.card.team_b_srt_name = this.teamEnumShort[this.$route.query.team_b]
            if (this.outType) {
                if (this.outType.toLowerCase() != 'run out')
                    this.card.cur_bowler_wic = this.card.cur_bowler_wic + 1
                if (this.card.innings == 1) {
                    this.card.team_a_wicket = this.card.team_a_wicket + 1
                } else if (this.card.innings == 2) {
                    this.card.team_b_wicket = this.card.team_b_wicket + 1
                }
                if (this.outPlayer.toLowerCase() == "striker") {
                    this.card.striker_out = 1
                    this.card.striker_out_name = this.outType
                    this.card.striker_wicket = cur_bowler_id
                    this.card.striker_wicket_name = this.currentBowler
                } else {
                    this.card.non_striker_out = 1
                    this.card.non_striker_out_name = this.outType
                    this.card.non_striker_wicket = cur_bowler_id
                    this.card.non_striker_wicket_name = this.currentBowler
                }
                if (this.illegalBallType.toLowerCase() != 'no ball' && this.illegalBallType.toLowerCase() != 'wide') {
                    if (this.strikerScore != 0) {
                        this.card.recent = this.card.recent + " " + this.strikerScore + "W"
                    } else
                        this.card.recent = this.card.recent + " W"
                }
                if (this.outType.toLowerCase() == "caught & bowled")
                    fieldPlayer_id = cur_bowler_id
            }
            recentArray = this.card.recent.split(" ")
            let over;
            this.card.innings == 1 ? over = this.card.team_a_over : over = this.card.team_b_over
            if (recentArray.length > 1) {
                if (!recentArray[recentArray.length - 2].includes("+"))
                    lastball = recentArray[recentArray.length - 2].slice(-2)
                else
                    lastball = recentArray[recentArray.length - 2]
            }
            if (((lastball != 'Wd' && lastball != "NB" && lastball != 'Wd+W' && lastball != "NB+W" && lastball != 'L+NB' && lastball != "B+NB")) || over == 0) {
                if ((this.card.cur_bowler_over % 1).toFixed(2) == "0.60") {
                    this.card.cur_bowler_over = Math.trunc(this.card.cur_bowler_over) + 1.1
                } else {
                    this.card.cur_bowler_over = Math.round((this.card.cur_bowler_over + 0.1) * 1e1) / 1e1
                }
                if (this.card.innings == 1) {
                    if ((this.card.team_a_over % 1).toFixed(2) == "0.60") {
                        this.card.team_a_over = Math.trunc(this.card.team_a_over) + 1.1
                    } else {
                        this.card.team_a_over = Math.round((this.card.team_a_over + 0.1) * 1e1) / 1e1
                    }
                } else if (this.card.innings == 2) {
                    if ((this.card.team_b_over % 1).toFixed(2) == "0.60") {
                        this.card.team_b_over = Math.trunc(this.card.team_b_over) + 1.1
                    } else {
                        this.card.team_b_over = Math.round((this.card.team_b_over + 0.1) * 1e1) / 1e1
                    }
                }
            }
            if (this.illegalBallType.toLowerCase() != "no ball" && this.illegalBallType.toLowerCase() != 'wide')
                this.card.striker_balls = this.card.striker_balls + 1
            this.card.innings == 1 ? this.card.team_a_target = this.card.team_a_target + this.card.run_scored : this.card.team_b_target = this.card.team_a_target - (this.card.team_b_target + this.card.run_scored)
            let cur_bowler_bowl = parseInt(this.card.cur_bowler_over) + ((parseFloat((this.card.cur_bowler_over % 1).toFixed(2)) * 10) / 6)
            if (cur_bowler_bowl > 0)
                this.card.cur_bowler_eco = parseFloat((this.card.cur_bowler_run / cur_bowler_bowl).toFixed(2));
            if (this.card.striker_balls > 0)
                this.card.striker_strikerate = parseFloat(((this.card.striker_run / this.card.striker_balls) * 100).toFixed(2));
            if (this.card.innings == 1) {
                if (this.card.team_a_over < 5.6)
                    this.card.powerplay = "p1"
                else
                    this.card.powerplay = "p2"
                currentRun = parseInt(this.card.team_a_over) + ((parseFloat((this.card.team_a_over % 1).toFixed(2)) * 10) / 6)
                if (currentRun > 0)
                    this.card.curr_rate = parseFloat((this.card.team_a_score / currentRun).toFixed(2))
            } else if (this.card.innings == 2) {
                if (this.card.team_b_over < 5.6)
                    this.card.powerplay = "p1"
                else
                    this.card.powerplay = "p2"
                currentRun = parseInt(this.card.team_b_over) + ((parseFloat((this.card.team_b_over % 1).toFixed(2)) * 10) / 6)
                if (currentRun > 0)
                    this.card.curr_rate = parseFloat((this.card.team_b_score / currentRun).toFixed(2))
                let totalOver, teamAScore;
                if (this.card.rvs_b_over && this.card.rvs_b_over > 0)
                    totalOver = (this.card.rvs_b_over - 1) + .6
                else
                    totalOver = (this.matchdata.format_overs - 1) + .6
                if (this.card.rvs_a_target && this.card.rvs_a_target > 0)
                    teamAScore = this.card.rvs_a_target
                else
                    teamAScore = this.card.team_a_score
                let remainingOver = totalOver - this.card.team_b_over
                let remainingBall = parseInt(remainingOver) + ((parseFloat((remainingOver % 1).toFixed(2)) * 10) / 6)
                this.card.req_rate = parseFloat(((teamAScore - this.card.team_b_score) / remainingBall).toFixed(2))
            }
            this.card.modified = this.card.created = new Date()
            if ((this.card.cur_bowler_over % 1).toFixed(2) == "0.60") {
                let overSummary = this.card.recent.split('|')
                let scoreArray = overSummary[overSummary.length - 1].split(' ')
                let score = 0
                for (let key in scoreArray) {
                    if (scoreArray[key]) {
                        if (scoreArray[key] < 6) {
                            score = score + parseInt(scoreArray[key])
                        } else if (scoreArray[key].charAt(0) < 8 && !scoreArray[key].includes("L") && !scoreArray[key].includes("B")) {
                            score = score + parseInt(scoreArray[key].charAt(0))
                        }
                        if (scoreArray[key].charAt(0) < 8 && scoreArray[key].includes("NB"))
                            score = score + parseInt(scoreArray[key].charAt(0))
                    }
                }
                if (score == 0) {
                    this.card.cur_bowler_mai = this.card.cur_bowler_mai + 1
                }

            }
            this.tempStrikerScore = this.strikerScore
            if ((this.tempStrikerScore % 2 != 0 && (this.card.cur_bowler_over % 1).toFixed(2) != "0.60") || (this.tempStrikerScore % 2 == 0 && (this.card.cur_bowler_over % 1).toFixed(2) == "0.60")) {
                this.card.display_striker_name = this.card.non_striker_name
                this.card.display_non_striker_name = this.card.striker_name
            } else {
                this.card.display_striker_name = this.card.striker_name
                this.card.display_non_striker_name = this.card.non_striker_name
            }
            delete this.card.id;
            this.card.recent = this.card.recent.trim()
            let lastBall = this.card.recent.split(" ")
            this.card.comment = this.card.cur_bowler_name + " to " + this.card.striker_name
            let matchString = ''
            let matchRun = ''
            if (this.tempStrikerScore > 0) {
                matchString = this.tempStrikerScore
                if (this.tempStrikerScore == 4)
                    matchRun = "<b>FOUR!</b>"
                else if (this.tempStrikerScore == 6)
                    matchRun = "<b>SIX!</b>"
                else if (this.tempStrikerScore == 1)
                    matchRun = this.tempStrikerScore + " Run"
                else
                    matchRun = this.tempStrikerScore + " Runs"
            } else {
                matchRun = "No Run"
            }
            let ballTypeComment = ", it's a " + this.balltype_enum[this.card.ball_type] + ", " + this.shottype_enum[this.card.shot_type] + " by " + this.card.striker_name + " to " + this.fieldPositionValue
            if (lastBall[lastBall.length - 1] == matchString + 'B') {
                this.card.comment = this.card.comment + "," + " <b>Byes</b>" + "  ," + matchRun + ballTypeComment
            } else if (lastBall[lastBall.length - 1] == matchString + 'L') {
                this.card.comment = this.card.comment + ", " + " <b>Leg Byes</b>" + "  ," + matchRun + ballTypeComment
            } else if (lastBall[lastBall.length - 1] == matchString + 1 + 'Wd' || lastBall[lastBall.length - 1] == matchString + 'Wd') {
                this.card.comment = this.card.comment + ", " + " <b>Wide</b>" + "  ," + matchRun + ballTypeComment
            } else if (lastBall[lastBall.length - 1] == matchString + 1 + 'NB' || lastBall[lastBall.length - 1] == "L+NB" || lastBall[lastBall.length - 1] == "B+NB") {
                if (this.extraValue.toLowerCase() == 'byes' || this.extraValue.toLowerCase() == 'leg byes') {
                    this.card.comment = this.card.comment + ", " + " <b>" + this.extraValue + "</b>"
                }
                this.card.comment = this.card.comment + ", " + " <b>No Ball</b>" + "  ," + matchRun + ballTypeComment
            } else if (lastBall[lastBall.length - 1] == matchString + 'W' || lastBall[lastBall.length - 1] == "Wd+W" || lastBall[lastBall.length - 1] == "NB+W") {
                let outComment = ''
                let outstatus = ''
                let outstring = ''
                if (this.illegalBallType.toLowerCase() == 'no ball' || this.illegalBallType.toLowerCase() == 'wide') {
                    this.card.comment = this.card.comment + ", " + " <b>" + this.illegalBallType + "</b>"
                }
                if (this.outPlayer.toLowerCase() == "striker") {
                    outstring = " " + this.card.striker_run + "(" + this.card.striker_balls + ")" + " [4s-" + this.card.striker_4 + " 6s-" + this.card.striker_6 + "]"
                    if (this.outType.toLowerCase() == "bowled" || this.outType.toLowerCase() == "lbw" || this.outType.toLowerCase() == "hit wicket" || this.outType.toLowerCase() == "retired") {
                        outComment = "<b>OUT!</b> " + this.outType
                        outstatus = " ,<b>" + this.card.striker_name + " " + this.outType + " b " + this.card.cur_bowler_name + outstring + "</b>"
                    } else if (this.outType.toLowerCase() == "caught & bowled") {
                        outComment = "<b>OUT!</b> " + this.outType + " by " + this.card.cur_bowler_name
                        outstatus = " ,<b>" + this.card.striker_name + " c&b " + this.card.cur_bowler_name + outstring + "</b>"

                    } else if (this.outType.toLowerCase() == "caught") {
                        outComment = "<b>OUT!</b> " + this.outType + " by " + this.fieldPlayer
                        outstatus = " ,<b>" + this.card.striker_name + " c " + this.fieldPlayer + " b " + this.card.cur_bowler_name + outstring + "</b>"

                    } else if (this.outType.toLowerCase() == "run out") {
                        outComment = this.card.striker_name + " <b>Run Out!!</b>"
                        outstatus = " ,<b>" + this.card.striker_name + " " + this.outType + " (" + this.fieldPlayer + ")" + outstring + "</b>"
                    } else {
                        outComment = this.card.striker_name + " <b>" + this.outType + " Out!!</b>"
                        outstatus = " ,<b>" + this.card.striker_name + " " + this.outType + " b " + this.card.cur_bowler_name + outstring + "</b>"
                    }
                } else {
                    outstring = " " + this.card.non_striker_run + "(" + this.card.non_striker_balls + ")" + " [4s-" + this.card.non_striker_4 + " 6s-" + this.card.non_striker_6 + "]"
                    outComment = this.card.non_striker_name + " Run Out!!"
                    outstatus = " ,<b>" + this.card.non_striker_name + " " + this.outType + " (" + this.fieldPlayer + ") " + this.card.cur_bowler_name + outstring + "</b>"

                }
                this.card.comment = this.card.comment + ", " + outComment + ballTypeComment
            } else if (lastBall[lastBall.length - 1] == matchString || matchString == '') {
                this.card.comment = this.card.comment + ", " + matchRun + ballTypeComment
            }
            if (this.match_status_name == '' || !this.match_status_name)
                this.match_status_name = this.match_status_enum[this.match_status_id]
            this.card.match_status_name = this.match_status_name
            this.card.match_status = this.match_status_id
            this.card.format_overs = this.matchdata.format_overs
            this.card.format_name = this.matchdata.format_name
            this.card.field_pos = Object.keys(this.fieldPositionEnum).find(key => this.fieldPositionEnum[key] === this.fieldPositionValue)
            console.log(this.card.recent)
            console.log(this.card)
            livescore.postLiveMatch(this.card)
                .then(response => {
                    this.data = response.data
                    if (this.freeHit) {
                        for (let key in this.out) {
                            if (this.out[key]['name'].toLowerCase() != "run out")
                                this.out[key]['status'] = false
                        }
                    } else {
                        for (let key in this.out) {
                            if (this.out[key]['name'].toLowerCase() != "run out")
                                this.out[key]['status'] = true
                        }
                    }
                    this.createScoreCard(this.card).then(res => {
                        this.resetForm().then(res1 => {
                            this.autoFillData(this.data)
                            this.$notify({
                                title: 'Success',
                                message: 'Score Updated Successfully',
                                type: 'success'
                            });
                        })
                    })

                })
                .catch(e => {
                    this.loading = false
                    this.resetForm().then(res1 => {
                        this.fetchData()

                    })
                    this.$notify({
                        title: 'Error',
                        message: 'Server Error,Plase try again',
                        type: 'error'
                    });
                    console.log(e)
                    handleUnauthorize(e)
                })
        },
        async resetForm() {
            let promise = new Promise((resolve, reject) => {
                this.ballTypeValue = ''
                this.shot_type = ''
                this.strikerScore = ''
                this.outPlayer = ''
                this.outType = ''
                this.fieldPlayer = ''
                this.extraValue = ''
                this.illegalBallType = ''
                this.noBallType = ''
                this.fieldPositionValue = ''
                this.otherMatchStatus = ''
                this.player_main = ''
                this.player_sub = ''
                resolve(true)
            });
            await promise;
        },
        undo() {
            this.loading = true
            undo.undoLastBall(this.$route.params.id)
                .then(response => {
                    this.currentBowler = ''
                    this.striker = ''
                    this.nonStriker = ''
                    this.resetForm().then(res1 => {
                        this.fetchData()
                    })
                })
                .catch(e => {
                    this.loading = false
                    this.fetchData()
                    this.$notify({
                        title: 'Error',
                        message: 'Server Error,Plase try again',
                        type: 'error'
                    });
                    console.log(e)
                    handleUnauthorize(e)
                })
        },
        resetOut() {
            this.outPlayer = ''
            this.outType = ''
        },
        resetFieldPlayer() {
            this.fieldPlayer = ''
        },
        resetExtra() {
            this.extraValue = ''
            this.illegalBallType = ''
        },
        endMatch() {
            let won, lost, teamAScore;
            let nr = false;
            if (this.$store.state.scoreCard.rvs_a_target && this.$store.state.scoreCard.rvs_a_target > 0)
                teamAScore = this.$store.state.scoreCard.rvs_a_target
            else
                teamAScore = this.$store.state.scoreCard.team_a_score
            if (teamAScore == this.$store.state.scoreCard.team_b_score) {
                won = null
                nr = true
            } else {
                if (teamAScore > this.$store.state.scoreCard.team_b_score) {
                    won = this.$store.state.scoreCard.team_a
                } else {
                    won = this.$store.state.scoreCard.team_b
                }
            }
            let payload = {
                "match_id": this.$store.state.scoreCard.match_id,
                "won": won,
                "team_a": this.$store.state.scoreCard.team_a,
                "team_b": this.$store.state.scoreCard.team_b,
                "team_a_name": this.team_enum[this.$route.query.team_a],
                "team_b_name": this.team_enum[this.$route.query.team_b],
                "team_a_score": teamAScore,
                "team_b_score": this.$store.state.scoreCard.team_b_score,
                "team_b_wicket": this.$store.state.scoreCard.team_b_wicket,
                "superover": this.superOverValue,
                "nr": nr
            }
            console.log(payload)
            this.dialogVisibleMatchEnd = false
            result.endMatch(payload)
                .then(response => {
                    this.$notify({
                        title: 'Success',
                        message: 'Match Ended Successfully',
                        type: 'success'
                    });
                    this.$router.replace({
                        name: "PastMatch",
                        params: {
                            id: this.$store.state.scoreCard.match_id
                        }
                    });
                })
                .catch(err => {
                    handleUnauthorize(err)
                })
        },
        cancelEndMatch() {
            this.dialogVisibleMatchEnd = false
            this.loading = false
        },
        autoFillData(data) {
            let key, key1;
            if (data.card) {
                this.card = data.card
                let totalOver, teamAScore, targetScore, currentOver, teamBTotalOver, teamBOver;
                if (this.card.rvs_a_target && this.card.rvs_a_target > 0)
                    teamAScore = this.card.rvs_a_target
                else
                    teamAScore = this.card.team_a_score
                targetScore = teamAScore - this.card.team_b_score
                if (this.card.rvs_b_over && this.card.rvs_b_over > 0)
                    teamBTotalOver = this.card.rvs_b_over
                else
                    teamBTotalOver = this.matchdata.format_overs
                if ((this.card.team_b_over % 1).toFixed(2) == "0.60")
                    teamBOver = Math.round(this.card.team_b_over)
                else
                    teamBOver = this.card.team_b_over
                if (this.card.innings == 2 && ((targetScore == 0 && teamBTotalOver == teamBOver) || (targetScore < 0))) {
                    this.dialogVisibleMatchEnd = true
                } 
                else if((!this.inningsStatus)||(this.inningsStatus && this.card.team_b_over!=0)) {
                    if (this.card.rvs_a_over && this.card.rvs_a_over > 0)
                        totalOver = this.card.rvs_a_over
                    else
                        totalOver = this.matchdata.format_overs
                    if (this.card.innings == 1 && (this.card.team_a_over % 1).toFixed(2) == "0.60" && Math.round(this.card.team_a_over) == totalOver) {
                        this.onChageInnings()
                        this.$message({
                            message: 'choose players for 2nd Innings.',
                            duration: 9000
                        });
                    } else {
                        let recentArray, lastball
                        this.match_status_name = this.match_status_enum[this.card.match_status]
                        this.match_status_id = this.card.match_status
                        recentArray = this.card.recent.split(" ")
                        if (recentArray.length > 1) {
                            if (!recentArray[recentArray.length - 1].includes("+"))
                                lastball = recentArray[recentArray.length - 1].slice(-2)
                            else
                                lastball = recentArray[recentArray.length - 1]
                        }
                        if (this.data.card.innings == 2 && this.data.card.team_a_over == 19.6 && this.data.card.team_b_over == 19.6 && this.data.card.team_a_wicket < 10 && this.data.card.team_b_wicket < 10 && this.data.card.team_a_score == this.data.card.team_b_score) {
                            this.superOver = true
                            this.superOverValue = true
                        }
                        for (key in this.striker_players) {
                            if (this.striker_players[key]['id'] == this.card.striker) {
                                if (this.card.striker_out) {
                                    for (key1 in this.striker_players) {
                                        if (this.striker_players[key1].selected == true && this.striker_players[key1].name != this.nonStriker && this.striker_players[key1].name != this.striker) {
                                            this.dialogFormVisibleBatting = true
                                            this.striker = this.striker_players[key1]['name']
                                            this.striker_players.splice(key, 1)
                                            this.non_striker_players.splice(key, 1)
                                            this.card.striker_run = 0
                                            this.card.striker_4 = 0
                                            this.card.striker_6 = 0
                                            this.card.striker_balls = 0
                                            this.card.striker_strikerate = 0
                                            break
                                        }
                                    }
                                } else
                                    this.striker = this.striker_players[key]['name']
                            }
                            if (this.striker_players[key]['id'] == this.card.non_striker) {
                                if (this.card.non_striker_out) {
                                    for (key1 in this.striker_players) {
                                        if (this.striker_players[key1].selected == true && this.striker_players[key1].name != this.nonStriker && this.striker_players[key1].name != this.striker) {
                                            this.dialogFormVisibleBatting = true
                                            this.nonStriker = this.striker_players[key1]['name']
                                            this.striker_players.splice(key, 1)
                                            this.non_striker_players.splice(key, 1)
                                            this.card.non_striker_run = 0
                                            this.card.non_striker_4 = 0
                                            this.card.non_striker_6 = 0
                                            this.card.non_striker_balls = 0
                                            this.card.non_striker_strikerate = 0
                                            break
                                        }
                                    }
                                } else
                                    this.nonStriker = this.striker_players[key]['name']
                            }
                        }
                        if (this.card.innings == 1)
                            currentOver = this.card.team_a_over
                        else
                            currentOver = this.card.team_b_over
                        if (this.tempStrikerScore == '' && this.tempStrikerScore != 0) {
                            this.tempStrikerScore = this.card.run_scored
                        }
                        if ((this.tempStrikerScore % 2 != 0 && (currentOver % 1).toFixed(2) != "0.60") || (this.tempStrikerScore % 2 == 0 && (currentOver % 1).toFixed(2) == "0.60" && lastball != 'Wd' && lastball != "NB" && lastball != 'Wd+W' && lastball != "NB+W" && lastball != 'L+NB' && lastball != "B+NB")) {
                            let tempID = this.nonStriker
                            let tempRun = this.card.non_striker_run
                            let temp4 = this.card.non_striker_4
                            let temp6 = this.card.non_striker_6
                            let tempBalls = this.card.non_striker_balls
                            let tempStrikerate = this.card.non_striker_strikerate
                            let tempStrikerPosition = this.card.non_striker_position
                            this.nonStriker = this.striker
                            this.card.non_striker_run = this.card.striker_run
                            this.card.non_striker_4 = this.card.striker_4
                            this.card.non_striker_6 = this.card.striker_6
                            this.card.non_striker_balls = this.card.striker_balls
                            this.card.non_striker_strikerate = this.card.striker_strikerate
                            this.card.non_striker_position = this.card.striker_position
                            this.striker = tempID
                            this.card.striker_run = tempRun
                            this.card.striker_4 = temp4
                            this.card.striker_6 = temp6
                            this.card.striker_balls = tempBalls
                            this.card.striker_strikerate = tempStrikerate
                            this.card.striker_position = tempStrikerPosition
                            this.$store.commit('changeHighlight1stCol', false)
                            this.$store.commit('changeHighlight2ndCol', true)
                            this.tempStrikerScore = ''
                        } else {
                            this.$store.commit('changeHighlight2ndCol', false)
                            this.$store.commit('changeHighlight1stCol', true)
                        }
                        if (this.bowling_players.length <= 0) {
                            if ((currentOver % 1).toFixed(2) == "0.60") {
                                if (lastball != 'Wd' && lastball != "NB" && lastball != 'Wd+W' && lastball != "NB+W" && lastball != 'L+NB' && lastball != "B+NB") {
                                    this.dialogFormVisibleBowler = true
                                    if (key < this.bowling_players.length - 1)
                                        this.currentBowler = this.bowling_players[parseInt(key) + 1]['name']
                                }
                            }
                        }
                        for (key in this.bowling_players) {
                            if (this.bowling_players[key]['id'] == this.card.cur_bowler) {
                                if ((currentOver % 1).toFixed(2) == "0.60") {
                                    if (this.superOverValue && this.card.innings == 1) {
                                        this.getPlayers(2).then(res => {

                                            this.batingTeam = this.team_enum[this.$route.query.team_b]
                                            this.bowlingTeam = this.team_enum[this.$route.query.team_a]
                                            this.card.innings = 2
                                        })
                                    } else if (this.card.innings == 2 && this.superOverValue) {
                                        this.ballTypeStatus = true
                                        this.$notify({
                                            title: 'Info',
                                            message: 'Please End The Match',
                                            type: 'info',
                                            duration: 1000
                                        });
                                    } else if (lastball != 'Wd' && lastball != "NB" && lastball != 'Wd+W' && lastball != "NB+W" && lastball != 'L+NB' && lastball != "B+NB") {
                                        this.dialogFormVisibleBowler = true
                                        if (key < this.bowling_players.length - 1)
                                            this.currentBowler = this.bowling_players[parseInt(key) + 1]['name']
                                    }
                                }
                            }
                        }
                        this.liveStatus()
                    }
                }
            }
        },
        async createScoreCard(card) {
            let promise = new Promise((resolve, reject) => {
                let scoreCardHeader, battingTeam, runs, wickets, over, playersName, striker, nonStriker, currentBowler, extra, rvs_over, totalOver, teamAScore, remainingOver, targetScore, remainingballs;
                if (card.innings == 1) {
                    if (this.striker_players.length < 1 || this.bowling_players.length < 1)
                        this.getPlayers(1, true, true)
                    this.batingTeam = this.team_enum[card.team_a]
                    this.bowlingTeam = this.team_enum[card.team_b]
                    runs = card.team_a_score
                    wickets = card.team_a_wicket
                    over = card.team_a_over
                    battingTeam = this.team_enum[this.$route.query.team_a]
                    rvs_over = card.rvs_a_over
                } else {
                    this.inningsStatus = true
                    if (this.striker_players.length < 1 || this.bowling_players.length < 1)
                        this.getPlayers(2, true, true)
                    this.batingTeam = this.team_enum[card.team_b]
                    this.bowlingTeam = this.team_enum[card.team_a]
                    runs = card.team_b_score
                    wickets = card.team_b_wicket
                    over = card.team_b_over
                    battingTeam = this.team_enum[this.$route.query.team_b]
                    rvs_over = card.rvs_b_over
                    if (card.rvs_b_over && card.rvs_b_over > 0)
                        totalOver = (card.rvs_b_over - 1) + .6
                    else
                        totalOver = (this.matchdata.format_overs - 1) + .6
                    if (card.rvs_a_target && card.rvs_a_target > 0)
                        teamAScore = card.rvs_a_target + 1
                    else
                        teamAScore = card.team_a_score + 1
                    targetScore = teamAScore - card.team_b_score
                    remainingOver = totalOver - card.team_b_over
                    remainingballs = (parseInt(remainingOver) * 6) + (parseFloat((remainingOver % 1).toFixed(2)) * 10)
                }
                for (let key in this.striker_players) {
                    if (this.striker_players[key]['id'] == card.striker) {
                        striker = this.striker_players[key]['name']
                    }
                    if (this.striker_players[key]['id'] == card.non_striker) {
                        nonStriker = this.striker_players[key]['name']
                    }
                }
                for (let key in this.bowling_players) {
                    if (this.bowling_players[key]['id'] == card.cur_bowler) {
                        currentBowler = this.bowling_players[key]['name']
                    }
                }
                playersName = {
                    "strikerName": card.striker_name ? card.striker_name : striker,
                    "nonstrikerName": card.non_striker_name ? card.non_striker_name : nonStriker,
                    "curBowlerName": card.cur_bowler_name ? card.cur_bowler_name : currentBowler,
                    "prvBowlerName": card.prv_bowler_name
                }
                if ((over % 1).toFixed(2) == "0.60")
                    over = Math.round(over)

                extra = card.byes + card.leg_byes + card.wide + card.no_ball
                if (card.innings == 1)
                    extra = extra + card.penalty_a
                if (card.innings == 2)
                    extra = extra + card.penalty_b
                extra = extra + '('
                if (card.byes)
                    extra = extra + "B " + card.byes + ","
                if (card.leg_byes)
                    extra = extra + " LB " + card.leg_byes + ","
                if (card.wide)
                    extra = extra + " W " + card.wide + ","
                if (card.no_ball)
                    extra = extra + " NB " + card.no_ball + ","
                if (card.innings == 1 && card.penalty_a)
                    extra = extra + " P " + card.penalty_a
                if (card.innings == 2 && card.penalty_b)
                    extra = extra + " P " + card.penalty_b
                if (extra[extra.length - 1] == ',')
                    extra = extra.slice(0, -1);
                extra = extra + ')'
                if (extra == "0()" || extra == "undefined ()")
                    extra = ''

                scoreCardHeader = {
                    "currentRunRate": card.curr_rate,
                    "runs": runs,
                    "wickets": wickets,
                    "over": over,
                    "battingTeam": battingTeam,
                    "extras": extra,
                    "rvsOver": rvs_over,
                    "last10Score": card.recent.split(' '),
                    "targetScore": targetScore,
                    "remainingballs": remainingballs
                }

                this.$store.commit('addScoreCard', card)
                this.$store.commit('addPlayersName', playersName)
                this.$store.commit('addScoreCardHeader', scoreCardHeader)
                this.$store.commit('changeShowScoreCard', true)
                this.$store.commit('changebattingTeam', battingTeam)
                resolve(true)
            });
            await promise;
        },
        async getPlayers(innings, addPlayer, showScoreCard) {
            let promise = new Promise((resolve, reject) => {
                let squadStatus = false
                match.getMatch(this.$route.params.id)
                    .then(response => {
                        this.matchdata = response.data.data
                        let player, team_squad_1 = []
                        let team_squad_2 = []
                        this.striker_players = []
                        this.non_striker_players = []
                        this.bowling_players = []
                        this.field_players = []
                        this.sub_players = []
                        if (this.$route.query.team_a == this.matchdata.team_squad_1[0].team) {
                            team_squad_1 = this.matchdata.team_squad_1
                            team_squad_2 = this.matchdata.team_squad_2
                        } else {
                            team_squad_1 = this.matchdata.team_squad_2
                            team_squad_2 = this.matchdata.team_squad_1
                        }
                        let ballid;
                        if (this.card.ballid)
                            ballid = this.card.ballid
                        else if (this.data && this.data.card.ballid)
                            ballid = this.data.card.ballid
                        else
                            ballid = 0

                        squad.getSquad(innings, ballid, this.$route.params.id, "batting")
                            .then(response => {
                                squadStatus = true
                                let squad = response.data.data
                                this.striker_players = []
                                this.non_striker_players = []
                                for (let player in squad) {
                                    if (squad[player].status == '' || squad[player].status == "not out" || squad[player].status == "retrd") {
                                        squad[player]["selected"] = true
                                        this.striker_players.push(squad[player])
                                        this.non_striker_players.push(squad[player])
                                    }
                                }
                            }).catch(err => {
                                handleUnauthorize(err)
                            })
                        if (!squadStatus) {
                            this.striker_players = []
                            this.non_striker_players = []
                            if (innings == 1) {
                                for (player in team_squad_1) {
                                    if (team_squad_1[player].selected == true) {
                                        this.striker_players.push(team_squad_1[player])
                                        this.non_striker_players.push(team_squad_1[player])
                                    }
                                }
                            } else {
                                for (player in team_squad_2) {
                                    if (team_squad_2[player].selected == true) {
                                        this.striker_players.push(team_squad_2[player])
                                        this.non_striker_players.push(team_squad_2[player])
                                    }
                                }
                            }
                        }
                        if (innings == 1) {
                            for (player in team_squad_2) {
                                if (team_squad_2[player].selected == true) {
                                    this.bowling_players.push(team_squad_2[player])
                                }
                                if (team_squad_2[player].player_in == true) {
                                    this.field_players.push(team_squad_2[player])
                                } else {
                                    this.sub_players.push(team_squad_2[player])
                                }
                            }
                        } else {
                            for (player in team_squad_1) {
                                if (team_squad_1[player].selected == true) {
                                    this.bowling_players.push(team_squad_1[player])
                                }
                                if (team_squad_1[player].player_in == true) {
                                    this.field_players.push(team_squad_1[player])
                                } else {
                                    this.sub_players.push(team_squad_1[player])
                                }
                            }
                        }
                        if (addPlayer) {
                            let key;
                            for (key in this.striker_players) {
                                if (this.striker_players[key]['id'] == this.data.card.striker) {
                                    this.striker = this.striker_players[key]['name']
                                }
                                if (this.striker_players[key]['id'] == this.data.card.non_striker) {
                                    this.nonStriker = this.striker_players[key]['name']
                                }
                            }
                            for (key in this.bowling_players) {
                                if (this.bowling_players[key]['id'] == this.data.card.cur_bowler) {
                                    this.currentBowler = this.bowling_players[key]['name']
                                }
                                if (this.bowling_players[key]['id'] == this.data.card.prv_bowler) {
                                    this.data.card['prv_bowler_name'] = this.bowling_players[key]['name']

                                }
                            }
                        }
                        if (showScoreCard) {
                            let playersName
                            playersName = {
                                "strikerName": this.striker,
                                "nonstrikerName": this.nonStriker,
                                "curBowlerName": this.currentBowler,
                                "prvBowlerName": null
                            }
                            this.$store.commit('addPlayersName', playersName)

                        }
                        this.loadingInnings = false
                        resolve([this.striker, this.nonStriker, this.currentBowler])
                    })
                    .catch(err => {
                        console.log(err)
                        handleUnauthorize(err)
                    })
            });
            await promise;
        },
        addPlayerSelection() {
            if (this.currentBowler != '' && this.striker != '' && this.nonStriker != '') {
                this.resetForm().then(res => {
                    this.getBowlingSquad()
                    this.getBattingSquad()
                    this.superOver = false
                    if (this.inningsCount == 2) {
                        this.card.innings = 2
                        this.changeDataOnInningsChange()
                        this.inningsCount = 1
                    }
                })

            } else {
                this.$notify({
                    title: 'Error',
                    message: 'Please choose Bowler, Striker, Non Striker',
                    type: 'error'
                });
            }
        },
        addCurrentBowler() {
            if (this.currentBowler != '') {
                this.resetForm().then(res => {
                    this.getBowlingSquad()
                })
            } else {
                this.$notify({
                    title: 'Error',
                    message: 'Please choose Bowler',
                    type: 'error'
                });
            }
        },
        getBowlingSquad() {
            let ballid = this.card.ballid
            squad.getSquad(this.card.innings, ballid, this.$route.params.id, "bowling")
                .then(response => {
                    let squad, matched = false
                    squad = response.data.data
                    for (let player in squad) {
                        if (this.currentBowler == squad[player].name) {
                            matched = true
                            this.newBowler['cur_bowler_run'] = squad[player].run
                            this.newBowler['cur_bowler_over'] = squad[player].over
                            this.newBowler['cur_bowler_eco'] = squad[player].economy
                            this.newBowler['cur_bowler_wic'] = squad[player].wicket
                            this.newBowler['cur_bowler_mai'] = squad[player].maiden
                            // this.card.cur_bowler_run = squad[player].run
                            // this.card.cur_bowler_over = squad[player].over
                            // this.card.cur_bowler_eco = squad[player].economy
                            // this.card.cur_bowler_wic = squad[player].wicket
                            // this.card.cur_bowler_mai = squad[player].maiden
                            // this.card.cur_bowler_first_name = squad[player].first_name
                            // this.card.cur_bowler_last_name = squad[player].last_name
                            // this.card.cur_bowler_bowling_cat = squad[player].bowling_cat
                            break;
                        }
                    }
                    if (!matched) {
                        // this.card.prv_bowler=this.card.cur_bowler
                        // this.card.prv_bowler_over=this.card.cur_bowler_over
                        // this.card.prv_bowler_eco=this.card.cur_bowler_eco
                        // this.card.prv_bowler_mai=this.card.cur_bowler_mai
                        // this.card.prv_bowler_wic=this.card.cur_bowler_wic
                        // this.card.prv_bowler_run=this.card.cur_bowler_run
                        // this.card.prv_bowler_name=this.card.cur_bowler_name
                        // this.card.prv_bowler_first_name = this.card.cur_bowler_first_name
                        // this.card.prv_bowler_last_name = this.card.cur_bowler_first_name
                        // this.card.cur_bowler_run = 0
                        // this.card.cur_bowler_over = 0
                        // this.card.cur_bowler_eco = 0
                        // this.card.cur_bowler_wic = 0
                        // this.card.cur_bowler_mai = 0
                        this.newBowler['cur_bowler_run'] = 0
                        this.newBowler['cur_bowler_over'] = 0
                        this.newBowler['cur_bowler_eco'] = 0
                        this.newBowler['cur_bowler_wic'] = 0
                        this.newBowler['cur_bowler_mai'] = 0
                    }
                    this.dialogFormVisibleBowler = false
                    this.dialogFormVisible = false

                }).catch(err => {
                    this.dialogFormVisibleBowler = false
                    this.dialogFormVisible = false
                    handleUnauthorize(err)
                })
        },
        getBattingSquad() {
            let ballid = this.card.ballid
            squad.getSquad(this.card.innings, ballid, this.$route.params.id, "batting")
                .then(response => {
                    let squad, matchStrikerPosition = false
                    let matchNonStrikerPosition = false
                    squad = response.data.data
                    for (let player in squad) {
                        if (this.striker == squad[player].name && squad[player].position) {
                            matchStrikerPosition = true
                            this.card.striker_run = squad[player].run
                            this.card.striker_4 = squad[player].four
                            this.card.striker_6 = squad[player].six
                            this.card.striker_balls = squad[player].balls
                            this.card.striker_strikerate = squad[player].strikeRate
                            this.card.striker_position = squad[player].position
                            this.card.striker_batting_style = squad[player].batting_style
                            this.card.striker_first_name = squad[player].first_name
                            this.card.striker_last_name = squad[player].last_name
                        }
                        if (this.nonStriker == squad[player].name && squad[player].position) {
                            matchNonStrikerPosition = true
                            this.card.non_striker_run = squad[player].run
                            this.card.non_striker_4 = squad[player].four
                            this.card.non_striker_6 = squad[player].six
                            this.card.non_striker_balls = squad[player].balls
                            this.card.non_striker_strikerate = squad[player].strikeRate
                            this.card.non_striker_position = squad[player].position
                            this.card.non_striker_batting_style = squad[player].batting_style
                            this.card.non_striker_first_name = squad[player].first_name
                            this.card.non_striker_last_name = squad[player].last_name
                        }
                    }
                    if (!matchStrikerPosition) {
                        this.card.striker_run = 0
                        this.card.striker_4 = 0
                        this.card.striker_6 = 0
                        this.card.striker_balls = 0
                        this.card.striker_strikerate = 0
                        this.card.striker_position > this.card.non_striker_position ? this.card.striker_position = this.card.striker_position + 1 : this.card.striker_position = this.card.non_striker_position + 1
                    }
                    if (!matchNonStrikerPosition) {
                        this.card.non_striker_run = 0
                        this.card.non_striker_4 = 0
                        this.card.non_striker_6 = 0
                        this.card.non_striker_balls = 0
                        this.card.non_striker_strikerate = 0
                        if (this.card.striker_position > this.card.non_striker_position)
                            this.card.non_striker_position = this.card.striker_position + 1
                        else {
                            this.card.non_striker_position = this.card.non_striker_position + 1
                        }
                    }
                    this.dialogFormVisibleBatting = false
                    this.dialogFormVisible = false

                }).catch(err => {
                    this.dialogFormVisibleBatting = false
                    this.dialogFormVisible = false
                    handleUnauthorize(err)
                })
        },
        addStrikerNonStriker() {
            if (this.striker != '' && this.nonStriker != '') {
                this.resetForm().then(res => {
                    this.getBattingSquad()
                })
            } else {
                this.$notify({
                    title: 'Error',
                    message: 'Please choose Striker and Non Striker',
                    type: 'error'
                });
            }
        },
        cancelPlayerSelection() {
            this.dialogFormVisible = false
            if (this.card.innings == 1 && this.inningsStatus) {
                this.getPlayers(1)
                this.batingTeam = this.team_enum[this.$route.query.team_a]
                this.bowlingTeam = this.team_enum[this.$route.query.team_b]
                this.inningsStatus = false
            }
        },
        onChageInnings() {
            this.loadingInnings = true
            this.getPlayers(2)
            this.batingTeam = this.team_enum[this.$route.query.team_b]
            this.bowlingTeam = this.team_enum[this.$route.query.team_a]
            this.dialogFormVisible = true
            this.inningsStatus = true
            this.inningsCount = 2

        },
        changeDataOnInningsChange() {
            this.card.striker = 0
            this.card.striker_position = 1
            this.card.striker_run = 0
            this.card.striker_4 = 0
            this.card.striker_6 = 0
            this.card.striker_strikerate = 0
            this.card.striker_balls = 0
            this.card.striker_out = 0
            this.card.field_player = 0
            this.card.striker_wicket = 0
            this.card.non_striker = 0
            this.card.non_striker_position = 2
            this.card.non_striker_run = 0
            this.card.non_striker_4 = 0
            this.card.non_striker_6 = 0
            this.card.non_striker_strikerate = 0
            this.card.non_striker_balls = 0
            this.card.non_striker_out = 0
            this.card.non_striker_wicket = 0
            this.card.cur_bowler = null
            this.card.cur_bowler_over = 0
            this.card.cur_bowler_eco = 0
            this.card.cur_bowler_mai = 0
            this.card.cur_bowler_wic = 0
            this.card.cur_bowler_run = 0
            this.card.prv_bowler = null
            this.card.prv_bowler_over = 0
            this.card.prv_bowler_eco = 0
            this.card.prv_bowler_mai = 0
            this.card.prv_bowler_wic = 0
            this.card.prv_bowler_run = 0
            this.card.byes = 0
            this.card.leg_byes = 0
            this.card.wide = 0
            this.card.no_ball = 0
            this.card.pnlt = 0
            this.card.ball_type = 0
            this.card.shot_type = 0
            this.card.run_scored = 0
            this.card.recent = ''
            let battingTeam = this.team_enum[this.$route.query.team_b]
            let key = battingTeam + "- 0/0(0.0)"
            this.updateQuickScore(key)
            this.$store.commit('changebattingTeam', battingTeam)
            this.addMatchStatus(false, true)
        },
        updateQuickScore(key) {
            let payload = {
                "match_id": this.$route.params.id,
                "key": key
            }
            console.log(payload)
            quickscorecard.updateQuickCard(payload)
                .then(res => {
                    this.$store.commit('changequickScore', key)
                })
                .catch(err => {
                    this.$notify({
                        title: 'Error',
                        message: 'Server Error,Plase try again',
                        type: 'error'
                    });
                })
        },
        async getConfig() {
            let promise = new Promise((resolve, reject) => {
                if (this.$store.state.config.teams) {
                    this.team = this.$store.state.config.teams
                    this.team_enum = this.$store.state.config.team_enum
                    this.out = this.$store.state.config.out_type
                    this.shottype = this.$store.state.config.shot_type
                    this.balltype = this.$store.state.config.balltype
                    this.match_status = this.$store.state.config.match_status
                    this.match_status_enum = this.$store.state.config.match_status_enum
                    this.balltype_enum = this.$store.state.config.balltype_enum
                    this.shottype_enum = this.$store.state.config.shottype_enum
                    this.fieldPosition = this.$store.state.config.field_position
                    this.fieldPositionEnum = this.$store.state.config.field_position_enum
                    this.teamEnumShort = this.$store.state.config.team_enum_short
                    this.balltype_common = this.$store.state.config.balltype_common
                    this.balltype_spin = this.$store.state.config.balltype_spin
                    this.balltype_fast = this.$store.state.config.balltype_fast
                    resolve(true)
                } else {
                    config.getConfig().then(res => {
                        this.$store.commit('addConfig', res.data.data)
                        this.team = this.$store.state.config.teams
                        this.team_enum = this.$store.state.config.team_enum
                        this.out = this.$store.state.config.out_type
                        this.shottype = this.$store.state.config.shot_type
                        this.balltype = this.$store.state.config.balltype
                        this.match_status = this.$store.state.config.match_status
                        this.match_status_enum = this.$store.state.config.match_status_enum
                        this.balltype_enum = this.$store.state.config.balltype_enum
                        this.shottype_enum = this.$store.state.config.shottype_enum
                        this.fieldPosition = this.$store.state.config.field_position
                        this.fieldPositionEnum = this.$store.state.config.field_position_enum
                        this.teamEnumShort = this.$store.state.config.team_enum_short
                        this.balltype_common = this.$store.state.config.balltype_common
                        this.balltype_spin = this.$store.state.config.balltype_spin
                        this.balltype_fast = this.$store.state.config.balltype_fast
                        resolve(true)
                    }).catch(err => {
                        resolve(false)
                        console.log(err)
                        handleUnauthorize(err)
                    })
                }
            });
            await promise;
        },
        fetchData() {
            this.getConfig().then(resconfig => {
                livescore.getLiveMatch(this.$route.params.id)
                    .then(response => {
                        this.data = response.data
                        if (this.data) {
                            console.log(this.data)
                            if (this.data.card.innings == 1) {
                                this.getPlayers(1, true).then(res => {
                                    this.createScoreCard(this.data.card).then(res1 => {
                                        this.autoFillData(this.data)
                                    })
                                })
                                this.batingTeam = this.team_enum[this.$route.query.team_a]
                                this.bowlingTeam = this.team_enum[this.$route.query.team_b]

                            } else if (this.data.card.innings == 2) {
                                this.getPlayers(2, true).then(res => {
                                    this.createScoreCard(this.data.card).then(res1 => {
                                        this.autoFillData(this.data)
                                    })
                                })
                                this.batingTeam = this.team_enum[this.$route.query.team_b]
                                this.bowlingTeam = this.team_enum[this.$route.query.team_a]
                            }
                            this.match_status_name = this.match_status_enum[this.data.card.match_status]
                            this.match_status_id = this.data.card.match_status
                            this.rvs_a_target = this.data.card.rvs_a_target
                            this.rvs_a_over = this.data.card.rvs_a_over
                            this.rvs_b_over = this.data.card.rvs_b_over
                            this.liveStatus()
                        } else {
                            this.addCard()
                            this.card.innings = 1
                            this.card['match_id'] = this.$route.params.id
                            this.card['team_a'] = this.$route.query.team_a
                            this.card['team_b'] = this.$route.query.team_b
                            this.card.ballid = 0
                            this.card.striker_position = 1
                            this.card.non_striker_position = 2
                            this.getPlayers(1)
                            this.batingTeam = this.team_enum[this.$route.query.team_a]
                            this.bowlingTeam = this.team_enum[this.$route.query.team_b]
                            let key = this.batingTeam + "- 0/0(0.0)"
                            this.updateQuickScore(key)
                            this.$store.commit('changebattingTeam', this.batingTeam)
                            this.$store.commit('changeShowScoreCard', false)
                            this.match_status_name = "Inning 1"
                            this.match_status_id = 2
                            this.matchStart = false
                            this.dialogFormVisible = true
                            this.loading = false
                        }

                    })
                    .catch(err => {
                        handleUnauthorize(err)
                    })
            })
        },
        onPlayerSelection() {
            this.dialogFormVisible = true
        },
        addMatchStatus(lockScreen, changeInnings) {
            if (this.match_status_name != '' || this.otherMatchStatus != '') {
                this.dialogFormVisibleMatchStatus = false
                if (this.otherMatchStatus != '' && this.otherMatchStatus) {
                    let payload = {
                        "name": this.otherMatchStatus,
                        "lock": lockScreen,
                        "match_id": this.$route.params.id
                    }
                    matchStatus.addMatchStatus(payload).then(response => {
                        this.lockScreen = lockScreen
                        this.loading = false
                        this.otherMatchStatus = ''
                    }).catch(err => {
                        this.loading = false
                        handleUnauthorize(err)
                    })
                } else {
                    this.match_status_id = Object.keys(this.match_status_enum).find(key => this.match_status_enum[key] === this.match_status_name)
                    let payload = {
                        "match_id": this.$route.params.id,
                        "match_status": this.match_status_name
                    }
                    if (changeInnings == true) {
                        this.match_status_name = "Inning 2"
                        this.match_status_id = 4
                        payload = {
                            "match_id": this.$route.params.id,
                            "match_status": this.match_status_name
                        }
                    }
                    livestatus.changeMatchStatus(payload)
                        .then(response => {
                            this.lockScreen = lockScreen
                            this.loading = false
                        }).catch(err => {
                            this.loading = false
                            handleUnauthorize(err)
                        })
                }
            } else {
                this.$notify({
                    title: 'Error',
                    message: 'Please choose a Match Status',
                    type: 'error'
                });
            }
        },
        onSuperOver() {
            this.getPlayers(1)
            this.batingTeam = this.team_enum[this.$route.query.team_a]
            this.bowlingTeam = this.team_enum[this.$route.query.team_b]
            this.data.card.innings = 1
            this.dialogFormVisible = true
        },
        cancelMatchStatus() {
            this.dialogFormVisibleMatchStatus = false
            this.match_status_name = this.match_status_enum[this.card.match_status]
            this.match_status_id = this.card.match_status
        },
        addCard() {
            this.card = {
                "striker": 0,
                "striker_name": "",
                "display_striker_name": '',
                "striker_position": 0,
                "striker_run": 0,
                "striker_4": 0,
                "striker_6": 0,
                "striker_strikerate": 0,
                "striker_balls": 0,
                "striker_out": null,
                "striker_out_name": '',
                "field_player": null,
                "field_player_name": '',
                "field_player_sub": false,
                "striker_wicket": null,
                "striker_wicket_name": '',
                "striker_batting_style": '',
                "striker_first_name": '',
                "striker_last_name": '',
                "non_striker": 0,
                "non_striker_name": '',
                "display_non_striker_name": '',
                "non_striker_batting_style": '',
                "non_striker_first_name": '',
                "non_striker_last_name": '',
                "non_striker_position": 0,
                "non_striker_run": 0,
                "non_striker_4": 0,
                "non_striker_6": 0,
                "non_striker_strikerate": 0,
                "non_striker_balls": 0,
                "non_striker_out": null,
                "non_striker_out_name": '',
                "non_striker_wicket": null,
                "non_striker_wicket_name": '',
                "cur_bowler": 0,
                "cur_bowler_name": '',
                "cur_bowler_first_name": '',
                "cur_bowler_last_name": '',
                "cur_bowler_bowling_cat": '',
                "cur_bowler_over": 0,
                "cur_bowler_eco": 0,
                "cur_bowler_mai": 0,
                "cur_bowler_wic": 0,
                "cur_bowler_run": 0,
                "team_a_name": null,
                "team_a_srt_name": null,
                "team_a_score": 0,
                "team_a_over": 0,
                "team_a_wicket": 0,
                "team_a_target": 0,
                "team_b_name": null,
                "team_b_srt_name": null,
                "team_b_score": 0,
                "team_b_over": 0,
                "team_b_wicket": 0,
                "team_b_target": 0,
                "byes": 0,
                "leg_byes": 0,
                "wide": 0,
                "no_ball": 0,
                "pnlt": 0,
                "penalty_a": 0,
                "penalty_b": 0,
                "ball_type": 0,
                "shot_type": 0,
                "ball_type_name": '',
                "shot_type_name": '',
                "run_scored": 0,
                "innings": 1,
                "created": null,
                "modified": null,
                "cur_bowler_spell": 0,
                "prv_bowler": null,
                "prv_bowler_over": 0,
                "prv_bowler_eco": 0,
                "prv_bowler_mai": 0,
                "prv_bowler_wic": 0,
                "prv_bowler_spell": 0,
                "prv_bowler_run": 0,
                "prv_bowler_name": '',
                "prv_bowler_first_name": '',
                "prv_bowler_last_name": '',
                "powerplay": '',
                "recent": '',
                'ballid': 0,
                'curr_rate': 0,
                'req_rate': 0,
                'match_status_name': "",
                'match_status': '',
                'rvs_a_target': null,
                'rvs_a_over': null,
                'rvs_b_over': null,
                'field_pos': '',
                'format_overs': null,
                'format_name': '',
                "comment": ""
            }
        },
        liveStatus() {
            livestatus.getLiveStatus(this.$route.params.id)
                .then(response => {
                    let data = response.data.data.current
                    if (data.innings == 1) {
                        if (data.ball > 0)
                            this.matchStart = true

                    } else if (data.innings == 2) {
                        if (data.ball > 0)
                            this.matchStart = true
                        else if (data.ball == 0) {
                            this.loadingInnings = true
                            this.getPlayers(2)
                            this.batingTeam = this.team_enum[this.$route.query.team_b]
                            this.bowlingTeam = this.team_enum[this.$route.query.team_a]
                            this.dialogFormVisible = true
                            this.inningsStatus = true
                            this.inningsCount = 2
                        }
                    }
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    handleUnauthorize(err)
                })
        },
        retired() {
            if (this.retiredname != '') {
                this.dialogVisibleRetired = false
                this.loading = true
                let retiredId;
                if (this.activeRetirePlayer == 1) {
                    for (let key in this.striker_players) {
                        if (this.striker_players[key]['name'] == this.retiredname) {
                            retiredId = this.striker_players[key]['id']
                            break
                        }
                    }
                } else if (this.activeRetirePlayer == 2) {
                    for (let key in this.bowling_players) {
                        if (this.bowling_players[key]['name'] == this.retiredname) {
                            retiredId = this.bowling_players[key]['id']
                            break
                        }
                    }
                }
                let payload = {
                    "match_id": this.$route.params.id,
                    "player_id": retiredId,
                    "message": this.retiredPlayerCommentary
                }
                if (this.activeRetirePlayer == 1) {
                    payload["type"] = "batsman"
                } else {
                    payload["type"] = "bowler"
                }
                retired.retireBatsman(payload)
                    .then(response => {
                        if (this.activeRetirePlayer == 1) {
                            for (let key in this.striker_players) {
                                if (this.card.striker == retiredId && this.striker_players[key]['id'] == this.card.striker) {
                                    for (let key1 in this.striker_players) {
                                        if (this.striker_players[key1].selected == true && this.striker_players[key1].name != this.nonStriker && this.striker_players[key1].name != this.striker) {
                                            this.striker = this.striker_players[key1]['name']
                                            this.card.striker_run = 0
                                            this.card.striker_4 = 0
                                            this.card.striker_6 = 0
                                            this.card.striker_balls = 0
                                            this.card.striker_strikerate = 0
                                            break
                                        }
                                    }
                                }
                                if (this.card.non_striker == retiredId && this.striker_players[key]['id'] == this.card.non_striker) {
                                    for (let key1 in this.striker_players) {
                                        if (this.striker_players[key1].selected == true && this.striker_players[key1].name != this.nonStriker && this.striker_players[key1].name != this.striker) {
                                            this.nonStriker = this.striker_players[key1]['name']
                                            this.card.non_striker_run = 0
                                            this.card.non_striker_4 = 0
                                            this.card.non_striker_6 = 0
                                            this.card.non_striker_balls = 0
                                            this.card.non_striker_strikerate = 0
                                            break
                                        }
                                    }
                                }
                            }
                            this.dialogFormVisibleBatting = true
                        } else if (this.activeRetirePlayer == 2) {
                            for (let key in this.bowling_players) {
                                if (this.bowling_players[key]['id'] == this.card.cur_bowler) {
                                    this.dialogFormVisibleBowler = true
                                    if (key < this.bowling_players.length - 1)
                                        this.currentBowler = this.bowling_players[parseInt(key) + 1]['name']

                                }
                            }
                        }
                        this.$notify({
                            title: 'Success',
                            message: this.retiredname + ' retired Successfully',
                            type: 'success'
                        });
                        this.activeRetirePlayer = 1
                        this.retiredPlayerCommentary = ''
                        this.loading = false
                    }).catch(err => {
                        this.activeRetirePlayer = 1
                        this.retiredPlayerCommentary = ''
                        this.$notify({
                            title: 'Error',
                            message: 'Server Error,Plase try again',
                            type: 'error'
                        });
                        this.loading = false
                        handleUnauthorize(err)
                    })
            } else {
                this.$notify({
                    title: 'Error',
                    message: 'Please choose retired player',
                    type: 'error'
                });
            }
        },
        getOverList() {
            this.dialogVisiblePenalty = true
            overlist.getOverList(this.$route.params.id)
                .then(response => {
                    this.overListApiResponse = response.data
                    this.innings = this.overListApiResponse.status.innings
                    this.lastOver = Math.trunc(this.overListApiResponse.status.over) + 1
                    this.over = this.lastOver
                    this.ball = this.overListApiResponse.status.over
                    this.ballList = []
                    if (this.innings == 1) {
                        this.apiResposeOverList = this.overListApiResponse.innings_1
                    } else {
                        this.apiResposeOverList = this.overListApiResponse.innings_2
                    }
                    for (let key in this.apiResposeOverList) {
                        if (this.over - 1 == Math.trunc(this.apiResposeOverList[key].over)) {
                            this.ballList.push(this.apiResposeOverList[key])
                        }
                    }
                    this.penaltyBallId = this.overListApiResponse.status.ball
                }).catch(err => {
                    handleUnauthorize(err)
                })
        },
        OnchangeInnings(val) {
            this.over = ''
            this.ball = ''
            if (this.innings == 1) {
                this.apiResposeInnings = this.overListApiResponse.innings_1
            } else {
                this.apiResposeInnings = this.overListApiResponse.innings_2
            }
            if (this.apiResposeInnings.length > 0)
                this.lastOver = Math.trunc(this.apiResposeInnings[this.apiResposeInnings.length - 1].over) + 1
            else {
                this.$notify({
                    title: 'Error',
                    message: '2nd Innings is Not Started',
                    type: 'error'
                });
            }
        },
        OnchangeOver(val) {
            this.ball = ''
            this.ballList = []
            for (let key in this.apiResposeOverList) {
                if (val - 1 == Math.trunc(this.apiResposeOverList[key].over)) {
                    this.ballList.push(this.apiResposeOverList[key])
                }
            }
        },
        OnchangeBall(val) {
            this.penaltyBallId = val
        },
        penalty() {
            if (this.penaltyType != '') {
                let penaltyTeam;
                if (this.innings == 1) {
                    if (this.penaltyType == this.batingTeam) {
                        penaltyTeam = "teamA"
                    } else {
                        penaltyTeam = "teamB"
                    }
                } else if (this.innings == 2) {
                    if (this.penaltyType == this.batingTeam) {
                        penaltyTeam = "teamB"
                    } else {
                        penaltyTeam = "teamA"
                    }
                }
                this.dialogVisiblePenalty = false
                this.loading = true
                let payload = {
                    "match_id": this.$route.params.id,
                    "innings": this.innings,
                    "ballid": this.penaltyBallId,
                    "penalty": penaltyTeam,
                    "formatOver": this.matchdata.format_overs,
                    "message": this.penaltyCommentary
                }
                penalty.addPenalty(payload)
                    .then(response => {
                        this.resetForm().then(res => {
                            this.fetchData()
                            this.$notify({
                                title: 'Success',
                                message: 'Penalty added Successfully to ' + this.penaltyType,
                                type: 'success'
                            });
                            this.penaltyType = ''
                            this.penaltyCommentary = ''
                        })

                    }).catch(err => {
                        this.loading = false
                        this.resetForm().then(res => {
                            this.fetchData()
                            this.$notify({
                                title: 'Error',
                                message: 'Server Error,Plase try again',
                                type: 'error'
                            });
                            this.dialogVisiblePenalty = false
                            this.penaltyType = ''
                            this.penaltyCommentary = ''

                        })

                        console.log(e)
                        handleUnauthorize(err)
                    })
            } else {
                this.$notify({
                    title: 'Error',
                    message: 'Please choose team',
                    type: 'error'
                });
            }

        },
        revised() {
            if (this.rvs_a_over != '' && this.rvs_b_over != '') {
                this.dialogVisibleRevised = false
                this.loading = true
                let payload = {
                    "match_id": this.$route.params.id,
                    "innings": this.card.innings,
                    "ballid": this.card.ballid,
                    "rvs_a_target": this.rvs_a_target,
                    "rvs_a_over": this.rvs_a_over,
                    "rvs_b_over": this.rvs_b_over,
                    "message": this.revisedCommentary
                }
                console.log(payload)
                revised.addRevised(payload)
                    .then(response => {
                        this.fetchData()
                        this.resetForm()
                        this.revisedCommentary = ''
                        this.$notify({
                            title: 'Success',
                            message: 'Revised Updated Successfully',
                            type: 'success'
                        });
                    }).catch(err => {
                        this.loading = false
                        this.revisedCommentary = ''
                        this.fetchData()
                        this.$notify({
                            title: 'Error',
                            message: 'Server Error,Plase try again',
                            type: 'error'
                        });
                        console.log(err)
                        this.dialogVisibleRevised = false
                        handleUnauthorize(err)
                    })
            } else {
                this.$notify({
                    title: 'Error',
                    message: 'Please Enter Innings 1 and 2 Over',
                    type: 'error'
                });
            }
        },
        unlockScreen() {
            if (this.card.innings == 1) {
                this.match_status_name = "Inning 1"
                this.match_status_id = 2
            } else {
                this.match_status_name = "Inning 2"
                this.match_status_id = 4
            }
            this.addMatchStatus(false)
        },
        addSubPlayer() {
            if (this.player_main != '' && this.player_sub != '') {
                let playerMainId, playerSubId
                this.dialogVisibleSub = false
                this.loading = true
                for (let key in this.field_players) {
                    if (this.field_players[key]['name'] == this.player_main) {
                        playerMainId = this.field_players[key]['id']
                        break
                    }
                }
                for (let key in this.sub_players) {
                    if (this.sub_players[key]['name'] == this.player_sub) {
                        playerSubId = this.sub_players[key]['id']
                        break
                    }
                }
                let payload = {
                    "match_id": this.$route.params.id,
                    "player_main": playerMainId,
                    "player_sub": playerSubId,
                    "message": this.subPlayerCommentary
                }
                substitute.addSubPlayer(payload)
                    .then(response => {
                        for (let key in this.field_players) {
                            if (this.field_players[key]['id'] == playerMainId) {
                                this.sub_players.push(this.field_players[key])
                                this.field_players.splice(key, 1)
                                break
                            }
                        }
                        for (let key in this.sub_players) {
                            if (this.sub_players[key]['id'] == playerSubId) {
                                this.field_players.push(this.sub_players[key])
                                this.sub_players.splice(key, 1)
                                break
                            }
                        }
                        this.loading = false
                        this.subPlayerCommentary = ''
                        this.resetForm()
                        this.$notify({
                            title: 'Success',
                            message: 'Sub player added Successfully',
                            type: 'success'
                        });
                    }).catch(err => {
                        this.loading = false
                        this.subPlayerCommentary = ''
                        this.$notify({
                            title: 'Error',
                            message: 'Server Error,Plase try again',
                            type: 'error'
                        });
                        console.log(e)
                        this.dialogVisibleSub = false
                        handleUnauthorize(err)
                    })
            } else {
                this.$notify({
                    title: 'Error',
                    message: 'Please choose field player and sub player',
                    type: 'error'
                });
            }
        },
        checkNetwork() {
            let timer, that;
            Axios.get("https://d3mmxr94p35uus.cloudfront.net/1x1/https://images.sportsflashes.com/1558533411-handtinyblack.gif", {
                    crossDomain: true
                })
                .then(response => {
                    this.dialogNetworkIssue = false
                    timer = 5000
                    that = this
                    this.timeOutID = window.setTimeout(that.checkNetwork, timer)
                })
                .catch(err => {
                    this.dialogNetworkIssue = true
                    timer = 5000
                    that = this
                    this.timeOutID = window.setTimeout(that.checkNetwork, timer)
                })
        }
    },
    watch: {
        '$route': 'fetchData',
        online: function (newVal) {
            console.log("internet change")
        },
        retiredname: function (newVal) {
            this.retiredPlayerCommentary = newVal + " is retired."
        },
        penaltyType: function (newVal) {
            this.penaltyCommentary = "Penalty runs are added to " + newVal
        },
        player_main: function (newVal) {
            this.subPlayerCommentary = this.player_sub + " in for " + newVal
        },
        player_sub: function (newVal) {
            this.subPlayerCommentary = newVal + " in for " + this.player_main
        },
        rvs_a_over: function (newVal) {
            this.revisedCommentary = "now the over reduce to " + newVal
        },
        rvs_b_over: function (newVal) {
            this.revisedCommentary = "now the over reduce to " + newVal
        },
        currentBowler: function (newVal, oldVal) {
            let bowling_cat;
            for (let key in this.bowling_players) {
                if (this.bowling_players[key]['name'] == newVal) {
                    bowling_cat = this.bowling_players[key]['bowling_cat']
                    break
                }
            }
            this.balltype = []
            if (bowling_cat == "fast") {
                this.balltype = this.balltype_fast

            } else if (bowling_cat == "spin") {
                this.balltype = this.balltype_spin
            } else {
                this.balltype = this.balltype_fast
                this.balltype = this.balltype.concat(this.balltype_spin)
            }
            this.balltype = this.balltype.concat(this.balltype_common)
        },
        striker: function (newVal, oldVal) {
            let nonStrikerPlayers
            for (nonStrikerPlayers in this.non_striker_players) {
                if (newVal == this.non_striker_players[nonStrikerPlayers].name)
                    this.non_striker_players[nonStrikerPlayers].selected = false
                if (oldVal == this.non_striker_players[nonStrikerPlayers].name)
                    this.non_striker_players[nonStrikerPlayers].selected = true

            }
        },
        nonStriker: function (newVal, oldVal) {
            let strikerPlayers
            for (strikerPlayers in this.striker_players) {
                if (newVal == this.striker_players[strikerPlayers].name)
                    this.striker_players[strikerPlayers].selected = false
                if (oldVal == this.striker_players[strikerPlayers].name)
                    this.striker_players[strikerPlayers].selected = true
            }
        },
        ballTypeValue: function (newVal) {
            if (newVal)
                this.shotTypeStatus = false
            else
                this.shotTypeStatus = true

        },
        shot_type: function (newVal) {
            if (newVal) {
                this.fieldPositionStatus = false
                this.strikerScoreStatus = false
            } else {
                this.fieldPositionStatus = true
                this.strikerScoreStatus = true
            }

        },
        strikerScore: function (newVal) {
            if (newVal) {
                if (newVal != 4 && newVal != 6) {
                    if (this.outType.toLowerCase() != "bowled" && this.outType.toLowerCase() != "lbw" && this.outType.toLowerCase() != "hit wicket" && this.outType.toLowerCase() != "retired" && this.outType.toLowerCase() != "caught & bowled") {
                        this.outPlayerStatus = false
                        this.fieldPlayerStatus = false
                    }
                } else {
                    this.outPlayerStatus = true
                    this.outPlayer = ''
                }
                this.extraStatus = false
                this.submitButtonStatus = false
                // if (this.extraValue.toLowerCase() == 'penalty' && this.penaltyType == '') {
                //     this.submitButtonStatus = true
                // } else {
                //     this.submitButtonStatus = false
                // }
            } else {
                this.extraStatus = true
                this.submitButtonStatus = true
                this.outPlayerStatus = true
                this.fieldPlayerStatus = true
            }

        },
        outPlayer: function (newVal, oldVal) {
            if (newVal) {
                if (newVal.toLowerCase() == "non striker") {
                    for (let key in this.out) {
                        if (this.out[key]['name'].toLowerCase() != "run out")
                            this.out[key]['status'] = false
                    }
                } else if (oldVal.toLowerCase() == "non striker") {
                    if (!this.freeHit) {
                        for (let key in this.out) {
                            this.out[key]['status'] = true
                        }
                    }
                }
                this.outType = ''
                this.outTypeStatus = false
                this.extraStatus = true
                this.submitButtonStatus = true
                this.fieldPlayerStatus = true
                this.fieldPlayer = ''
            } else {
                for (let key in this.score) {
                    if (this.score[key].id != 1)
                        this.score[key].status = true
                }
                this.outTypeStatus = true
                this.outType = ''
                this.fieldPlayerStatus = false
                this.submitButtonStatus = false
                this.extraStatus = false
            }

        },
        outType: function (newVal) {
            if (newVal) {
                if (newVal.toLowerCase() == "bowled" || newVal.toLowerCase() == "lbw" || newVal.toLowerCase() == "hit wicket" || newVal.toLowerCase() == "retired" || newVal.toLowerCase() == "caught & bowled") {
                    this.extraStatus = false,
                        this.submitButtonStatus = false
                    this.fieldPlayerStatus = true
                } else {
                    this.fieldPlayerStatus = false
                    this.extraStatus = true,
                        this.submitButtonStatus = true

                }
                if (newVal.toLowerCase() != "run out") {
                    this.strikerScore = '.'
                    for (let key in this.score) {
                        if (this.score[key].id != 1)
                            this.score[key].status = false
                    }
                } else {
                    for (let key in this.score) {
                        if (this.score[key].id != 1)
                            this.score[key].status = true
                    }
                }

            } else {
                this.fieldPlayerStatus = false
                this.submitButtonStatus = false
            }

        },
        fieldPlayer: function (newVal) {
            if (newVal) {

                this.extraStatus = false,
                    this.submitButtonStatus = false
            }
        },
        extraValue: function (newVal) {
            if (newVal) {
                if (this.extraValue.toLowerCase() == 'no ball' || this.extraValue.toLowerCase() == 'penalty') {
                    this.submitButtonStatus = true
                } else {
                    this.submitButtonStatus = false
                }
                this.noBallType = ''
                if (this.extraValue.toLowerCase() == 'penalty') {
                    this.strikerScore = '.'
                    for (let key in this.score) {
                        if (this.score[key].id != 1)
                            this.score[key].status = false
                    }
                } else {
                    for (let key in this.score) {
                        if (this.score[key].id != 1)
                            this.score[key].status = true
                    }
                }
            } else {
                for (let key in this.score) {
                    if (this.score[key].id != 1)
                        this.score[key].status = true
                }
            }

        },
        illegalBallType: function (newVal) {
            if (this.illegalBallType.toLowerCase() == 'no ball') {
                this.submitButtonStatus = true
            } else {
                this.submitButtonStatus = false
            }
        },
        noBallType: function (newVal) {
            if (newVal) {
                this.submitButtonStatus = false
            }

        },
        // penaltyType: function (newVal) {
        //     if (newVal) {
        //         this.submitButtonStatus = false
        //     }

        // },

    },
    created() {
        let timer, that;
        // Axios.get("https://images.sportsflashes.com/1558533411-handtinyblack1.gif")
        // .then(response => {
        //  this.dialogNetworkIssue=false
        //  timer = 5000
        //  that = this
        //  this.timeOutID = window.setTimeout(that.checkNetwork, timer)
        // })
        // .catch(err => {
        //     this.dialogNetworkIssue=true
        //     timer = 5000
        //     that = this
        //     this.timeOutID = window.setTimeout(that.checkNetwork, timer)
        // })
        this.fetchData()
        if (this.$route.query.dialogFormVisible) {
            this.dialogFormVisible = true
        }
    }
}
</script>

<style>
.revised-input {
    width: 200px;
    padding-bottom: 10px;
}

.over {
    display: inline-block;
    box-sizing: border-box;
    padding: 10px
}

.players {
    display: inline-block;
    padding-left: 20px;
    margin-right: 40px;
    border-left: 2px solid #ecebeb
}

.player-selection-div {
    margin-top: 20px;
    border: 1px solid #ecebeb;
    padding: 10px;
    font-weight: 800;

}

.col-player {
    padding: 10px 10px;
    border: 2px solid #ecebeb;
}

.el-dialog__header {
    padding: 5px;
    font-size: 20px;
    font-weight: 600;
}

.el-dialog__footer {
    padding: 5px;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.blinking {
    animation: blinkingText 0.8s infinite;
}

@keyframes blinkingText {
    0% {
        color: blue;
        font-weight: 600
    }

    49% {
        color: transparent;
    }

    50% {
        color: transparent;
    }

    99% {
        color: transparent;
    }

    100% {
        color: blue;
        font-weight: 600
    }
}
</style>
