<template>
<div id="playerDetails" class="playerDetails">
    <el-collapse v-model="activeNames">
        <el-collapse-item title="Player Info" name="1">
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
                    Team
                </div>
                <div class="cb-col col-73 cb-mtch-info-content">
                    {{this.team}}
                </div>
            </div>
            <div class="cb-col cb-col-100 cb-mtch-info-itm">
                <div class="cb-col col-27 cb-mtch-info-content">
                    Type
                </div>
                <div class="cb-col col-73 cb-mtch-info-content">
                    {{this.player_type}}
                </div>
            </div>
            <div class="cb-col cb-col-100 cb-mtch-info-itm">
                <div class="cb-col col-27 cb-mtch-info-content">
                    Batting Style
                </div>
                <div class="cb-col col-73 cb-mtch-info-content">
                    {{this.batting_style}}
                </div>
            </div>
            <div class="cb-col cb-col-100 cb-mtch-info-itm">
                <div class="cb-col col-27 cb-mtch-info-content">
                    Bowling Style
                </div>
                <div class="cb-col col-73 cb-mtch-info-content">
                    {{this.bowling_style}}
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
import player from '../api-services/player.service'
export default {
    name: "playerDetails",
    data() {
        return {
            activeNames: ['1'],
            name: '',
            team: '',
            player_type: '',
            batting_style: '',
            bowling_style: '',
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
                player.getPlayer(this.$route.params.id)
                    .then(response => {
                        this.name = response.data.data.name
                        this.team = response.data.data.team_id
                        this.player_type = response.data.data.type
                        this.batting_style = response.data.data.batting_style,
                            this.bowling_style = response.data.data.bowling_style,
                            this.status = response.data.data.status
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
