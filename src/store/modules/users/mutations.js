import { VUE_APP_URL } from "@/config";

export default {
    SET_LOGGED_IN(state, loggedIn) {
        state.loggedIn = loggedIn;
    },
    SET_LOGGED_IN_USER(state, user) {
        state.loggedInUser = {
            ...state.loggedInUser,
            ...user,
        };
        if(typeof user.avatar !== 'undefined') {
            state.loggedInUser['avatar'] = `${VUE_APP_URL}/${user.avatar}?${Date.now()}`;
        } else if(!state.loggedInUser['avatar']) {
            state.loggedInUser['avatar'] = 'img/avatars/default-avatar.jpg';
        }
        /** store avatar url in storage to show when loading avatar in profile page */
        localStorage.setItem('storedAvatar', state.loggedInUser['avatar']);
    },
}
