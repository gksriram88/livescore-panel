<template>
<div id="countryCreation">
    <el-tabs type="border-card" style="height: 80vh; border: 1px solid #eee ; font-size:15px; font-weight:500;">
        <el-tab-pane label="Country Creation">
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form :model="countryCreationForm" :rules="rules" ref="countryCreationForm" label-width="200px" class="demo-countryCreationForm">
                            <el-form-item label="Country Name" prop="country_name">
                                <el-input v-model="countryCreationForm.country_name"></el-input>
                            </el-form-item>
                            <!-- <el-form-item label="Country Logo" prop="country_logo">
                                <el-input v-model="countryCreationForm.country_logo"></el-input>
                            </el-form-item> -->
                            <el-form-item label="Country Short Name" prop="country_short_name">
                                <el-input v-model="countryCreationForm.country_short_name"></el-input>
                            </el-form-item>
                            <el-form-item label="Status" prop="status">
                                <el-switch v-model="countryCreationForm.status"></el-switch>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('countryCreationForm')" v-if="this.$route.params.id">Update</el-button>
                                <el-button type="primary" @click="submitForm('countryCreationForm')" v-else>Create</el-button>
                                <el-button @click="resetForm('countryCreationForm')">Reset</el-button>
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
import country from '../api-services/country.service'
import {
    handleUnauthorize
} from '../common/util.js'

export default {
    name: "countryCreation",
    data() {
        return {
            countryCreationForm: {
                country_name: '',
                country_short_name: '',
                status: true
            },
            rules: {
                country_name: [{
                    required: true,
                    message: 'Please enter country name',
                    trigger: 'blur'
                }],
                country_short_name: [{
                    required: true,
                    message: 'Please enter country short name',
                    trigger: 'blur'
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
            if (this.$route.params.id) {
                country.getCountry(this.$route.params.id)
                    .then(response => {
                        this.countryCreationForm.country_name = response.data.data.name
                        this.countryCreationForm.country_short_name = response.data.data.code
                        this.countryCreationForm.status = response.data.data.status
                    })
                    .catch(err => {
                        handleUnauthorize(err)
                    })
            } else {
                this.country_name = null
                this.country_short_name = null
                this.status = true
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let obj = {}
                    obj.name = this.countryCreationForm.country_name
                    obj.code = this.countryCreationForm.country_short_name
                    obj.status = this.countryCreationForm.status
                    if (this.$route.params.id) {
                        obj.id = this.$route.params.id
                        country.countryUpdate(obj)
                            .then(response => {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Country Updated Successfully',
                                    type: 'success'
                                });
                                this.$router.replace({
                                    name: "CountryList"
                                });
                            })
                            .catch(err => {
                                handleUnauthorize(err)
                            })
                    } else {
                        country.countryCreation(obj)
                            .then(response => {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Country Created Successfully',
                                    type: 'success'
                                });
                                this.$router.replace({
                                    name: "CountryList"
                                });
                            })
                            .catch(err => {
                                handleUnauthorize(err)
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
