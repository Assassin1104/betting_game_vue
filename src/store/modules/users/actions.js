import axios from '../../../boot/axios';
import { buildFetchUrl } from "../../../helpers/url";

export default {
    me({dispatch, commit}) {
        return new Promise((resolve, reject) =>
            axios.get('api/v1/users/me').then(({data: r}) => {
                if (r.data) {
                    commit('SET_LOGGED_IN', true);
                    commit('SET_LOGGED_IN_USER', r.data);
                    /** store data in localStorage to show while loading user info */
                    localStorage.setItem('userInfo', JSON.stringify(r.data));
                }

                resolve(r);
            }).catch(({response: {data: err, status}}) => {
                if (status === 401) {
                    dispatch('forceLogout');
                }

                reject(err);
            }));
    },
    updateProfile({commit}, params) {
        return new Promise((resolve, reject) =>
            axios.post('api/v1/users/me/profile', params).then(({data: r}) => {
                if (r.data) {
                    commit('SET_LOGGED_IN_USER', r.data);
                }

                resolve(r);
            }).catch(({response: {data: err}}) => {
                reject(err);
            }));
    },
    getSubscribedUsers({commit}) {
        return new Promise((resolve, reject) =>
            axios.get('api/v1/subscribed-list')
                .then(({data: r}) => (
                    resolve(r)
                ))
                .catch(({response: {data: err}}) => reject(err)));
    },
    checkAliasIfDuplicate(_, params) {
        return new Promise((resolve, reject) => 
            axios.post('api/v1/user/check-alias', params)
            .then(({data: r}) => {
                resolve(r);
            })
            .catch(({response: {data: err}}) => {
                reject(err);
            }));
    }
}