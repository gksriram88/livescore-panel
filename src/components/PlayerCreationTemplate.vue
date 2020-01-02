<template>
<div id="playerCreation">
    <el-tabs type="border-card" style="height: 80vh; border: 1px solid #eee ; font-size:15px; font-weight:500;">
        <el-tab-pane label="Player Creation">
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form :model="playerCreationForm" :rules="rules" ref="playerCreationForm" label-width="200px" class="demo-playerCreationForm">
                            <el-form-item label="First Name" prop="player_first_name">
                                <el-input v-model="playerCreationForm.player_first_name"></el-input>
                            </el-form-item>
                            <el-form-item label="Last Name" prop="player_last_name">
                                <el-input v-model="playerCreationForm.player_last_name"></el-input>
                            </el-form-item>
                            <el-form-item label="Name" prop="player_name">
                                <el-input v-model="playerCreationForm.player_name"></el-input>
                            </el-form-item>
                            <el-form-item label="Player Type">
                                <el-select v-model="playerCreationForm.player_type" value-key="player_type" placeholder="Select Player Type" label-width="200px">
                                    <el-option v-for="item in playerTypeData" :key="item.id" :label="item.name" :value="item.alias">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Player Batting Style">
                                <el-select v-model="playerCreationForm.player_batting_style" value-key="player_batting_style" placeholder="Select Player Batting Style" label-width="200px">
                                    <el-option v-for="item in battingStyleData" :key="item.id" :label="item.name" :value="item.alias">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Player Bowling Style">
                                <el-select v-model="playerCreationForm.player_bowling_style" value-key="player_bowling_style" placeholder="Select Player Bowling Style" label-width="200px">
                                    <el-option v-for="item in bowlingStyleData" :key="item.id" :label="item.name" :value="item.alias">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="Bowling category">
                                <el-select v-model="playerCreationForm.player_bowling_category" value-key="player_bowling_category" placeholder="Select Category" label-width="200px">
                                    <el-option v-for="item in bowlingCategoryData" :key="item.id" :label="item.name" :value="item.alias">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="Team">
                                <el-select v-model="playerCreationForm.player_team" value-key="player_team" placeholder="Select Team" label-width="200px">
                                    <el-option v-for="item in teamData" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Status" prop="player_status">
                                <el-switch v-model="playerCreationForm.player_status"></el-switch>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('playerCreationForm')" v-if="this.$route.params.id">Update</el-button>
                                <el-button type="primary" @click="submitForm('playerCreationForm')" v-else>Create</el-button>
                                <el-button @click="resetForm('playerCreationForm')">Reset</el-button>
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
import player from '../api-services/player.service'
import config from '../api-services/config.service'
export default {
    name: "playerCreation",
    data() {
        return {
            playerCreationForm: {
                player_first_name: '',
                player_last_name: '',
                player_name: '',
                player_type: '',
                player_batting_style: '',
                player_bowling_style: '',
                player_bowling_category: '',
                player_team: '',
                player_status: true
            },
            teamData: [],
            battingStyleData: [{
                    "name": "Left Handed",
                    "alias": "Left-handed"
                },
                {
                    "name": "Right Handed",
                    "alias": "Right-handed"
                }
            ],
            bowlingCategoryData: [{
                    "name": "Fast",
                    "alias": "fast"
                },
                {
                    "name": "Spin",
                    "alias": "spin"
                }
            ],
            bowlingStyleData: [{
                    "name": "Right arm medium",
                    "alias": "Right-arm medium"

                },
                {
                    "name": "Right arm medium fast",
                    "alias": "Right-arm medium fast"
                },
                {
                    "name": "Right arm offbreak",
                    "alias": "Right-arm offbreak"
                },
                {
                    "name": "Right arm legbreak",
                    "alias": "Right-arm legbreak"
                },
                {
                    "name": "Right arm off spin",
                    "alias": "Right-arm off-spin"
                },
                {
                    "name": "Left arm orthodox spin",
                    "alias": "Left-arm orthodox spin"
                },
                {
                    "name": "Left arm orthodox",
                    "alias": "Left-arm orthodox"
                },
                {
                    "name": "Left arm medium",
                    "alias": "Left-arm medium"
                },
            ],
            playerTypeData: [{
                    "name": "All Rounder",
                    "alias": "All-rounder"
                },
                {
                    "name": "Batsman",
                    "alias": "Batsman"
                },
                {
                    "name": "Bowler",
                    "alias": "Bowler"
                },
                {
                    "name": "Wicketkeeper batsman",
                    "alias": "Wicketkeeper batsman"
                }
            ],
            rules: {
                player_first_name: [{
                    required: true,
                    message: 'Please enter player first name',
                    trigger: 'blur'
                }], 
                player_last_name: [{
                    required: true,
                    message: 'Please enter player last name',
                    trigger: 'blur'
                }],
                player_name: [{
                    required: true,
                    message: 'Please enter player name',
                    trigger: 'blur'
                }],
                player_type: [{
                    required: true,
                    message: 'Please select player type',
                    trigger: 'blur'
                }],
                player_batting_style: [{
                    required: true,
                    message: 'Please select player batting style',
                    trigger: 'blur'
                }],
                player_bowling_style: [{
                    required: true,
                    message: 'Please select player bowling style',
                    trigger: 'blur'
                }],
                player_bowling_category: [{
                    required: true,
                    message: 'Please select player bowling category',
                    trigger: 'blur'
                }],
                player_team: [{
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
            if (this.$store.state.config.teams) {
                this.teamData = this.$store.state.config.teams
            } else {
                config.getConfig().then(res => {
                    this.$store.commit('addConfig', res.data.data)
                    this.teamData = this.$store.state.config.teams
                }).catch(err => console.log(err))
            }
            if (this.$route.params.id) {
                player.getPlayer(this.$route.params.id)
                    .then(response => {
                        this.playerCreationForm.player_first_name = response.data.data.first_name
                        this.playerCreationForm.player_last_name = response.data.data.last_name
                        this.playerCreationForm.player_name = response.data.data.name
                        this.playerCreationForm.player_type = response.data.data.type
                        this.playerCreationForm.player_batting_style = response.data.data.batting_style
                        this.playerCreationForm.player_bowling_style = response.data.data.bowling_style
                        this.playerCreationForm.player_bowling_category = response.data.data.bowling_cat
                        this.playerCreationForm.player_team = response.data.data.team
                    })
                    .catch(err => {
                        this.errors.push(e)
                    })
            } else {
                this.playerCreationForm.player_first_name = null
                this.playerCreationForm.player_last_name = null
                this.playerCreationForm.player_name = null
                this.playerCreationForm.player_type = null
                this.playerCreationForm.player_type = null
                this.playerCreationForm.player_batting_style = null
                this.playerCreationForm.player_bowling_style = null
                this.playerCreationForm.player_bowling_category = null
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let obj = {}
                    obj.first_name = this.playerCreationForm.player_first_name
                    obj.last_name = this.playerCreationForm.player_last_name
                    obj.name = this.playerCreationForm.player_name
                    obj.type = this.playerCreationForm.player_type
                    obj.batting_style = this.playerCreationForm.player_batting_style
                    obj.bowling_style = this.playerCreationForm.player_bowling_style
                    obj.bowling_cat = this.playerCreationForm.player_bowling_category
                    obj.team = this.playerCreationForm.player_team
                    obj.status = this.playerCreationForm.player_status
                    if (this.$route.params.id) {
                        obj.id = this.$route.params.id
                        player.playerUpdate(obj)
                            .then(response => {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Player Updated Successfully',
                                    type: 'success'
                                });
                                this.$router.replace({
                                    name: "PlayerList"
                                });
                            })
                            .catch(e => {
                                this.errors.push(e)
                            })

                    } else {
                        player.playerCreation(obj)
                            .then(response => {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Player Created Successfully',
                                    type: 'success'
                                });
                                this.$router.replace({
                                    name: "PlayerList"
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
/* .el-input__inner {
    width: 630px;
} */
</style>
