export default {
    notifications(state) {
        return state.notifications;
    },
    info(state) {
        return state.notificationInfo;
    },
    unread(state) {
        return state.notificationInfo['unread'] || {};
    }
}
