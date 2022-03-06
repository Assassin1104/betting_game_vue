import axios from '../../../boot/axios';
import { buildFetchUrl } from "../../../helpers/url";

export default {
    getNotificationInfo({commit}) {
        return new Promise((resolve, reject) => {
            axios.get('api/v1/notifications/info')
                .then((res) => {
                    const r = res.data.data;
                    commit('SET_INFO', r),
                    resolve(r)
                })
                .catch((err) => reject(err));
        });
    },
    getNotifications({commit}) {
        return new Promise((resolve, reject) => {
            axios.get('api/v1/notifications')
                .then((res) => {
                    // const r = res.data;
                    resolve(res.data)
                })
                .catch(err => reject(err));
        });
    },
    markAllAsRead(_, payload) {
        return new Promise((resolve, reject) => {
            axios.post('api/v1/notifications/markAllAsRead', payload)
                .then((res) => {
                    resolve(res)
                })
                .catch(err => reject(err));
        });
    }
}