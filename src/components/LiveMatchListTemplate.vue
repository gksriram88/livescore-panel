<template>
<el-table stripe :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="height: auto; border: 8px solid #eee ; font-size:15px; font-weight:500; width: auto padding:20px" class="livematchlist">
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
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Open</el-button>
            <el-button size="mini" @click="automatedCommentry(scope.$index, scope.row)">AutoMated Commentry</el-button>
            <el-button size="mini" @click="manualCommentry(scope.$index, scope.row)">Manual Commentry</el-button>
        </template>
    </el-table-column>
</el-table>
</template>

<script>
import match from '../api-services/match.service'
import config from '../api-services/config.service'
import moment from 'moment'

import {
    handleUnauthorize
} from '../common/util.js'

export default {
    name: "livematchlist",
    data() {
        return {
            tableData: [],
            search: '',
            team_enum: {},
            country_enum: {},
        }
    },
    methods: {
        handleEdit(index, row) {
            this.$router.replace({
                name: "LiveScorePanel",
                params: {
                    id: row['id']
                },
                query: {
                    team_a: row['team_a'],
                    team_b: row['team_b']
                }
            })
        },
        automatedCommentry(index, row) {
            this.$router.replace({
                name: "AutomatedCommentry",
                params: {
                    id: row['id']
                }
            })
        },
        manualCommentry(index, row) {
            this.$router.replace({
                name: "ManualCommentry",
                params: {
                    id: row['id']
                }
            })
        }
    },
    created() {
        if (this.$store.state.config.team_enum) {
            this.team_enum = this.$store.state.config.team_enum
            this.country_enum = this.$store.state.config.country_enum
        } else {
            config.getConfig().then(res => {
                this.$store.commit('addConfig', res.data.data)
                this.team_enum = this.$store.state.config.team_enum
                this.country_enum = this.$store.state.config.country_enum
            }).catch(err => console.log(err))
        }
        match.getMatchList("LIVE")
            .then(response => {
                let data = response.data.data
                let match
                let matchData = {}
                for (match in data) {
                    matchData['id'] = data[match]['id']
                    matchData['name'] = data[match]['name']
                    matchData['date'] = moment.utc(data[match]['date']).local().format('llll')
                    matchData['venue'] = data[match]['venue']
                    matchData['country'] = this.country_enum[data[match]['country_id']]
                    matchData['toss'] = this.team_enum[data[match]['toss']]
                    matchData['team_a'] = data[match]['team_a']
                    matchData['team_b'] = data[match]['team_b']
                    this.tableData.push(matchData)
                    matchData = {}
                }
            })
            .catch(err => {
                handleUnauthorize(err)
            })
    }

}
</script>
