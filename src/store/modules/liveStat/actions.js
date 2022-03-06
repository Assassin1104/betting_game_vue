import axios from '../../../boot/axios';
import { buildFetchUrl } from "../../../helpers/url";

export default {
    getLiveStatsNew({commit}) {
        return new Promise((resolve, reject) =>
            axios.post('getLiveStatsNew')
                .then(({data: r}) => (
                    resolve(r)
                ))
                .catch(({response: {data: err}}) => reject(err)));
    },
    postTip(_, payload) {
        return new Promise((resolve, reject) => {
            axios.post('api/v1/postTip', payload)
                .then(({data: r}) => {
                    resolve(r);
                }).catch(({response: {data: err}}) => reject(err));
        });
    },
    getFeeds(_) {
        return new Promise((resolve, reject) => {
            axios.get('api/v1/getFeeds')
                .then(({data: r}) => (
                    resolve(r)
                ))
                .catch(({response: {data: err}}) => reject(err));
        });
    },
    getFeedsByUserId(_, {id}) {
        return new Promise((resolve, reject) => {
            axios.get(`api/v1/getFeeds/${id}`)
                .then(({data: r}) => (
                    resolve(r)
                ))
                .catch(({response: {data: err}}) => reject(err));
        });
    },
    getMyPendingFeeds(_) {
        return new Promise((resolve, reject) => {
            axios.get(`api/v1/feeds/pending`)
                .then(({data: r}) => (
                    resolve(r)
                ))
                .catch(({response: {data: err}}) => reject(err));
        });
    },
    cashOut(_, payload) {
        return new Promise((resolve, reject) => {
            axios.post('api/v1/cashout', payload)
                .then(({data: r}) => {
                    resolve(r);
                }).catch(({response: {data: err}}) => reject(err));
        });
    },
    postComment(_, payload) {
        return new Promise((resolve, reject) => {
            axios.post('api/v1/postComment', payload)
                .then(({data: r}) => {
                    resolve(r);
                }).catch(({response: {data: err}}) => reject(err));
        });
    },
    toggleFollowUser(_, payload) {
        return new Promise((resolve, reject) => {
            axios.post('api/v1/toggleFollowUser', payload)
            .then(({data: r}) => {
                resolve(r);
            }).catch(({response: {data: err}}) => reject(err)); 
        });
    },
    toggleFollowTip(_, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`api/v1/toggleFollowTip/${payload.id}`)
            .then(({data: r}) => {
                resolve(r);
            }).catch(({response: {data: err}}) => reject(err)); 
        });
    },
    toggleLikeTip(_, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`api/v1/toggleLikeTip/${payload.id}`)
            .then(({data: r}) => {
                resolve(r);
            }).catch(({response: {data: err}}) => reject(err)); 
        });
    },
    toggleFollowStrategy(_, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`api/v1/strategy/follow/${payload.id}`)
            .then(({data: r}) => {
                resolve(r);
            }).catch(({response: {data: err}}) => reject(err)); 
        });
    },
    resetTip(_, payload) {
        return new Promise((resolve, reject) => {
            axios.post('api/v1/resetTip', payload)
            .then(({data: r}) => {
                resolve(r);
            }).catch(({response: {data: err}}) => reject(err)); 
        });
    },
    getFixturesByDate(_, {date}) {
        return new Promise((resolve, reject) => {
            axios.get(`api/v1/getFixturesByDate/${date}`)
                .then(({data: r}) => (
                    resolve(r)
                ))
                .catch(({response: {data: err}}) => reject(err));
        });
    },
    createStrategy(_, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`api/v1/strategy`, payload)
            .then(({data: r}) => {
                resolve(r);
            }).catch(({response: {data: err}}) => reject(err)); 
        });
    },
    getUserStrategies(_, payload = {id: ''}) {
        return new Promise((resolve, reject) => {
            axios.get(`api/v1/strategy/user/${payload.id}`)
            .then(({data: r}) => {
                resolve(r);
            }).catch(({response: {data: err}}) => reject(err));
        });
    },
    deleteStrategy(_, payload) {
        return new Promise((resolve, reject) => {
            axios.delete(`api/v1/strategy/${payload.id}`)
            .then(({data: r}) => {
                resolve(r);
            }).catch(({response: {data: err}}) => reject(err));
        });
    },
    getFeedsByStrategy(_, {id}) {
        return new Promise((resolve, reject) => {
            axios.get(`api/v1/strategy/${id}/feeds`)
                .then(({data: r}) => (
                    resolve(r)
                ))
                .catch(({response: {data: err}}) => reject(err));
        });
    },
}