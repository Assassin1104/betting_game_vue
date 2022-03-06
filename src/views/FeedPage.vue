<template>
    <div class="feed-page-container">
        <div v-if="loading" style="height: 10px;">
            <b-progress :value="current_counter" :max="100" animated></b-progress>
        </div>
        <CCard bodyWrapper>
            <div class="d-flex justify-content-between mb-5">
                <div class="d-flex align-items-center">
                    <CSwitch
                        shape='pill'
                        color="success"
                        class="mr-2"
                        @update:checked="followOnly = $event"
                    />
                    <span>My tipsters</span>
                    <CSwitch
                        shape='pill'
                        color="info"
                        class="mx-2"
                        @update:checked="followStrategyOnly = $event"
                    />
                    <span>My strategy</span>
                </div>
                <CButton color="info" shape="pill" variant="outline" @click="init">
                    Refresh
                </CButton>
            </div>
            <div :key="index" v-for="(item, index) in filteredData">
                <post-card 
                    :key="refreshKey"
                    :index="index"
                    :loading="cashoutQueue.map(item => item._id).includes(item._id)"
                    :item="item"
                    :handleLikeTip="handleLikeTip"
                    :handleFollowTip="handleFollowTip"
                    :handleFollowUser="handleFollowUser"
                    :handleFollowStrategy="handleFollowStrategy"
                    :handlePostComment="handlePostComment"
                    :handleSelectReply="handleSelectReply"
                    :onCashOut="handleCashOut"
                />
            </div>
        </CCard>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    import Avatar from '@/components/Avatar';
    import PostCard from '@/components/PostCard';

    import { VUE_APP_URL } from '@/config';
    import tipMixin from '@/mixins/TipMixin';
    import commonMixin from '@/mixins/common/commonMixin';
    import {convertUTCToLocal, defaultFormat} from '@/helpers/time';
    import {displaySuccess, displayError} from '@/helpers/message';

    export default {
        name: 'PostTip',
        mixins: [commonMixin, tipMixin],
        components: {
            Avatar,
            PostCard
        },
        data () {
            return {
                data: [],
                followOnly: false,
                followStrategyOnly: false,
                cashOutTimer: null,
                refreshKey: 0,
            }
        },
        computed: {
            ...mapGetters(['loggedInUser']),
            filteredData() {
                this.refreshKey;
                let result = this.data.slice();
                if(this.followOnly) {
                    result = result.filter(item => item.isFollowed);
                }
                if(this.followStrategyOnly) {
                    result = result.filter(item => item.strategyData && item.strategyData.followers.includes(parseInt(this.loggedInUser.user_id)));
                }
                return result;
            }
        },
        methods: {
            ...mapActions([
                'getFeeds',
                'postComment',
                'toggleLikeTip',
                'toggleFollowTip',
                'toggleFollowUser',
                'toggleFollowStrategy',
                'getMyPendingFeeds',
                'cashOut'
            ]),
            updateCashOut() {
                this.getMyPendingFeeds().then(({data}) => {
                    data.forEach((dItem) => {
                        let fIndex = this.data.findIndex(item => item._id === dItem._id);
                        if(fIndex > -1) {
                            /** update fixture */
                            const fixture = dItem.fixture;
                            this.data[fIndex].fixture = fixture;
                        }
                    });
                    /** settle cash out */
                    if(this.cashoutQueue.length > 0) {
                        this.cashoutQueue.every(cItem => {
                            let fIndex = this.data.findIndex(item => item._id === cItem._id);
                            if(fIndex > -1) {
                                let just = this.data[fIndex].fixture[0];
                                let old = cItem.fixture[0];
                                if(
                                    just.odd === old.odd && 
                                    just.scores.localteam_score === old.scores.localteam_score && 
                                    just.scores.visitorteam_score === old.scores.visitorteam_score
                                ) {
                                    try {
                                        this.cashOut(cItem).then((res) => {
                                            this.data[fIndex] = {
                                                ...this.data[fIndex],
                                                ...res.data
                                            }
                                            const temp = this.data[fIndex];
                                            this.data.splice(fIndex, 1);
                                            this.data.unshift(temp);
                                            this.refreshKey ++;
                                            displaySuccess(res);
                                        });
                                    } catch(err) {
                                        displayError(err);
                                    } finally {
                                        this.cashoutQueue = [];
                                    }
                                } else {
                                    if(this.tipQueue.length > 0) 
                                        displayError({message: "Posting failed due to change of odds or score."});
                                    this.cashoutQueue = [];
                                }
                            }   
                            return true;
                        });
                    }
                    /** refresh cash out */
                    this.refreshKey ++;
                });
            },
            handleCashOut(idx) {
                this.cashoutQueue.push(this.filteredData[idx]);
            },
            makeFeed(fItem) {
                let fixture = fItem.fixture[0];
                fItem['eventName'] = `${fixture.localTeamName} : ${fixture.visitorTeamName}`;
                let startingAt = convertUTCToLocal(fixture.time.starting_at.date_time);
                fItem['startingAt'] = startingAt.toLocaleDateString() + ' ' + startingAt.toLocaleTimeString();
                fItem['status'] = fItem.status;
                let dateTime = convertUTCToLocal(fItem.dateTime, (new Date()).getTimezoneOffset() / 60);
                fItem['dateTime'] = defaultFormat(dateTime);
                fItem['replyTo'] = [];
                let comments = [];
                fItem.comments.forEach((cItem) => {
                    comments.push({
                        ...cItem,
                        dateTime: defaultFormat(convertUTCToLocal(cItem.dateTime, (new Date()).getTimezoneOffset() / 60)),
                        userName: cItem.user[0].alias,
                        userAvatar: `${VUE_APP_URL}/${cItem.user[0].avatar}`
                    });
                });
                let stat = fItem.stat;
                fItem = {
                    ...fItem,
                    userName: fItem.user[0].alias,
                    userAvatar: `${VUE_APP_URL}/${fItem.user[0].avatar}`,
                    comments,
                    total_tips: stat.totalCount,
                    roi:  stat.stakeTotal ? (stat.profitPTS / stat.stakeTotal * 100).toFixed(2) : 0,
                    followTip: (fItem.follow || []).includes(parseInt(this.loggedInUser.user_id)),
                    likeTip: (fItem.like || []).includes(parseInt(this.loggedInUser.user_id)),
                    followUserCount: (fItem.followingUsers || []).length
                };
                return fItem;
            },
            init() {
                this.data = [];
                this.getFeeds().then(({data: {feeds}}) => {
                    feeds.forEach(fItem => {
                        this.data.push(this.makeFeed(fItem));
                    });
                });
            }
        },
        watch: {
            
        },
        mounted() {
            this.init();
            this.sockets.subscribe('newFeed', (feed) => {
                const temp = this.makeFeed(feed);
                this.data
                    .filter(item => item.userId === feed.userId)
                    .forEach(item => item.total_tips = temp.total_tips);
                this.data.unshift(temp);
            });
            this.sockets.subscribe('new-comment', ({tipId, comments}) => {
                let index = this.data.findIndex(dItem => dItem._id === tipId);
                if(index > -1) {
                    this.data[index].comments = comments.map(cItem => ({
                        ...cItem,
                        dateTime: defaultFormat(convertUTCToLocal(cItem.dateTime, (new Date()).getTimezoneOffset() / 60)),
                        userName: cItem.user[0].alias,
                        userAvatar: `${cItem.user[0].avatar}`
                    }));
                }
            });
            this.sockets.subscribe('tip-settled', ({tip, stat}) => {
                this.data = this.data.filter(item => item._id !== tip._id);
                this.data
                    .filter(item => item.userId === tip.userId)
                    .forEach(item => item.roi = stat.stakeTotal ? (stat.profitPTS / stat.stakeTotal * 100).toFixed(2) : 0);
            });
            /** cash out */
            this.cashOutTimer = setInterval(this.updateCashOut, 13 * 1000);
        },
        beforeDestroy() {
            this.sockets.unsubscribe('newFeed');
            this.sockets.unsubscribe('new-comment');
            clearInterval(this.cashOutTimer);
        }
    }
</script>
<style lang="scss" scoped>
   .feed-page-container {
       .header {
           .header-item {
            display: flex;
            justify-content: space-between;
            div {
                display: flex;
            }
           }
       }
       .note-box {
           position: relative;
           margin-bottom: 20px;
           .note {
               padding: 5px;
               margin: 0 0 10px;
               min-height: 70px;
               background-color: #FEE;
               border-radius: 6px;
           }
           .action-box {
               display: flex;
               .action {
                   border-radius: 5px;
                   padding: 0 5px;
                   margin-right: 10px;
                   min-width: 70px;
                   text-align: center;
                   background-color: rgba(0,0,0,0.1);
                   &.selected {
                       background-color: #39F;
                       color: #FFF;
                   }
               }
           }
       }
       .comments {
           padding: 0 0 0 40px;
           .comment {
               .comment-header {
                   display: flex;
                   align-items: center;
               }
                p {
                    padding-left: 45px;
                }
           }
       }
       .post-comment {
           text-align: right;
           .btn {
           }
       }
   }
</style>