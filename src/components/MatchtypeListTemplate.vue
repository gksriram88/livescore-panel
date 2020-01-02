<template>
<div id="matchtypelist">
    <el-table :data="matchtypeList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: auto">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column label="Name" prop="name">
        </el-table-column>
        <el-table-column label="Type" prop="type">
        </el-table-column>
        <el-table-column label="Start Date" prop="startdate">
        </el-table-column>
        <el-table-column label="End Date" prop="enddate">
        </el-table-column>
        <el-table-column label="Venue" prop="venue">
        </el-table-column>
        <el-table-column align="right">
            <template slot="header">
                <el-input v-model="search" size="mini" placeholder="Type to search" />
            </template>
            <template slot-scope="scope">
                <el-button size="mini" @click="handlePointsView(scope.$index, scope.row)">Show Teams</el-button>
                <el-button size="mini" @click="handlePointsView(scope.$index, scope.row)" v-if="scope.row.type=='TOURNAMENT'">Show Points</el-button>
                <!-- <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
                <!-- <el-button
            size="mini"
            @click="handleView(scope.$index, scope.row)">View</el-button> -->
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import matchtype from '../api-services/matchtype.service'
import {
    handleUnauthorize
} from '../common/util.js'

export default {
    name: "matchtypelist",
    data() {
        return {
            matchtypeList: [],
            search: '',
            searchPast: '',
            dialogFormVisible: false,
            formLabelWidth: 'auto'
        }
    },
    methods: {
        // handleEdit(index, row) {
        //     this.$router.replace({ name: "MatchtypeEdit", params: {id:row['id']} })
        //   },
        handlePointsView(index, row) {
            this.$router.replace({
                name: "ShowTurnamentPoints",
                params: {
                    id: row['id']
                }
            })
        },
        handleTeamsView(index, row) {
            this.$router.replace({
                name: "MatchtypeTeamsView",
                params: {
                    id: row['id']
                }
            })
        }
    },
    created() {
        matchtype.getMatchtypeList(0, 100)
            .then(response => {
                let data = response.data.data
                let matchtype
                let seriesData = {}
                for (matchtype in data) {
                    seriesData['id'] = data[matchtype]['id']
                    seriesData['type'] = data[matchtype]['type']
                    seriesData['name'] = data[matchtype]['name']
                    seriesData['startdate'] = data[matchtype]['start_date']
                    seriesData['enddate'] = data[matchtype]['end_date']
                    seriesData['venue'] = data[matchtype]['venue']
                    this.matchtypeList.push(seriesData)
                    seriesData = {}
                }
            })
            .catch(err => {
                handleUnauthorize(err)
            })
    }

}
</script>

<style>
/* .el-dialog__title {
    font-size: 40px
} */
</style>
