export default {
    SET_NOTIFICATIONS(state, notifications) {
        state.notifications = notifications || [];
    },
    SET_INFO(state, data) {
        state.notificationInfo = {
            ...state.notificationInfo,
            totalFeeds: data.feedsCount,
            unread: data.unread
        };
    }
}
