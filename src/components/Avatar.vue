<template>
    <span @click="handleClick">
        <Avatar :username="username" :src="srcUrl" :size="size" />
    </span>
</template>
<script>
    import { Avatar } from 'vue-avatar';

    import {VUE_APP_URL} from '@/config';

    export default {
        components: {
            Avatar
        },
        props: {
            username: {
                type: String,
                default: ''
            },
            src: {
                type: String,
                default: ''
            },
            size: {
                type: Number,
                default: 40
            },
            userId: {
                type: Number,
            }
        },
        computed: {
            srcUrl() {
                let result = '';
                if(this.src) {
                    result = this.src;
                    if(!result.includes(VUE_APP_URL))
                        result = `${VUE_APP_URL}/${this.src}`;
                }
                return result;
            }
        },
        methods: {
            handleClick() {
                if(Number.isInteger(this.userId)) {
                    this.$router.push({
                        name: 'UserTipStat',
                        params: {
                            id: this.userId
                        }
                    })
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    .vue-avatar--wrapper {
        cursor: pointer;
    }
</style>