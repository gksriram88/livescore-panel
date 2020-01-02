<template>
<div id="locationCreation">
    <el-tabs type="border-card" style="height: 80vh; border: 1px solid #eee ; font-size:15px; font-weight:500;">
        <el-tab-pane label="Location Creation">
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form :model="locationCreationForm" :rules="rules" ref="locationCreationForm" label-width="200px" class="demo-locationCreationForm">
                            <el-form-item label="Name" prop="venue_name">
                                <el-input v-model="locationCreationForm.venue_name"></el-input>
                            </el-form-item>
                            <el-form-item label="Country">
                                <el-select v-model="locationCreationForm.venue_country" value-key="venue_country" placeholder="Select Country" label-width="200px">
                                    <el-option v-for="item in countryData" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Status" prop="venue_status">
                                <el-switch v-model="locationCreationForm.venue_status"></el-switch>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('locationCreationForm')" v-if="this.$route.params.id">Update</el-button>
                                <el-button type="primary" @click="submitForm('locationCreationForm')" v-else>Create</el-button>
                                <el-button @click="resetForm('locationCreationForm')">Reset</el-button>
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
import location from '../api-services/location.service'
export default {
    name: "locationCreation",
    data() {
        return {
            locationCreationForm: {
                venue_name: '',
                venue_country: '',
                venue_status: true
            },
            countryData: [],
            rules: {
                venue_name: [{
                    required: true,
                    message: 'Please enter venue name',
                    trigger: 'blur'
                }],
                venue_country: [{
                    required: true,
                    message: 'Please select country',
                    trigger: 'change'
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
            if (this.$store.state.config.countries) {
                this.countryData = this.$store.state.config.countries
            } else {
                config.getConfig().then(res => {
                    this.$store.commit('addConfig', res.data.data)
                    this.countryData = this.$store.state.config.countries
                }).catch(err => console.log(err))
            }
            if (this.$route.params.id) {
                location.getLocation(this.$route.params.id)
                    .then(response => {
                        this.locationCreationForm.venue_name = response.data.data.venue
                        this.locationCreationForm.venue_country = response.data.data.c_id;
                        this.locationCreationForm.venue_status = response.data.data.status;
                    })
                    .catch(err => {
                        this.errors.push(e)
                    })
            } else {
                this.venue_name = null
                this.venue_country = null
                this.venue_status = true
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let obj = {}
                    obj.venue = this.locationCreationForm.venue_name
                    obj.countryid = this.locationCreationForm.venue_country
                    obj.status = this.locationCreationForm.venue_status
                    if (this.$route.params.id) {
                        obj.id = this.$route.params.id
                        location.locationUpdate(obj)
                            .then(response => {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Venue Updated Successfully',
                                    type: 'success'
                                });
                                this.$router.replace({
                                    name: "LocationList"
                                });
                            })
                            .catch(e => {
                                this.errors.push(e)
                            })
                    } else {
                        location.locationCreation(obj)
                            .then(response => {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Venue Created Successfully',
                                    type: 'success'
                                });
                                this.$router.replace({
                                    name: "LocationList"
                                });
                            })
                            .catch(e => {
                                this.errors.push(e)
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

<style>
/* .el-select>.el-input {
    display: block;
    width: 630px;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 630px;
} */
</style>>
