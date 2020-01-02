<template>
<div id="countrylist">
    <el-table :data="countryList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: auto">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column label="Name" prop="name">
        </el-table-column>
        <el-table-column label="Status" prop="status">
        </el-table-column>
        <el-table-column align="right">
            <template slot="header">
                <el-input v-model="search" size="mini" placeholder="Type to search" />
            </template>
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import country from '../api-services/country.service'
import {
    handleUnauthorize
} from '../common/util.js'

export default {
    name: "countrylist",
    data() {
        return {
            countryList: [],
            search: '',
            searchPast: '',
            dialogFormVisible: false,
            formLabelWidth: 'auto'
        }
    },
    methods: {
        handleEdit(index, row) {
            this.$router.replace({
                name: "CountryEdit",
                params: {
                    id: row['id']
                }
            })
        }
    },
    created() {
        country.getCountryList()
            .then(response => {
                let data = response.data.data
                let country
                let countryData = {}
                for (country in data) {
                    countryData['id'] = data[country]['id']
                    countryData['name'] = data[country]['name']
                    countryData['status'] = data[country]['status']
                    this.countryList.push(countryData)
                    countryData = {}
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
