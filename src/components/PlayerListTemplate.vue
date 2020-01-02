<template>
<div id="playerlist">
    <el-table :data="playerList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: auto">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column label="Name" prop="name">
        </el-table-column>
        <el-table-column label="Type" prop="player_type">
        </el-table-column>
        <el-table-column label="Batting Style" prop="batting_style">
        </el-table-column>
        <el-table-column label="Bowling Style" prop="bowling_style">
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
        player.getPlayerList(1, 15)
            .then(response => {
                let data = response.data.data
                let player
                let playerData = {}
                for (player in data) {
                    playerData['id'] = data[player]['id']
                    playerData['name'] = data[player]['name']
                    playerData['player_type'] = data[player]['type']
                    playerData['batting_style'] = data[player]['batting_style']
                    playerData['bowling_style'] = data[player]['bowling_style']
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

