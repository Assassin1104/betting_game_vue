<template>
    <div class="post-card">
        <div class="header" :id="'id' + item._id">
            <div class="header-item">
                <div>
                    <avatar :size="30" :username="item.userName" :src="item.userAvatar" :userId="item.userId" />
                    &nbsp; 
                    <CLink :to="{name: 'UserTipStat', params: {id: item.userId}}">
                        {{ item.userName }}
                    </CLink>
                    <span v-if="item.roi !== undefined && item.total_tips !== undefined">
                        &ensp;{{ item.roi }}% 
                        ({{ item.total_tips }} tips)
                    </span>
                    <span class="unread-mark" v-if="unread"></span>
                </div>
                <div>
                    Posted: {{item.dateTime}}
                </div>
            </div>
            <div class="header-item">
                <div>
                    <strong>{{item.eventName}}</strong>
                </div>
                <div>
                    {{capitalizeVisibility(item.visibility)}}
                </div>
            </div>
            <div v-if="item.visible" class="header-item">
                <div>
                    Tips:&nbsp;{{item.predictionType}} -
                    Odd:&nbsp;{{item.odd}} -
                    Stake pts:&nbsp;{{item.stake}} - 
                    <!-- {{item.settled === 0 ? 'Pending' : data.settled === 1 ? 'Won' : 'Lose'}} -->
                    {{item.status}}
                </div>
                <!-- cash out case  -->
                <div v-if="item.cashout">
                    PTS:&nbsp;
                    <span :class="{
                        'settled-won': item.profitPts > 0,
                        'settled-void': item.profitPts == 0,
                        'settled-lost': item.profitPts < 0,
                    }">{{item.profitPts}}</span>
                    &nbsp;
                    Result:&nbsp;{{currentStatus}}
                </div>
                <!-- normal tip settled -->
                <div v-else-if="item.profitPts !== '' && item.result">
                    Pts:&nbsp;<span :class="[`settled-${item.settled === 1 ? 'won':'lost'}`]">{{item.profitPts.toFixed(2)}}</span>
                    &nbsp;
                    Result:&nbsp;{{item.result}}
                </div>
            </div>
            <div class="header-item">
                {{item.country}} - 
                {{item.league}} -
                {{item.startingAt}}
            </div>

            <!-- strategy  -->
            <div v-if="item.strategyData">
                <strong>Strategy:&nbsp;</strong>
                <CLink :to="{name: 'UserStrategyStat', params: {id: item.strategyData._id}}">
                    {{ item.strategyData.name}}
                </CLink> [
                <span v-if="item.strategyStat.totalCount">
                    {{ item.strategyStat.stakeTotal ? (item.strategyStat.profitPTS / item.strategyStat.stakeTotal * 100).toFixed(2) : 0, }}% 
                    ({{ item.strategyStat.totalCount }} tips) ]
                </span>
                <div class="action-box" :key="item.strategyData.followers.length">
                    <div :class="{'action': true, 'selected': item.strategyData.followers.includes(parseInt(loggedInUser.user_id))}">
                        {{item.strategyData.followers.length}}
                        <span 
                            v-if="item.strategyData.userId !== parseInt(loggedInUser.user_id)" 
                            v-c-tooltip="!item.strategyData.followers.includes(parseInt(loggedInUser.user_id)) ? 'Follow this strategy':'You already followed this strategy'" 
                            @click="handleFollowStrategy(index)">
                            <CIcon name="cil-user-follow" />
                        </span>
                        <span v-else>
                            <CIcon name="cil-user-follow" class="disabled" />
                        </span>
                    </div>
                </div>
            </div>

            <!-- cash out -->
            <div 
                v-if="item.fixture && 
                    item.fixture.length > 0 && 
                    item.settled === 0 && 
                    !item.cashout" 
                class="cash-out mt-2"
            >
                <div>Cash out details:</div>
                <div class="header-item">
                    <div>
                        {{currentStatus}} - 
                        {{currentScore}} - 
                        Odd: {{currentOdd}}
                    </div>
                    <div>
                        Current profit:&nbsp;
                        <span 
                            v-if="currentPointProfit !== ''" 
                            :class="{
                                'settled-won': currentPointProfit > 0,
                                'settled-void': currentPointProfit == 0,
                                'settled-lost': currentPointProfit < 0}"
                        >{{currentPointProfit}}</span>
                        <span v-else>Not available</span>
                    </div>
                </div>
                <div v-if="isMe" class="header-item">
                    <div></div>
                    <div>
                        <CButton
                            color="warning"
                            class="d-flex align-items-center"
                            @click="onCashOut(index)"
                            :disabled="!currentOdd || loading"
                        >
                            Cash Out {{cashOut}}
                            &nbsp;
                            <CSpinner v-if="loading" color="danger" size="sm" />
                        </CButton>
                    </div>
                </div>
            </div>

            <!-- cashed out settled  -->
            <div v-if="item.cashout">
                <div class="header-item">
                    Cash Out: 
                    {{item.cashoutStatus}} - 
                    {{item.cashoutScore}} - 
                    Odd: {{item.cashoutOdd}}
                </div>
            </div>
        </div>
        Note:
        <div class="note-box">
            <div class="note">
                {{item.note}}
            </div>
            <div class="action-box" :key="`${item.likeTip}${item.followTip}${item.isFollowed}`">
                <div :class="{'action': true, 'selected': item.likeTip}" >
                    {{(item.like || []).length}}
                    <span 
                        :key="`like-${index}-${item.likeTip}`"
                        v-c-tooltip="!item.likeTip ? 'Like this tip':'You already liked this tip'" 
                        @click="handleLikeTip(index)">
                        <CIcon name="cil-thumb-up" />
                    </span>
                    <!-- <span v-else>
                        <CIcon name="cil-thumb-up" class="disabled" />
                    </span> -->
                </div>
                <div :class="{'action': true, 'selected': item.followTip || item.userId === parseInt(loggedInUser.user_id)}" >
                    {{(item.follow || []).length}}
                    <span 
                        v-if="item.userId !== parseInt(loggedInUser.user_id)" 
                        :key="`follow-${index}-${item.followTip}`"
                        v-c-tooltip="!item.followTip ? 'Follow this tip':'You already followed this tip'" 
                        @click="handleFollowTip(index)">
                        <CIcon name="cil-star" />
                    </span>
                    <span v-else>
                        <CIcon name="cil-star" class="disabled" />
                    </span>
                </div>
                <div :class="{'action': true, 'selected': item.isFollowed}">
                    {{item.followUserCount}}
                    <span v-if="item.userId !== parseInt(loggedInUser.user_id)" v-c-tooltip="!item.isFollowed ? 'Follow this tipster':'You already followed this tipster'" @click="handleFollowUser(index)">
                        <CIcon name="cil-user-follow" />
                    </span>
                    <span v-else>
                        <CIcon name="cil-user-follow" class="disabled" />
                    </span>
                </div>
            </div>
        </div>
        <div class="comments">
            <CButton
                v-if="item.comments.length > limit"
                color="info"
                shape="pill"
                variant="outline"
                size="sm"
                class="ml-5 mb-3"
                @click="limit += 3"
            >
                Read more
            </CButton>
            <div 
                :key="`commnet-${cIndex}`" 
                :id="'id' + comment._id" 
                class="comment" 
                v-for="(comment, cIndex) in item.comments.slice(-limit)"
            >
                <div class="comment-header">
                    <avatar :size="30" :username="comment.userName" :src="comment.userAvatar" :userId="comment.commentorId" /> 
                    &ensp;
                    <CLink :to="{name: 'UserTipStat', params: {id: comment.commentorId}}">
                        {{ comment.userName }}
                    </CLink> - 
                    {{ comment.dateTime }} 
                    &nbsp;
                    <span v-if="parseInt(loggedInUser.user_id) !== comment.commentorId" @click="handleReply(index, comment.user[0])">
                        <CIcon name="cil-action-undo" class="rotate-90" />
                    </span>
                </div>
                <p v-html="getComment(comment)"></p>
                
                <span class="unread-mark" v-if="unread"></span>
            </div>
            
        </div>
        <div class="post-comment">
            <CTextarea
                rows="2"
                :value.sync="comment"
                @input="comment=$event, editingIndex=index"
            />
            
            <CButton
                color="info"
                :disabled="!comment"
                @click="handlePostComment(index, comment), comment=''"
            >
                Post Comment
            </CButton>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    import Avatar from '@/components/Avatar';
    import {capitalizeFL} from '@/helpers/string';

    export default {
        components: {
            Avatar,
        },
        props: {
            index: {
                type: Number,
                required: true,
            },
            loading: {
                type: Boolean,
                default: false
            },
            item: {
                type: Object,
                required: true,
            },
            unread: {
                type: Boolean,
                default: false
            },
            handleLikeTip: {
                type: Function,
                requried: true,
            },
            handleFollowTip: {
                type: Function,
                required: true
            },
            handleFollowUser: {
                type: Function,
                required: true
            },
            handlePostComment: {
                type: Function,
                required: true
            },
            handleSelectReply: {
                type: Function,
                required: true
            },
            handleFollowStrategy: {
                type: Function,
            },
            onCashOut: {
                type: Function
            }
        },
        computed: {
            ...mapGetters(['loggedInUser']),
            isMe() {
                return this.loggedInUser && this.item.userId === parseInt(this.loggedInUser.user_id);
            }
        },
        data() {
            return {
                comment: '',
                limit: 3,
                currentStatus: '',
                currentPointProfit: '',
                currentScore: '',
                cashOut: '',
                currentOdd: ''
            };
        },
        methods: {
            getComment(comment) {
                let result = comment.comment;
                if(comment.replyToIds && comment.replyToIds.length > 0) {
                    comment.replyToUsers.forEach(cItem => {
                        result = result.replace(`@${cItem.alias},`, `<a href="#/user_tip_stat/${cItem._id}"><strong>@${cItem.alias}</strong></a>`);
                    });
                } 
                return result;
            },
            capitalizeVisibility(str) {
                return capitalizeFL(str);
            },
            handleReply(idx, user) {
                this.comment = `@${user.alias}, ` + this.comment;
                this.handleSelectReply(idx, user);
            },
            calcCashOut() {
                if(this.item.cashout) {
                    const scores = this.item.fixture[0].scores;
                    if(scores.ft_score && scores.ht_score)
                        this.currentStatus = `${scores.ft_score} FT(${scores.ht_score} HT)`;
                    else if(scores.ht_score)
                        this.currentStatus = `${scores.ht_score} HT`;
                    else 
                        this.currentStatus = 'NS';
                } else if(this.item.settled === 0) {
                    const fixture = this.item.fixture;
                    const status = fixture[0].time.status;
                    const time = fixture[0].time;
                    const scores = fixture[0].scores;
                    /** get current status */
                    this.currentStatus = status;
                    if(status === 'LIVE' || status === 'HT') {
                        let minute = time.minute ? `${Math.floor(time.minute / 10)}${time.minute % 10}'` : '00\'';
                        let second = time.second ? time.second : '00';
                        let added_time = time.added_time ? `+${time.added_time}\'` : '';
                        this.currentStatus = `${time.status}  ${minute} ${second} ${added_time}`;
                    }
                    /** current score */
                    this.currentScore = `${scores.localteam_score} : ${scores.visitorteam_score}`;
                    /** get current odd */
                    let odds = [], currentOdd = '';
                    const ft_market_ids = [1, 12, 976105, 136703813, 137918022, 28077];
                    const ht_market_ids = [37, 31379, 975903, 976226];
    
                    if(status === 'LIVE' || status == 'HT') {
                        odds = fixture[0].inplayOdds.data;
                    } else if(status === 'NS') {
                        odds = fixture[0].flatOdds.data;
                    }
                    odds
                        .filter(item => item.bookmaker_id === 2)
                        .forEach(oItem => {
                            let suffix = '';
                            if(ft_market_ids.includes(oItem.market_id))
                                suffix = 'FT';
                            else if(ht_market_ids.includes(oItem.market_id))
                                suffix = 'HT';
                            (oItem.odds || oItem.values).forEach(item => {
                                let label;
                                if(item.label)
                                    label = `${item.label}${item.total ? ' - ' + item.total : ''}`;
                                else if(item.team)
                                    label = item.team;
                                else if(item.info) {
                                    label = item.info;
                                }
                                if(label === 'Yes')
                                    label = 'BTS';
                                else if(label === 'No')
                                    label = 'No BTS';
                                if(label === '1')
                                    label = "Home";
                                else if(label === '2')
                                    label = 'Away';
                                else if(label === 'X')
                                    label = 'Draw';
    
                                if(`${label} - ${suffix}`.trim() === this.item.predictionType)
                                    currentOdd = parseFloat(item.value);
                                
                            });
                    });
                    if(currentOdd) {
                        this.currentOdd = currentOdd;
                        /** cash out */
                        this.cashOut = parseFloat((this.item.odd * this.item.stake / currentOdd).toFixed(2));
                        /** current point profit */ 
                        this.currentPointProfit = parseFloat((this.cashOut - this.item.stake).toFixed(2)); 
                    }
                }
            }
        },
        mounted() {
            if(this.item.fixture && this.item.fixture.length > 0)
                this.calcCashOut();
        },
        updated() {
            // this.calcCashOut();
        }
    }
</script>

<style lang="scss" scoped>
 .post-card {
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
            .settled-void {
                font-weight: 700;
                color: #0000FF;
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
</style>