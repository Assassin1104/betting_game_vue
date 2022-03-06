<template>
    <div class="user-stat-page-container">
        <div v-if="loading" class="d-flex justify-content-center m-2" style="height: 10px;">
            <CSpinner
                color="info"
                style="width:4rem;height:4rem;"
            />
        </div>
        <CCard v-else bodyWrapper>
            <!-- <CButton color="info" size="sm"><CIcon name="cil-arrow-circle-left"></CIcon></CButton> -->
            <div class="stat">
                <div class="username">
                    <div>User Name</div>
                    <div class="d-flex">
                        <Avatar 
                            :key="stat.userAvatar"
                            :size="30"
                            :src="stat.userAvatar"
                            :username="stat.userName"
                            :userId="stat.userId" />
                        &nbsp;{{ stat.userName}}
                        </div>
                </div>
                <div class="strategy-name">
                    <div>Strategy Name</div>
                    <div>{{ strategy.name }}</div>
                </div>
                <div class="tips">
                    <div>Tips</div>
                    <div>{{ stat.total_tips}}</div>
                </div>
                <div class="profit-pts">
                    <div>Profit PTs</div>
                    <div>{{ stat.profit_pts}}</div>
                </div>
                <div class="roi">
                    <div>ROI %</div>
                    <div>{{ stat.roi}}</div>
                </div>
                <div class="w-rate">
                    <div>W/Rate</div>
                    <div>{{ stat.w_rate}}</div>
                </div>
                <div class="followers">
                    <div>Followers</div>
                    <div>{{ stat.followers}}</div>
                </div>
                <div v-if="userId === stat.userId" class="resetCount">
                    <div>Reset Count</div>
                    <div>{{ stat.resetCount}}</div>
                </div>
                <CButton 
                    v-if="userId === stat.userId"
                    color="info"
                    @click="handleReset">
                    Reset stat
                </CButton>
            </div>
            <div class="d-flex">
                <div class="font-weight-bold">Description:&nbsp;</div>
                <div style="flex: 1">{{ strategy.description }}</div>
            </div>
            <div :key="index" v-for="(item, index) in data">
                
                <CCallout v-if="item.type === 'label'" :color="item.color">
                    <strong class="h2">{{item.text}}</strong> - 
                    <span class="text-muted h4">{{item.count}}</span>
                </CCallout>
                <post-card 
                    v-else
                    :index="index"
                    :item="item"
                    :unread="notifications.find(nItem => nItem.tipId === item._id && !nItem.commentId && !nItem.readAt)"
                    :handleLikeTip="handleLikeTip"
                    :handleFollowTip="handleFollowTip"
                    :handleFollowUser="handleFollowUser"
                    :handlePostComment="handlePostComment"
                    :handleSelectReply="handleSelectReply"
                />
            </div>
        
        </CCard>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Swal from 'sweetalert2';

    import Avatar from '@/components/Avatar';
    import PostCard from '@/components/PostCard';
    import ListTable from '@/components/ListTable';

    import commonMixin from '@/mixins/common/commonMixin';
    import tipMixin from '@/mixins/TipMixin';
    import {capitalizeFL} from '@/helpers/string';
    import {displaySuccess} from '@/helpers/message';
    import {convertUTCToLocal, defaultFormat } from '@/helpers/time';

    export default {
        mixins: [commonMixin, tipMixin],
        components: {
            Avatar,
            PostCard,
            ListTable
        },
        data () {
            return {
                data: [],
                userId: '',
                stat: {
                    userName: '',
                    total_tips: 0,
                    roi:  0,
                    profit_pts: 0,
                    w_rate: 0,
                    followers: '',
                    resetCount: 0,
                    description: ''
                },
                strategy: {},
                notifications: [],
            }
        },
        computed: {
            ...mapGetters(['loggedInUser']),
        },
        methods: {
            ...mapActions([
                'getFeedsByStrategy',
                'postComment',
                'resetTip',
                'toggleLikeTip',
                'toggleFollowTip',
                'toggleFollowUser',
                'createStrategy',
                'getStrategies',
                'deleteStrategy',
            ]),
            handleReset() {
                Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, reset it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // let user_id = localStorage.getItem('user_id');
                            // this.resetTip({user_id}).then(({status}) => {
                            //     if(status === 'success') {
                            //         this.data = this.data.filter(dItem => dItem.settled === 0 || dItem.type === 'label');
                            //         this.stat = {
                            //             ...this.stat,
                            //             total_tips: 0,
                            //             roi:  0,
                            //             profit_pts: 0,
                            //             w_rate: 0,
                            //             resetCount: this.stat.resetCount + 1
                            //         };
                            //     }
                            // });
                        }
                    })
            },
            init() {
                this.runTimer();
                const {id, notifications} = this.$route.params;
                if(notifications) {
                    this.notifications = notifications.slice();
                }
                
                this.data = [];
                this.getFeedsByStrategy({id: id}).then(({data: {feeds, stat, strategy}}) => {
                    this.strategy = strategy;
                    this.stat = {
                        ...this.stat,
                        userId: parseInt(stat.user[0]._id),
                        userName: stat.user[0].alias,
                        userAvatar: stat.user[0].avatar,
                        followers: stat.followers,
                        resetCount: stat.resetCount
                    }
                    if(stat.totalCount) {
                        this.stat = {
                            ...this.stat,
                            total_tips: stat.totalCount,
                            roi:  stat.stakeTotal ? (stat.profitPTS / stat.stakeTotal * 100).toFixed(2) : 0,
                            profit_pts: stat.profitPTS.toFixed(2),
                            w_rate: stat.settledLose + stat.settledWin ? ((stat.settledWin / (stat.settledLose + stat.settledWin)) * 100).toFixed(2) : 0,
                        };
                    }
                    feeds.forEach((fItem) => {
                        let fixture = fItem.fixture[0];
                        fItem['eventName'] = `${fixture.localTeamName} : ${fixture.visitorTeamName}`;
                        let startingAt = convertUTCToLocal(fixture.time.starting_at.date_time);
                        fItem['startingAt'] = startingAt.toLocaleDateString() + ' ' + startingAt.toLocaleTimeString();
                        fItem['status'] = fItem.status;
                        let dateTime = convertUTCToLocal(fItem.dateTime, (new Date()).getTimezoneOffset() / 60);
                        fItem['dateTime'] = defaultFormat(dateTime);
                        const {scores} = fixture;
                        if(['FT', 'AET'].includes(fixture.time.status))
                            fItem['result'] = `${scores.ft_score} FT(${scores.ht_score} HT)`;
                        if(fItem.settled === -1)
                            fItem['pts'] = fItem.stake * (-1);
                        else if(fItem.settled === 1)
                            fItem['pts'] = (fItem.stake * (fItem.odd - 1)).toFixed(2);
                        fItem['replyTo'] = [];
                    });
                    /** count settled tips */
                    const settledTips = feeds.filter(fItem => fItem.settled).length;
                    const pendingTips = this.stat.total_tips - settledTips;
                    /** insert label for Settled tips */
                    this.data.push({
                        type: 'label',
                        color: 'warning',
                        text: 'Pending Tips',
                        count: pendingTips
                    });
                    feeds.sort((a, b) => {
                        return Math.abs(a.settled) - Math.abs(b.settled);
                    });
                    feeds.forEach(fItem => {
                        let comments = [];
                        fItem.comments.forEach((cItem) => {
                            comments.push({
                                ...cItem,
                                dateTime: defaultFormat(convertUTCToLocal(cItem.dateTime, (new Date()).getTimezoneOffset() / 60)),
                                userName: cItem.user[0].alias,
                                userAvatar: `${cItem.user[0].avatar}`
                            });
                        });
                        this.data.push({
                            ...fItem  ,
                            userName: fItem.user[0].alias,
                            userAvatar: `${fItem.user[0].avatar}`,
                            comments,
                            followTip: (fItem.follow || []).includes(parseInt(this.loggedInUser.user_id)),
                            likeTip: (fItem.like || []).includes(parseInt(this.loggedInUser.user_id)),
                            followUserCount: (fItem.followingUsers || []).length
                        });
                    });
                    
                    let fIndex = this.data.findIndex(fItem => fItem.settled);
                    if(fIndex === -1) {
                        fIndex = this.data.length;
                    } 
                    /** insert label for Pending Tips */
                    this.data.splice(fIndex, 0, {
                        type: 'label',
                        color: 'success',
                        text: 'Settled Tips',
                        count: settledTips
                    });
                }).finally(() => {
                    this.runTimer(false);
                    /** move scroll to one from notification */
                    const {selected} = this.$route.params;
                    if(selected) {
                        setTimeout(() => {
                            this.$nextTick(() => {
                                var el = document.querySelector(`#id${selected}`);
                                el.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'center'
                                });
                            });          
                        }, 500);
                    }
                });
            },
        },
        watch: {
            '$route.params': {
                deep: true,
                immediate: true,
                handler(val) {
                    if(!this.loading)
                        this.init();
                }
            }
        },
        mounted() {
            let user_id = localStorage.getItem('user_id');
            this.userId = parseInt(user_id);
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
        },
        created() {
        },
        beforeDestroy() {
            this.sockets.unsubscribe('new-comment');
        }
    }
</script>
<style lang="scss" scoped>
   .user-stat-page-container {
       .stat {
           display: flex;
           justify-content: space-between;
           margin-bottom: 20px;
           div {
               text-align: center;
           }
           .username {
               div {
                   text-align: left;
               }
               .vue-avatar--wrapper {
                    display: inline-flex !important;
                    margin-right: 5px;
                }
           }
       }
       .header {
           .header-item {
                display: flex;
                justify-content: space-between;
                position: relative;
                div {
                    display: flex;
                }
                .settled-lost {
                    font-weight: 700;
                    color: #FF0000;
                }
                .settled-won {
                    font-weight: 700;
                    color: #00FF00;
                }
           }
       }
       .unread-mark {
           top: 0px;
           left: 0px;
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
               position: relative;
               .comment-header {
                   display: flex;
                   align-items: center;
                   .vue-avatar--wrapper {
                       margin-right: 15px;
                   }
               }
                p {
                    padding-left: 45px;
                }
           }
       }
       .post-comment {
           text-align: right;
           margin-bottom: 10px;
           .btn {
           }
       }
    }   
    .c-callout {
        padding: 1rem;
        margin-top: 50px;
        background-color: #eee !important;
    }
</style>