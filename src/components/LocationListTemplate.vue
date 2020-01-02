<template>
<div id="locationlist">
    <el-table :data="locationList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: auto">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column label="Name" prop="name">
        </el-table-column>
        <el-table-column label="Country" prop="country">
        </el-table-column>
        <el-table-column label="Status" prop="status">
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
import location from '../api-services/location.service'

export default {
    name: "locationlist",
    data() {
        return {
            locationList: [],
            search: '',
            searchPast: '',
            dialogFormVisible: false,
            formLabelWidth: 'auto'
        }
    },
    methods: {
        handleEdit(index, row) {
            this.$router.replace({
                name: "LocationEdit",
                params: {
                    id: row['id']
                }
            })
        },
        handleView(index, row) {
            this.$router.replace({
                name: "LocationView",
                params: {
                    id: row['id']
                }
            })
        }
    },
    created() {
        location.getLocationList()
            .then(response => {
                let data = response.data.data
                let location
                let locationData = {}
                for (location in data) {
                    locationData['id'] = data[location]['id']
                    locationData['name'] = data[location]['venue']
                    locationData['country'] = data[location]['c_id']
                    locationData['status'] = data[location]['status']
                    this.locationList.push(locationData)
                    locationData = {}
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
