<template>
<div id="matchtypeteampointlist">
    <el-table :data="matchtypeList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: auto">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column label="Name" prop="name">
        </el-table-column>
         <el-table-column label="Group" prop="group">
        </el-table-column>
        <el-table-column label="Played" prop="played">
        </el-table-column>
        <el-table-column label="won" prop="won">
        </el-table-column>
        <el-table-column label="lost" prop="lost">
        </el-table-column>
        <el-table-column label="NR" prop="nr">
        </el-table-column>
        <el-table-column label="NRR" prop="nrr">
        </el-table-column>
        <el-table-column align="right">
            <template slot="header">
                <el-input v-model="search" size="mini" placeholder="Type to search" />
            </template>
            <template slot-scope="scope">
                <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
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
    name: "matchtypeteampointlist",
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
                name: "MatchtypePointsView",
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
        matchtype.getPoints(this.$route.params.id)
            .then(response => {
                let data = response.data.data
               // console.log(data)
                let matchtype
                let seriesData = {}
                for (matchtype in data) {
                    seriesData['id'] = data[matchtype]['id']
                    seriesData['name'] = data[matchtype]['name']
                    seriesData['group'] = data[matchtype]['g_name']
                    seriesData['played'] = data[matchtype]['played']
                    seriesData['won'] = data[matchtype]['won']
                    seriesData['lost'] = data[matchtype]['lost']
                    seriesData['nr'] = data[matchtype]['nr']
                    seriesData['nrr'] = data[matchtype]['nrr']
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
