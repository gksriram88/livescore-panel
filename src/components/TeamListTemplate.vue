<template>
<div id="teamlist">
    <el-table :data="teamList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: auto">
        {{logo}}
        <el-table-column type="index" width="100">
        </el-table-column>
        <el-table-column label="logo" width="90">
            <template slot-scope="scope">
            <img :src="scope.row.logo" style="height:32px;width:32px;"  />
            </template>
        </el-table-column>
        <el-table-column label="Name" prop="name" width="250">
        </el-table-column>
        <el-table-column align="right">
            <template slot="header">
                <el-input v-model="search" size="mini" placeholder="Type to search"  style="width:300px;"/>
            </template>
            <template slot-scope="scope">
                <el-button size="mini" @click="playerhandleView(scope.$index, scope.row)">Show Player List</el-button>
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="mini" @click="handleView(scope.$index, scope.row)">View</el-button>

            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import team from '../api-services/team.service'

export default {
    name: "teamlist",
    data() {
        return {
            teamList: [],
            search: '',
            searchPast: '',
            dialogFormVisible: false,
            formLabelWidth: 'auto'
        }
    },
    methods: {
        handleEdit(index, row) {
            this.$router.replace({
                name: "TeamEdit",
                params: {
                    id: row['id']
                }
            })
        },
        handleView(index, row) {
            this.$router.replace({
                name: "TeamView",
                params: {
                    id: row['id']
                }
            })
        },
        playerhandleView(index, row) {
            this.$router.replace({
                name: "TeamPlayersList",
                params: {
                    id: row['id']
                }
            })
        }
    },
    created() {
        team.getTeamList()
            .then(response => {
                let data = response.data.data
                let team
                let teamData = {}
                for (team in data) {
                    teamData['id'] = data[team]['id']
                    teamData['name'] = data[team]['name']
                    teamData['logo'] = data[team]['logo']
                    this.teamList.push(teamData)
                    teamData = {}
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
