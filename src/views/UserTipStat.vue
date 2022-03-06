<template>
    <div class="user-stat-page-container">
        <div v-if="loading" class="d-flex justify-content-center m-2" style="height: 10px;">
            <CSpinner
                color="info"
                style="width:4rem;height:4rem;"
            />
        </div>
        <CCard v-else bodyWrapper>
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
            <CTabs>
                <CTab title="My tips">
                    <CCallout color="warning">
                        <strong class="h2">Pending Tips</strong> - 
                        <span class="text-muted h4">{{data.filter(item => !item.settled).length}}</span>
                    </CCallout>
                    <div :key="item._id" v-for="(item, index) in data.filter(item => !item.settled)">
                        <post-card 
                            :key="refreshCashoutKey"
                            :index="index"
                            :item="item"
                            :loading="cashoutQueue.map(item => item._id).includes(item._id)"
                            :unread="!!notifications.find(nItem => nItem.tipId === item._id && !nItem.commentId && !nItem.readAt)"
                            :handleLikeTip="handleLikeTip"
                            :handleFollowTip="handleFollowTip"
                            :handleFollowUser="handleFollowUser"
                            :handleFollowStrategy="handleFollowStrategy"
                            :handlePostComment="handlePostComment"
                            :handleSelectReply="handleSelectReply"
                            :onCashOut="handleCashOut"
                        />
                    </div>
                    <CCallout color="success">
                        <strong class="h2">Settled Tips</strong> - 
                        <span class="text-muted h4">{{data.filter(item => item.settled).length}}</span>
                    </CCallout>
                    <div :key="item._id" v-for="(item, index) in data.filter(item => item.settled)">
                        <post-card 
                            :key="refreshCashoutKey"
                            :index="index"
                            :item="item"
                            :loading="cashoutQueue.map(item => item._id).includes(item._id)"
                            :unread="!!notifications.find(nItem => nItem.tipId === item._id && !nItem.commentId && !nItem.readAt)"
                            :handleLikeTip="handleLikeTip"
                            :handleFollowTip="handleFollowTip"
                            :handleFollowUser="handleFollowUser"
                            :handleFollowStrategy="handleFollowStrategy"
                            :handlePostComment="handlePostComment"
                            :handleSelectReply="handleSelectReply"
                            :onCashOut="handleCashOut"
                        />
                    </div>
                </CTab>
                <CTab title="Strategies">
                    <template v-if="userId === stat.userId">
                        <h4 class="my-4">Create a strategy:</h4>
                        <CInput
                            label="Name:"
                            placeholder="e.g.strategy 43"
                            :value.sync="name"
                            :horizontal="{ label: 'col-sm-1', input: 'col-sm-11'}"
                        />
                        <CTextarea
                            rows="3"
                            label="Description:"
                            placeholder="e.g.This strategy is for testing over 2.5 at half time when the home team is leadig at half time"
                            :value.sync="description"
                            :horizontal="{ label: 'col-sm-1', input: 'col-sm-11'}"
                        />
                        <div class="text-right">
                            <CButton color="primary" @click="handleCreate" :disabled="!name || !description">
                                Create
                            </CButton>
                        </div>
                        <hr />
                    </template>
                    
                    <h4 class="my-4">Strategy list:</h4>
                    <ListTable 
                        :key="`${strategies.length}${refreshKey}`"
                        :loading="loading"
                        :items="strategies" 
                        :fields="columns" 
                        :showPagination="false" 
                    />
                </CTab>
            </CTabs>
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
        name: 'PostTip',
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
                    resetCount: 0
                },
                notifications: [],
                name: '',
                description: '',
                strategies: [],
                refreshKey: 0,
                refreshCashoutKey: 0,
                cashOutTimer: null,
            }
        },
        computed: {
            ...mapGetters(['loggedInUser']),
            columns() {
                return [
                    { key: 'name', label: 'Name' },
                    { key: 'total_tips', label: 'Tips', _style:'' },
                    { key: 'profit_pts', label: 'Pts', _style:'' },
                    { key: 'roi', label: 'ROI%', _style:'' },
                    { key: 'w_rate', label: 'W/rate', _style:'' },
                    { key: 'strategy_followers', label: 'Followers', _style:'' },
                    { key: 'strategy_info', label: 'Info', _style:'' },
                    { key: 'actions', label: '' },
                ];
            },
        },
        methods: {
            ...mapActions([
                'getFeedsByUserId',
                'postComment',
                'resetTip',
                'toggleLikeTip',
                'toggleFollowTip',
                'toggleFollowUser',
                'toggleFollowStrategy',
                'createStrategy',
                'deleteStrategy',
                'getUserStrategies',
                'getMyPendingFeeds',
                'cashOut'
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
                            let user_id = localStorage.getItem('user_id');
                            this.resetTip({user_id}).then(({status}) => {
                                if(status === 'success') {
                                    this.data = this.data.filter(dItem => dItem.settled === 0 || dItem.type === 'label');
                                    this.stat = {
                                        ...this.stat,
                                        total_tips: 0,
                                        roi:  0,
                                        profit_pts: 0,
                                        w_rate: 0,
                                        resetCount: this.stat.resetCount + 1
                                    };
                                }
                            });
                        }
                    })
            },
            FollowStrategy(index) {
                let strategy = this.strategies[index];
                this.toggleFollowStrategy({
                    id: strategy._id
                }).then(({data, status}) => {
                    this.strategies[index].followerCount = data.followers.length;
                    this.strategies[index].followers = data.followers;
                    this.refreshKey ++;
                });
            },
            handleDetailClick(index) {
                const data = this.strategies[index];
                let routeData = this.$router.resolve({
                    name: 'UserStrategyStat',
                    params: {
                        id: data._id
                    }
                });
                window.open(routeData.href, '_blank');
            },
            async handleDeleteClick(index) {
                try {
                    const data = this.strategies[index];
                    const res = await this.deleteStrategy({id: data._id});
                    this.strategies.splice(index, 1);
                    displaySuccess(res);
                } catch(err) {
                    console.log(err);
                }
            },
            handleCashOut(idx) {
                this.cashoutQueue.push(this.data[idx]);
            },
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
                                            let temp = this.data[fIndex];
                                            let dateTime = convertUTCToLocal(temp.dateTime, (new Date()).getTimezoneOffset() / 60);
                                            temp['dateTime'] = defaultFormat(dateTime);
                                            console.log(temp.dateTime)
                                            this.data.splice(fIndex, 1);
                                            this.data.splice(1, 0, temp);
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
                    this.refreshCashoutKey ++;
                });
            },
            makeFeed(fItem) {
                let comments = [];
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
                fItem['replyTo'] = [];
                fItem.comments.forEach((cItem) => {
                    comments.push({
                        ...cItem,
                        dateTime: defaultFormat(convertUTCToLocal(cItem.dateTime, (new Date()).getTimezoneOffset() / 60)),
                        userName: cItem.user[0].alias,
                        userAvatar: `${cItem.user[0].avatar}`
                    });
                });
                fItem = {
                    ...fItem  ,
                    userName: fItem.user[0].alias,
                    userAvatar: `${fItem.user[0].avatar}`,
                    comments,
                    followTip: (fItem.follow || []).includes(parseInt(this.loggedInUser.user_id)),
                    likeTip: (fItem.like || []).includes(parseInt(this.loggedInUser.user_id)),
                    followUserCount: (fItem.followingUsers || []).length
                };
                return fItem;
            },
            init() {
                this.runTimer();
                const {id, notifications} = this.$route.params;
                if(notifications) {
                    this.notifications = notifications.slice();
                }
                this.data = [];
                this.getFeedsByUserId({id: parseInt(id)}).then(({data: {feeds, stat}}) => {
                    this.stat = {
                        ...this.stat,
                        userId: parseInt(id),
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
                    feeds.sort((a, b) => {
                        return Math.abs(a.settled) - Math.abs(b.settled);
                    });
                    feeds.forEach(fItem => {
                        this.data.push(this.makeFeed(fItem));
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
                this.initStrategies();
            },
            initStrategies() {
                const {id} = this.$route.params;
                this.getUserStrategies({id: parseInt(id)}).then(({data}) => {
                    this.strategies = [];
                    data.forEach(dItem => {
                        let stat = dItem.stat;
                        let actions = [{
                                type: 'button',
                                label: 'Details',
                                funcAction: this.handleDetailClick
                            }, {
                                type: 'button',
                                label: 'Delete',
                                color: 'danger',
                                funcAction: this.handleDeleteClick
                        }];
                        if(`${id}` !== `${this.loggedInUser.user_id}`)
                            actions = actions.slice(0, 1);
                        this.strategies.push(
                            {
                                ...dItem,
                                total_tips: stat.totalCount || 0,
                                roi:  stat.stakeTotal ? (stat.profitPTS / stat.stakeTotal * 100).toFixed(2) : 0,
                                profit_pts: stat.profitPTS ? stat.profitPTS.toFixed(2) : 0,
                                w_rate: (stat.settledWin + stat.settledLose) ? ((stat.settledWin / (stat.settledWin + stat.settledLose)) * 100).toFixed(2) : 0,
                                followerCount: (dItem.followers || []).length,
                                onFollow: this.FollowStrategy,
                                actions,
                            }
                        )
                    });
                });
            },
            async handleCreate() {
                try {
                    const res = await this.createStrategy({
                        name: this.name,
                        description: this.description
                    });
                    displaySuccess(res);
                    this.name = '';
                    this.description = '';
                    this.initStrategies();
                } catch(err) {
                    console.log(err);
                }
            }
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
            this.sockets.subscribe('newFeed', (feed) => {
                this.data.splice(1, 0, this.makeFeed(feed));
                this.stat.total_tips = this.stat.total_tips + 1;
                let fIndex = this.strategies.findIndex(item => item.userId === feed.userId);
                if(fIndex > -1)
                    this.strategies[fIndex].total_tips = this.strategies[fIndex].total_tips + 1;
            });
            this.sockets.subscribe('tip-settled', ({tip, stat}) => {
                this.stat = {
                    ...this.stat,
                    total_tips: stat.totalCount,
                    roi:  stat.stakeTotal ? (stat.profitPTS / stat.stakeTotal * 100).toFixed(2) : 0,
                    profit_pts: stat.profitPTS.toFixed(2),
                    w_rate: stat.settledLose + stat.settledWin ? ((stat.settledWin / (stat.settledLose + stat.settledWin)) * 100).toFixed(2) : 0,
                };
                let fIndex = this.data.findIndex(item => item._id === tip._id);
                this.data[fIndex] = {
                    ...this.data[fIndex],
                    ...tip
                };
            });
            /** cash out */
            this.cashOutTimer = setInterval(this.updateCashOut, 13 * 1000);
        },
        created() {
        },
        beforeDestroy() {
            this.sockets.unsubscribe('new-comment');
            clearInterval(this.cashOutTimer);
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