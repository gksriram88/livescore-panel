<template lang="en-gb">
<div id="commentray" v-loading="loading" element-loading-text="Updating..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div style="border: 1px solid #eee; background-color:#e6e6ff ;padding:5px"></div>
    <el-card class="box-card">
        <div class="over">
            <span style="padding:10px;">Innings </span>
            <el-select v-model="innings" placeholder="Select" v-on:change="OnchangeInnings">
                <el-option label=1 value=1>
                </el-option>
                <el-option label=2 value=2>
                </el-option>
            </el-select>
        </div>
        <div class="over">
            <span style="padding:10px;">Over </span>
            <el-select v-model="over" placeholder="Select" v-on:change="OnchangeOver">
                <el-option v-for="item in lastOver" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
        </div>
        <div class="over">
            <span style="padding:10px;">Ball </span>
            <el-select v-model="ball" placeholder="Select" v-on:change="OnchangeBall">
                <el-option v-for="item in ballList" :key="item.id" :label="item.over" :value="item.ball_id">
                </el-option>
            </el-select>
        </div>
        <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/lxr07yicp60" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
        <!-- <blockquote class="twitter-tweet" data-lang="en-gb"><p lang="en" dir="ltr">Only 40 days to go for <a href="https://twitter.com/ICC?ref_src=twsrc%5Etfw">@ICC</a> <a href="https://twitter.com/cricketworldcup?ref_src=twsrc%5Etfw">@cricketworldcup</a> 2019 !<a href="https://twitter.com/hashtag/AfghanAtalan?src=hash&amp;ref_src=twsrc%5Etfw">#AfghanAtalan</a> <a href="https://twitter.com/hashtag/CWC2019?src=hash&amp;ref_src=twsrc%5Etfw">#CWC2019</a> <a href="https://twitter.com/hashtag/CWC19?src=hash&amp;ref_src=twsrc%5Etfw">#CWC19</a> <a href="https://t.co/edGfPBOd1x">pic.twitter.com/edGfPBOd1x</a></p>&mdash; Afghanistan Cricket Board (@ACBofficials) <a href="https://twitter.com/ACBofficials/status/1119656895415975939?ref_src=twsrc%5Etfw">20 April 2019</a></blockquote> -->
        <!-- <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor> -->
        <!-- <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/BwANg9eHaBs/?utm_source=ig_embed&amp;utm_medium=loading" data-instgrm-version="12" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/BwANg9eHaBs/?utm_source=ig_embed&amp;utm_medium=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div><div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div></a> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://www.instagram.com/p/BwANg9eHaBs/?utm_source=ig_embed&amp;utm_medium=loading" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">If it&#39;s green, it&#39;s clean. #gogreen</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A post shared by <a href="https://www.instagram.com/himmatsingh89/?utm_source=ig_embed&amp;utm_medium=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;" target="_blank"> Himmat Singh</a> (@himmatsingh89) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2019-04-08T17:41:16+00:00">Apr 8, 2019 at 10:41am PDT</time></p></div></blockquote> -->
        <!-- <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FMartinTheSituAsianNguyen%2Fposts%2F2368131189884922%3A0&width=500" width="500" height="708" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe> -->
        <!-- <p><img alt="" src="https://images.sportsflashes.com/1555666966-indiahockey.jpg" style="height:294px; width:501px" /></p> -->
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
    </el-card>
    <div style="border: 1px solid #eee; background-color:#e6e6ff ;padding:10px">
        <el-button type="primary" style="font-size:15px; font-weight:400;" @click="submitForm()">Submit</el-button>
        <el-button @click="previewForm()" style="font-size:15px; font-weight:400;">Preview</el-button>
    </div>
</div>
</template>

<script>
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import overlist from '../api-services/overlist.service'
import draggable from 'vuedraggable';
import commentry from '../api-services/commentry.service'

import {
    handleUnauthorize
} from '../common/util.js'
import Vue from 'vue'

export default {
    name: 'commentray',
    data() {
        return {
            dialogFormPreview: false,
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
            embedContain: '',
            innings: 1,
            over: '',
            lastOver: '',
            ball: '',
            ballList: [],
            comment: '',
            apiResposeInnings: [],
            overListApiResponse: {},
            automatedcommmentryData: {},
            // editor: ClassicEditor,
            // editorData: '<p>Content of the editor.</p>',
            // editorConfig: {
            //     // The configuration of the editor.
            // }
        }
    },
    created() {
        overlist.getOverList(this.$route.params.id)
            .then(response => {
                this.overListApiResponse = response.data
                this.innings = this.overListApiResponse.status.innings
                this.lastOver = Math.trunc(this.overListApiResponse.status.over) + 1
                this.over = this.lastOver
                this.ball = this.overListApiResponse.status.over
                this.ballList = []
                if (this.innings == 1) {
                    this.apiResposeInnings = this.overListApiResponse.innings_1
                } else {
                    this.apiResposeInnings = this.overListApiResponse.innings_2
                }
                for (let key in this.apiResposeInnings) {
                    if (this.over - 1 == Math.trunc(this.apiResposeInnings[key].over)) {
                        this.ballList.push(this.apiResposeInnings[key])
                    }
                }
                this.getCommentry(this.$route.params.id, this.overListApiResponse.status.ball, this.innings)
                // commentry.getAutomatedCommentry(this.$route.params.id, this.overListApiResponse.status.ball, this.innings)
                //     .then(response => {
                //         this.automatedcommmentryData = response.data.data
                //         for (let key in this.draggableList) {
                //             if (this.draggableList[key].id == 0) {
                //                 this.draggableList[key].text = this.automatedcommmentryData['comment'].replace("<p>", "").replace("</p>", "")
                //             }
                //         }
                //     })
                //     .catch(err => {
                //         this.loading = false
                //         handleUnauthorize(err)
                //     })
            }).catch(err => {
                handleUnauthorize(err)
            })
    },
    methods: {
        getCommentry(id, ball, innings) {
            commentry.getAutomatedCommentry(id, ball, innings)
                .then(response => {
                    this.automatedcommmentryData = response.data.data
                    for (let key in this.draggableList) {
                        if (this.draggableList[key].name == 'Text') {
                            let text=this.automatedcommmentryData['comment'].split('<span id="text">')[1]
                            if(text)
                                this.draggableList[key].text=text.split('</span>')[0]
                            else
                                this.draggableList[key].text=this.automatedcommmentryData['comment']
                        }
                        if (this.draggableList[key].name == 'Embed') {
                            let text=this.automatedcommmentryData['comment'].split('<p id="embed">')[1]
                            if(text){
                            let textArray = text.split('</p><p></p>')
                            this.draggableList[key].text=textArray[0]
                            }
                        }
                        if (this.draggableList[key].name == 'Image') {                            
                            let text=this.automatedcommmentryData['comment'].split('<img id="img" alt="" src="')[1]
                            if (text)
                                this.draggableList[key].text=text.split('" style="height')[0]
                        }
                    }
                })
                .catch(err => {
                    this.loading = false
                    handleUnauthorize(err)
                })
        },
        OnchangeInnings(val) {
            this.over = ''
            this.ball = ''
            if (this.innings == 1) {
                this.apiResposeInnings = this.overListApiResponse.innings_1
            } else {
                this.apiResposeInnings = this.overListApiResponse.innings_2
            }
            if (this.apiResposeInnings.length > 0)
                this.lastOver = Math.trunc(this.apiResposeInnings[this.apiResposeInnings.length - 1].over) + 1
            else {
                this.$notify({
                    title: 'Error',
                    message: '2nd Innings is Not Started',
                    type: 'error'
                });
            }
        },
        OnchangeOver(val) {
            this.ball = ''
            this.ballList = []
            for (let key in this.apiResposeInnings) {
                if (val - 1 == Math.trunc(this.apiResposeInnings[key].over)) {
                    this.ballList.push(this.apiResposeInnings[key])
                }
            }
        },
        OnchangeBall(val) {
            this.getCommentry(this.$route.params.id, val, this.innings)
        },
        submitForm() {
            if (this.innings && this.over != '' && this.ball != '') {
                this.loading = true
                this.comment = ''
                for (let key in this.draggableList) {
                    if (this.draggableList[key].id == 0 && this.draggableList[key].text != '') {
                        let textComent = '<span id="text">' + this.draggableList[key].text + '</span>'
                        this.comment = this.comment + textComent
                    }
                    if (this.draggableList[key].id == 1 && this.draggableList[key].text != '') {

                        let embedComent = this.draggableList[key].text.split('<script')
                        this.comment = this.comment + '<p id="embed">'+embedComent[0]+ '</p><p></p>'
                    }
                    if (this.draggableList[key].id == 2 && this.draggableList[key].text != '') {
                        let imageComent = '<img id="img" alt="" src="' + this.draggableList[key].text + '" style="height:294px; width:501px" />'
                        this.comment = this.comment + imageComent
                    }
                }
                let payload = {
                    "ball_id": this.automatedcommmentryData.ball_id,
	                "match_id": this.$route.params.id,
                    "commentry": this.comment,
                    "innings":this.automatedcommmentryData.innings
                }
                commentry.updateAutomatedCommentry(payload)
                    .then(response => {
                        this.resetForm()
                        this.$notify({
                            title: 'Success',
                            message: 'Comment Updated Successfully',
                            type: 'success'
                        });
                    })
                    .catch(err => {
                        this.loading = false
                        handleUnauthorize(err)
                    })

            } else {
                this.$notify({
                    title: 'Error',
                    message: 'Please choose Innings ,Over and Ball',
                    type: 'error'
                });
            }
        },
        onOk() {
            this.rawHtml = ''
            this.dialogFormPreview = false
        },
        previewForm() {
            if (this.innings && this.over != '' && this.ball != '') {
                instgrm.Embeds.process();
                this.comment = ''
                for (let key in this.draggableList) {
                    if (this.draggableList[key].id == 0) {
                        let textComent = '<span id="text">' + this.draggableList[key].text + '</span>'
                        this.comment = this.comment + textComent

                    }
                    if (this.draggableList[key].id == 1) {
                        let embedComent = this.draggableList[key].text.split('<script')
                        this.comment = this.comment + '<p id="embed">'+embedComent[0]+ '</p>'
                    }
                    if (this.draggableList[key].id == 2) {
                        let imageComent = '<img alt="" src="' + this.draggableList[key].text + '" style="height:294px; width:501px" />'
                        this.comment = this.comment + imageComent
                    }
                }
                this.rawHtml = this.comment
                this.dialogFormPreview = true

            } else {
                this.$notify({
                    title: 'Error',
                    message: 'Please choose Innings ,Over and Ball',
                    type: 'error'
                });
            }
        },
        resetForm() {
            overlist.getOverList(this.$route.params.id)
                .then(response => {
                    this.overListApiResponse = response.data
                    this.innings = this.overListApiResponse.status.innings
                    this.lastOver = Math.trunc(this.overListApiResponse.status.over) + 1
                    this.over = this.lastOver
                    this.ball = this.overListApiResponse.status.over
                    this.ballList = []
                    if (this.innings == 1) {
                        this.apiResposeInnings = this.overListApiResponse.innings_1
                    } else {
                        this.apiResposeInnings = this.overListApiResponse.innings_2
                    }
                    for (let key in this.apiResposeInnings) {
                        if (this.over - 1 == Math.trunc(this.apiResposeInnings[key].over)) {
                            this.ballList.push(this.apiResposeInnings[key])
                        }
                    }
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
                }).catch(err => {
                    this.loading = false
                    handleUnauthorize(err)
                })
        }
    },
    components: {
        draggable
    },
    mounted() {
        const plugin = document.createElement("script");
        plugin.async = true;
        plugin.setAttribute(
            "src",
            "http://www.instagram.com/embed.js"
        );
        document.head.appendChild(plugin);
        const plugin1 = document.createElement("script");
        plugin1.setAttribute(
            "src",
            "https://platform.twitter.com/widgets.js"
        );
        plugin1.async = true;
        document.head.appendChild(plugin1);
    },
    watch:{
      rawHtml:function () {
          instgrm.Embeds.process();
      }, }
}
</script>

<style>
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
