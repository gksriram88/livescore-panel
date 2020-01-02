<template lang="en-gb">
<div id="commentray" v-loading="loading" element-loading-text="Updating..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div style="border: 1px solid #eee; background-color:#e6e6ff ;padding:5px"></div>
    <el-card class="box-card">
        <el-row>
            <el-col :span="10">
                <b v-if="manualCommentryList.length > 0">*Click on comment to edit</b>
                <div class="commentry-col-2" style="padding-left:30px;" v-for="(item,index) in manualCommentryListPaginated" :key="index" v-on:click="onclickComent(item)">
                    <p class="live-commentry" id="live-commentry">
                        <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteComment(item)"></el-button>
                        </br></br>
                        <b>{{moment.utc(item.datetime).local().format("hh:mm A")}}  </b>
                        <span v-html="item.comment"></span>
                    </p>
                </div>
                <el-pagination small layout="prev, pager, next" :page-size=10 :total="manualCommentryList.length" :current-page.sync="currentPage" @current-change="pagechange" v-if="manualCommentryList.length > 0"></el-pagination>
            </el-col>
            <el-col :span="14">
                <draggable tag="ul" v-model="draggableList" style="list-style-type:none;">
                    <transition-group>
                        <li class="list-group-item" v-for="(element) in draggableList" :key="element.name">
                            <div style="padding:20px;">
                                <span class="text">{{ element.name }} </span>
                                <!-- <h5 v-if="element.id==0">{{element.text}}</h5> -->
                                <el-input type="textarea" :autosize="{ minRows: 2}" placeholder="Please enter Plain Text" v-model="element.text" v-if="element.id==0"></el-input>
                                <el-input type="textarea" placeholder="Please enter Plain Text" v-model="element.text" v-if="element.id==1"></el-input>
                                <input type="url" v-model="element.text" id="url" placeholder="https://images.sportsflashes.com" pattern="https://.*" size="700" style="height:30px;font-size:10pt;width: 80%;" v-if="element.id==2">
                    </div>
                        </li>
                    </transition-group>
                </draggable>
                <el-dialog title="Preview commentry" :visible.sync="dialogFormPreview" width="80%" style="text-align:center;">
                    <div class="col-player">
                        <span v-html="rawHtml"></span>
                    </div>
                    <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="onOk">Ok</el-button>
        </span>
                </el-dialog>
            </el-col>
        </el-row>
    </el-card>
    <div style="border: 1px solid #eee; background-color:#e6e6ff ;padding:10px">
        <el-button style="font-size:15px; font-weight:400;" @click="resetForm()">Reset</el-button>
        <el-button type="primary" style="font-size:15px; font-weight:400;" @click="submitForm()">Submit</el-button>
    </div>
</div>
</template>

<script>
import overlist from '../api-services/overlist.service'
import draggable from 'vuedraggable';
import manualCommentry from '../api-services/manualCommentry.service'

import {
    handleUnauthorize
} from '../common/util.js'
import Vue from 'vue'

export default {
    name: 'commentray',
    data() {
        return {
            dialogFormPreview: false,
            manualCommentry: '',
            manualCommentryList: [],
            manualCommentryListPaginated: [],
            manualcommmentryData: {},
            currentPage: 1,
            rawHtml: '',
            loading: false,
            Embed: 1,
            Text: 2,
            Image: 3,
            draggableList: [{
                    name: "Text",
                    text: "",
                    id: 0
                },
                {
                    name: "Embed",
                    text: "",
                    id: 1
                },
                {
                    name: "Image",
                    text: "",
                    id: 2
                }
            ],
        }
    },
    created() {
        manualCommentry.getManualCommentryList(this.$route.params.id)
            .then(response => {
                this.manualCommentryList = response.data.data
                this.manualCommentryListPaginated = this.manualCommentryList.slice(this.manualCommentryList.length - 10, this.manualCommentryList.length);
                if (this.manualCommentryList.length % 10 == 0)
                    this.currentPage = parseInt(this.manualCommentryList.length / 10)
                else
                    this.currentPage = parseInt(this.manualCommentryList.length / 10) + 1
                instgrm.Embeds.process()
                twttr.widgets.load().then(res => {
                    console.log("res", res)
                }).catch(err => {
                    console.log("err", err)
                })
            }).catch(err => {
                handleUnauthorize(err)
            })
    },
    methods: {
        onclickComent(item) {
            this.resetForm()
            this.manualcommmentryData = item
            for (let key in this.draggableList) {
                if (this.draggableList[key].name == 'Text') {
                    let text = this.manualcommmentryData['comment'].split('<span id="text">')[1]
                    if (text)
                        this.draggableList[key].text = text.split('</span>')[0]
                    else
                        this.draggableList[key].text = this.manualcommmentryData['comment']
                }
                if (this.draggableList[key].name == 'Embed') {
                    let text = this.manualcommmentryData['comment'].split('<p id="embed">')[1]
                    if (text) {
                        let textArray = text.split('</p><p></p>')
                        this.draggableList[key].text = textArray[0]
                    }
                }
                if (this.draggableList[key].name == 'Image') {
                    let text = this.manualcommmentryData['comment'].split('<img id="img" alt="" src="')[1]
                    if (text)
                        this.draggableList[key].text = text.split('" style="height')[0]
                }
            }
        },
        onOk() {
            this.rawHtml = ''
            this.dialogFormPreview = false
        },
        submitForm() {
            this.loading = true
            this.comment = ''
            for (let key in this.draggableList) {
                if (this.draggableList[key].id == 0 && this.draggableList[key].text != '') {
                    let textComent = '<span id="text">' + this.draggableList[key].text + '</span>'
                    this.comment = this.comment + textComent
                }
                if (this.draggableList[key].id == 1 && this.draggableList[key].text != '') {

                    let embedComent = this.draggableList[key].text.split('<script')
                    this.comment = this.comment + '<p id="embed">' + embedComent[0] + '</p><p></p>'
                }
                if (this.draggableList[key].id == 2 && this.draggableList[key].text != '') {
                    let imageComent = '<img id="img" alt="" src="' + this.draggableList[key].text + '" style="height:294px; width:501px" />'
                    this.comment = this.comment + imageComent
                }
            }
            if (this.comment != '') {
                if (this.manualcommmentryData.key && this.manualcommmentryData.innings) {
                    let payload = {
                        "key": this.manualcommmentryData.key,
                        "match_id": this.$route.params.id,
                        "commentry": this.comment,
                        "innings": this.manualcommmentryData.innings
                    }
                    manualCommentry.updateManualCommentry(payload)
                        .then(response => {
                            manualCommentry.getManualCommentryList(this.$route.params.id)
                                .then(response => {
                                    this.resetForm()
                                    this.$notify({
                                        title: 'Success',
                                        message: 'Comment Updated Successfully',
                                        type: 'success'
                                    });
                                    this.manualCommentryList = response.data.data
                                    this.manualCommentryListPaginated = this.manualCommentryList.slice(this.manualCommentryList.length - 10, this.manualCommentryList.length);
                                    if (this.manualCommentryList.length % 10 == 0)
                                        this.currentPage = parseInt(this.manualCommentryList.length / 10)
                                    else
                                        this.currentPage = parseInt(this.manualCommentryList.length / 10) + 1
                                    instgrm.Embeds.process()
                                    twttr.widgets.load().then(res => {
                                        console.log("res", res)
                                    }).catch(err => {
                                        console.log("err", err)
                                    })
                                }).catch(err => {
                                    handleUnauthorize(err)
                                })

                        })
                        .catch(err => {
                            this.loading = false
                            handleUnauthorize(err)
                        })
                } else {
                    let payload = {
                        "match_id": this.$route.params.id,
                        "commentry": this.comment,
                    }
                    manualCommentry.addManualCommentry(payload)
                        .then(response => {
                            manualCommentry.getManualCommentryList(this.$route.params.id)
                                .then(response => {
                                    this.resetForm()
                                    this.$notify({
                                        title: 'Success',
                                        message: 'Comment added Successfully',
                                        type: 'success'
                                    });
                                    this.manualCommentryList = response.data.data
                                    this.manualCommentryListPaginated = this.manualCommentryList.slice(this.manualCommentryList.length - 10, this.manualCommentryList.length);
                                    if (this.manualCommentryList.length % 10 == 0)
                                        this.currentPage = parseInt(this.manualCommentryList.length / 10)
                                    else
                                        this.currentPage = parseInt(this.manualCommentryList.length / 10) + 1
                                    instgrm.Embeds.process()
                                    twttr.widgets.load().then(res => {
                                        console.log("res", res)
                                    }).catch(err => {
                                        console.log("err", err)
                                    })
                                }).catch(err => {
                                    handleUnauthorize(err)
                                })

                        })
                        .catch(err => {
                            this.loading = false
                            handleUnauthorize(err)
                        })
                }
            } else {
                this.loading = false
                this.$notify({
                    title: 'Error',
                    message: 'Please add some comment',
                    type: 'error'
                });
            }
        },
        deleteComment(item) {
            let payload = {
                "match_id": this.$route.params.id,
                "key": item.key,
                "innings": item.innings
            }
            console.log(payload)
            manualCommentry.deleteManualCommentry(payload)
                .then(response => {
                    manualCommentry.getManualCommentryList(this.$route.params.id)
                        .then(response => {
                            this.resetForm()
                            this.$notify({
                                title: 'Success',
                                message: 'Comment delete Successfully',
                                type: 'success'
                            });
                            this.manualCommentryList = response.data.data
                            this.manualCommentryListPaginated = this.manualCommentryList.slice(this.manualCommentryList.length - 10, this.manualCommentryList.length);
                            if (this.manualCommentryList.length % 10 == 0)
                                this.currentPage = parseInt(this.manualCommentryList.length / 10)
                            else
                                this.currentPage = parseInt(this.manualCommentryList.length / 10) + 1
                            instgrm.Embeds.process()
                            twttr.widgets.load().then(res => {
                                console.log("res", res)
                            }).catch(err => {
                                console.log("err", err)
                            })
                        }).catch(err => {
                            handleUnauthorize(err)
                        })

                })
                .catch(err => {
                    this.loading = false
                    handleUnauthorize(err)
                })
        },
        resetForm() {
            this.manualcommmentryData = {}
            this.draggableList = [{
                    name: "Text",
                    text: "",
                    id: 0
                },
                {
                    name: "Embed",
                    text: "",
                    id: 1
                },
                {
                    name: "Image",
                    text: "",
                    id: 2
                }
            ]
            this.loading = false
        },
        pagechange(val) {
            this.manualCommentryListPaginated = this.manualCommentryList.slice(10 * (val - 1), 10 * val);
        }
    },
    components: {
        draggable
    },
    mounted() {
        const plugin = document.createElement("script");
        plugin.setAttribute(
            "src",
            "http://www.instagram.com/embed.js"
        );
        plugin.async = true;
        document.head.appendChild(plugin);
        const plugin1 = document.createElement("script");
        plugin1.setAttribute(
            "src",
            "https://platform.twitter.com/widgets.js"
        );
        plugin1.async = true;
        document.head.appendChild(plugin1);
    },
}
</script>

<style>
.live-commentry {
    font-size: 0.9rem;
    margin-top: 0;
    text-align: left;
    padding: 10px;
    border: 1px solid #eee;
    background-color: lightgray;
}

.live-commentry img#img {
    max-width: 100%;
}

.live-commentry iframe {
    max-width: 100%;
}

.commentry-col-2 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 16.66%;
    flex: 0 0 16.66%;
    min-width: 16.66%;
}

.over {
    display: inline-block;
    box-sizing: border-box;
    padding: 10px
}

input {
    display: inline-block;
    width: 50%;
}

.text {
    margin: 20px;
}
</style>
