<template>
    <div class="profile-container">
        <div v-if="loading" style="height: 10px;">
            <b-progress :value="current_counter" :max="100" animated></b-progress>
        </div>
        <CCard bodyWrapper style="height : 100vh; margin-top: 75px;">
            <CInput
                class = "user_name_label"
                label="Username"
                :value="loggedInUser.display_name"
                plaintext
                readonly
            />
            <div class="form-group">
                <label class="select_avatar_label">Select Avatar</label>
                <cropper
                    :boundary="{
                        width: 220,
                        height: 220
                    }"
                    :viewport="{
                        width: 200,
                        height: 200
                    }"
                    :resize="false"
                    :defaultAvatarSrc="imageUrl"
                    :zoom="true"
                    @cropped="cropped"
                    />
            </div>
            <CInput
                class="alias_label"
                :key="JSON.stringify(loggedInUser)"
                label="Alias"
                :value="model.alias"
                :isValid="validationState['alias'] && validationState['alias'].state"
                :invalidFeedback="validationState['alias'] && validationState['alias'].text"
                @update:value="model.alias=$event, validateField('alias')"
            />
            <div class="d-flex justify-content-end action-btns">
                <CButton
                    color="info"
                    class="m-2"
                    :disabled="loading"
                    @click="handleUpdate"
                >
                    Save changes
                    <CSpinner v-if="loading" color="danger" size="sm" />
                </CButton>
            </div>
        </CCard>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    import Cropper from "@/components/Cropper";
    import {VUE_APP_URL} from '@/config';
    import {displaySuccess, displayError} from '@/helpers/message';
    import validationMixin from '@/mixins/common/validationMixin';

    export default {
        name: 'PostTip',
        mixins: [validationMixin],
        components: {
            Cropper,
        },
        data () {
            return {
                model: {
                    alias: '',
                    avatar: ''
                },
                loading: false,
                loadingTimer: '',
                show: false,
                validationState: {}
            }
        },
        computed: {
            ...mapGetters(['loggedInUser']),
            imageUrl() {
                let result = 'img/avatars/default-avatar.jpg';
                let storedUrl = localStorage.getItem('storedAvatar');
                if(storedUrl)
                    result = storedUrl;
                if(this.loggedInUser.avatar)
                    result = this.loggedInUser.avatar;
                if(this.imgDataUrl)
                    result = this.model.avatar;
                return result;
            },
            validationRules() {
                return {
                    alias: [{
                        minLength: 5,
                        maxLength: 12,
                        message: 'Alias name must have a number between 5 and 12 letters!'
                    }, {
                        unique: true,
                        message: 'Someone is already using this alias!',
                        func: this.checkAliasIfDuplicate
                    }]
                }
            }
        },
        methods: {
            ...mapActions([
                'updateProfile',
                'checkAliasIfDuplicate'
            ]),
            async handleUpdate() {
                const isValid = await this.checkValidation();
                if(!isValid)
                    return;
                let params = {};
                if(this.model.avatar) {
                    params['avatar'] = this.model.avatar;
                }
                params['alias'] = this.model.alias;
                if(!this._.isEmpty(params)) {
                    this.updateProfile(params).then(res => {
                        this.model.avatar = '';
                        displaySuccess(res);
                    }).catch(err => {
                        displayError(res);
                    });
                }
            },
            cropped(e) {
                this.model.avatar = e;
            },
        },
        watch: {
            loggedInUser: {
                deep: true,
                immediate: true,
                handler(val) {
                    this.model.alias = this.loggedInUser.alias;
                }
            }
        },
        mounted() {
        },
        created() {
            
        },
        beforeDestroy() {

        }
    }
</script>
<style lang="scss" scoped>
    .profile-container {
        background: red;
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
            
        .card-body {
            display: flex;
            flex-direction: column;
            align-items: center;
            .form-group {
                width: 250px;
            }
        }
    }
    .avatar-box {
        margin: auto !important;
    }

    .user_name_label,
    .select_avatar_label, 
    .alias_label{
        color: blue;
        font-weight: 500;
        font-size: 25px;
    }


</style>