<template>
<div id="playerlist">
    <el-table :data="playerList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: auto">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column label="Team" prop="team">
        </el-table-column>
        <el-table-column label="First Name" prop="first_name">
        </el-table-column>
         <el-table-column label="Last Name" prop="last_name">
        </el-table-column>
        <!-- <el-table-column label="Age" prop="age">
        </el-table-column> -->
        <el-table-column label="Type" prop="player_type">
        </el-table-column>
        <el-table-column label="Batting Style" prop="batting_style">
        </el-table-column>
        <el-table-column label="Bowling Style" prop="bowling_style">
        </el-table-column>
        <el-table-column label="Bowling Category" prop="bowling_category">
        </el-table-column>
        <el-table-column align="right">
            <template slot="header">
                <el-input v-model="search" size="mini" placeholder="Type to search" />
            </template>
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="mini" @click="handleView(scope.$index, scope.row)">View</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import player from '../api-services/player.service'
import team from '../api-services/team.service'

export default {
    name: "playerlist",
    data() {
        return {
            playerList: [],
            search: '',
            searchPast: '',
            dialogFormVisible: false,
            formLabelWidth: 'auto'
        }
    },
    methods: {
        handleEdit(index, row) {
            this.$router.replace({
                name: "PlayerEdit",
                params: {
                    id: row['id']
                }
            })
        },
        handleView(index, row) {
            this.$router.replace({
                name: "PlayerView",
                params: {
                    id: row['id']
                }
            })
        }

    },
    created() {
        team.getTeamPlayers(this.$route.params.id)
            .then(response => {
                let data = response.data.data
                let player
                let playerData = {}
                for (player in data) {
                    playerData['id'] = data[player]['id']
                    playerData['team'] = data[player]['team_name']
                    playerData['first_name'] = data[player]['first_name']
                    playerData['last_name'] = data[player]['last_name']
                    playerData['player_type'] = data[player]['type']
                    playerData['batting_style'] = data[player]['batting_style']
                    playerData['bowling_style'] = data[player]['bowling_style']
                    playerData['bowling_category'] = data[player]['bowling_cat']
                    this.playerList.push(playerData)
                    playerData = {}
                }
            })
            .catch(e => {
                this.errors.push(e)
            })
    }

}
</script>

<style>
/* .el-dialog__title {
    font-size: 40px
} */
</style>
