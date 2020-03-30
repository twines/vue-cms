<template>
    <el-card shadow="hover">
        <el-dialog title="视频播放" :visible.sync="showVideoDialog" @closed="stopVideo">
            <video-player class="video-player vjs-custom-skin"
                          ref="videoPlayer"
                          :playsinline="true"
                          :options="playerOptions">
            </video-player>
        </el-dialog>
        <el-table :data="roomList" stripe>
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="title" label="直播间名称"></el-table-column>
            <el-table-column prop="username" label="播主"></el-table-column>
            <el-table-column prop="avatar" label="头像">
                <template slot-scope="scope">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.avatar"
                            :preview-src-list="[scope.row.avatar]"
                            fit="contain">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="streamPath" label="推流地址">
                <template slot-scope="scope">
                    <el-button @click="showVideo(scope.row)" type="primary" size="small">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="cover" label="封面">
                <template slot-scope="scope">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.cover"
                            :preview-src-list="[scope.row.cover]"
                            fit="contain">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="房间描述"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status===1">
                        <el-tag>正常</el-tag>
                    </span>
                    <span v-else>
                        <el-tag type="danger">禁用</el-tag>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button type="warning" size="small" @click="showUserInfo(scope.row.id)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="paginate">
            <el-pagination
                    :hide-on-single-page="true"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    layout="prev, pager, next, jumper"
                    :page-count="totalPage">
            </el-pagination>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "RoomIndex",
        data() {
            return {
                roomList: [],
                totalPage: 1,
                currentPage: 1,
                showVideoDialog: false,
                playerOptions: {
                    //播放速度
                    playbackRates: [0.5, 1.0, 1.5, 2.0],
                    //如果true,浏览器准备好时开始回放。
                    autoplay: false,
                    // 默认情况下将会消除任何音频。
                    muted: false,
                    // 导致视频一结束就重新开始。
                    loop: false,
                    // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    preload: 'auto',
                    language: 'zh-CN',
                    // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    aspectRatio: '16:9',
                    // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    fluid: true,
                    sources: [{
                        //类型
                        type: "video/mp4",
                        //url地址
                        src: 'http://127.0.0.1:9999/storage/video/97.mp4'
                    }],
                    //你的封面地址
                    poster: '',
                    //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    notSupportedMessage: '此视频暂无法播放，请稍后再试',
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        //全屏按钮
                        fullscreenToggle: true
                    }
                }
            }
        },
        created() {
            this.getRoomList()
        },
        methods: {
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getRoomList();
            },
            stopVideo() {
                this.$refs.videoPlayer.player.pause();
            },
            showVideo(video) {
                // this.$VideoPlayer
                this.showVideoDialog = true;
                this.playerOptions.poster = video.cover;
                this.playerOptions.sources = [{
                    //类型
                    type: "video/mp4",
                    //url地址
                    src: video.streamPath
                }]
            },
            getRoomList() {
                this.$api.getRoomList(this.currentPage, this.keyword).then(v => {
                    this.roomList = v.data.data;
                    this.totalPage = v.data.totalPage;
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

    .demo {
        display: inline-block;
        width: 600px;
        height: 338px;
        text-align: center;
        line-height: 100px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo:hover {
        display: block;
    }

    .prefix-text {
        width: 108px;
        text-align: center;
    }

    .paginate {
        margin: 0 auto;
    }
</style>
