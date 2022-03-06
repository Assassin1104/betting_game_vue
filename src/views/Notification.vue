<template>
    <div class="notification-page">
        <CCard>
            <CCardHeader>
                Notifications
            </CCardHeader>
            <CCardBody>
                <div class="notification-filter">
                    <CButtonGroup>
                        <CButton @click="handleFilter('all')">All</CButton>
                        <CButton
                            :key="item.value"
                            v-for="item in filters" 
                            :color="item.color"
                            :class="{'selected': selected.includes(item.value)}"
                            @click="handleFilter(item.value)" 
                        >
                            {{item.label}}
                        </CButton>
                    </CButtonGroup>
                </div>
                <div class="notification-item" :key="index" v-for="(dItem, index) in filteredData" @click="handleClickNotification(dItem)">
                    <CCallout :color="colors[dItem.type]">
                        <Avatar v-if="dItem.fromUser.length > 0" :username="dItem.fromUser[0].alias" :src="dItem.fromUser[0].avatar" :userId="dItem.fromUserId" :size="40" />
                        &ensp;<span v-html="dItem.message"></span>
                        <span class="ml-auto">{{dItem.timeAgo}}</span>
                        <span class="unread-mark" v-if="dItem.new"></span>
                    </CCallout>
                </div>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import moment from 'moment';

    import Avatar from '@/components/Avatar';

    export default {
        components: {
            Avatar,
        },
        data() {
            return {
                data: [],
                filters: [{
                    label: 'Post',
                    value: 'post',
                    color: 'info'
                }, {
                    label: 'Comment',
                    value: 'comment',
                    color: 'primary'
                }, {
                    label: 'Settled Tips',
                    value: 'settle',
                    color: 'warning'
                }],
                colors: {
                    'comment-reply': 'primary'
                },
                selected: [],
                refreshKey: 0
            };
        },
        computed: {
            ...mapGetters(['loggedInUser']),
            filteredData() {
                this.refreshKey;
                let result = [];
                result = this.data.filter(dItem => dItem.type.includes(this.selected[0]) || this.selected.includes('all'));
                return result;
            }
        },
        methods: {
            ...mapActions('notifications', ['getNotifications', 'markAllAsRead']),
            getNotificationMessage(notification) {
                let result = '';
                switch(notification.type) {
                    case 'comment':
                        result = `<a href="#/user_tip_stat/${notification.fromUserId}"><strong>${notification.fromUser[0].alias}</strong></a> commented your tip!`;
                        break;
                    case 'post':
                        if(notification.strategy) 
                            result = `<a href="#/user_tip_stat/${notification.fromUserId}"><strong>${notification.fromUser[0].alias}</strong></a> 
                                posted new tip for strategy <a href="#/user-strategy-stat/${notification.strategyData[0]._id}">${notification.strategyData[0].name}</a>!`;
                        else
                            result = `<a href="#/user_tip_stat/${notification.fromUserId}"><strong>${notification.fromUser[0].alias}</strong></a> posted new tip!`;
                        break;
                    case 'settle':
                        if(notification.fromUserId === '') {
                            result = `Your tip is settled - <strong>${notification.eventName}</strong> - ${notification.eventDateTime}`
                        } else {
                            result = `Your followed tip by <a href="#/user_tip_stat/${notification.fromUserId}"><strong>${notification.fromUser[0].alias}</strong></a> is settled - <strong>${notification.eventName}</strong> - ${notification.eventDateTime}`;
                        }
                        break;
                    case 'comment-reply':
                        result = `<a href="#/user_tip_stat/${notification.fromUserId}"><strong>${notification.fromUser[0].alias}</strong></a> replied!`;
                        break;
                }
                return result;
            },
            handleClickNotification(notification) {
                const {commentId, tipId, fromUserId, toUserId} = notification;
                switch(notification.type) {
                    case 'comment':
                        this.$router.push({
                            name: 'UserTipStat', 
                            params: {
                                id: toUserId,
                                notifications: this.data.filter(dItem => dItem.toUserId === toUserId),
                                selected: commentId
                            }
                        });
                        break;
                    case 'post':
                        this.$router.push({
                            name: 'UserTipStat', 
                            params: {
                                id: fromUserId,
                                notifications: this.data.filter(dItem => dItem.fromUserId === fromUserId),
                                selected: tipId
                            }
                        });
                        break;
                    case 'settle':
                        this.$router.push({
                            name: 'UserTipStat', 
                            params: {
                                id: fromUserId !== '' ? fromUserId : toUserId,
                                notifications: this.data.filter(dItem => dItem.fromUserId === fromUserId),
                                selected: tipId
                            }
                        });
                        break;
                    case 'comment-reply':
                        this.$router.push({
                            name: 'UserTipStat', 
                            params: {
                                id: notification.tip[0].userId,
                                notifications: this.data.filter(dItem => dItem.fromUserId === fromUserId),
                                selected: commentId
                            }
                        });
                        break;
                }
            },
            handleFilter(filter) {
                this.selected = [filter];
                this.handleMarkAsRead(filter);
            },
            handleMarkAsRead(type) {
                this.markAllAsRead({type}).then(res => {
                    this.data.forEach((dItem) => {
                        if(type === 'all' || dItem.type.includes(type))
                            dItem.new = false;
                    });
                    this.refreshKey ++;
                });
            },
            getData() {
                this.getNotifications().then(res => {
                this.data = res.data;
                this.data.forEach((dItem, idx) => {
                    this.data[idx] = {
                        ...dItem,
                        fromUserName: dItem.fromUser.length > 0 ? dItem.fromUser[0].alias : '',
                        timeAgo: moment(dItem.createdAt).fromNow(),
                        new: !dItem.readAt,
                    };
                    if(dItem.type === 'settle') {
                        this.data[idx]['eventName'] = `${dItem.fixture[0].localTeamName} : ${dItem.fixture[0].visitorTeamName}`;
                        this.data[idx]['eventDateTime'] = `${moment(dItem.fixture[0].time.starting_at.date_time).add(this.loggedInUser.mytimezone, 'hours').format('YYYY-MM-DD hh:mm:ss')}`;
                    }
                    this.data[idx]['message'] = this.getNotificationMessage(this.data[idx]);
                });
            });
            }
        },
        mounted() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.handleMarkAsRead(this.selected[0]);
                }, 1000);
            });
            
            this.sockets.subscribe('newNotificationData', (data) => {
                this.getData();
            });
        },
        created() {
            /** set all as default for filters */
            this.selected = ['all'];
            this.filters.forEach(fItem => this.colors[fItem.value] = fItem.color);
            /** check if selected in notification menu */
            const {type} = this.$route.params;
            if(type)
                this.selected = [type];
            /** get all notifications */
            this.getData();
        }
    }
</script>

<style scoped lang="scss">
    .notification-page {
        .notification-filter {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
            .btn {
                min-width: 100px;
                &:first-of-type {
                    background-color: #AAAAAA;
                }
                &:focus {
                    box-shadow: none;
                }
                &:not(.selected) {
                    opacity: 0.5;
                }
            }
        }
        .notification-item {
            background-color: rgba(0,0,0,0.05);
            margin: auto;
            max-width: 1500px;
            cursor: pointer;
            &:hover {
                background-color: rgba(0, 0, 0, 0.07);
            }
            .c-callout {
                margin: 0;
                padding: 10px;
                min-height: 61px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #FFFFFF;
                .vue-avatar--wrapper {
                    display: flex;
                }
            }
        }
    }
</style>