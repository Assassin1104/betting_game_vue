<template>
    <div class="cropper">
        <div class="avatar-box">
            <div 
                class="avatar-box__img"
            >
                <img v-if="previewImg" :src="previewImg" alt="prev">
                <img v-else-if="defaultAvatarSrc" :src="defaultAvatarSrc" alt="default">
            </div>
            <div class="avatar-box__btn">
                <span @click="handleCameraClick" class="choose">
                    <CIcon name="cil-camera" />
                </span> 
            </div>
        </div>
            
        <CModal
            title="Select avatar"
            size="sm"
            class="avatar-wrapper"
            :show.sync="showModal">
            <div class="croppie-wrapper">
                <vue-croppie
                    :boundary="boundary"
                    :enableOrientation="orientation"
                    :enableResize="resize"
                    :enableZoom="zoom"
                    :showZoomer="showZoomer"
                    :viewport="computedViewport"
                    @result="result"
                    @update="update"
                    ref="croppieRef">
                </vue-croppie>
            </div>
            <div slot="footer" class="avatar-wrapper__bot">
                <CButton @click="crop()" color="primary" :disabled="!previewImg">
                    Save
                </CButton>
                <div class="file-upload">
                    <input type="file" id="fileUpload" multiple accept="image/*" class="visually-hidden">
                </div>
            </div>
        </CModal>
    </div>
</template>

<script>
    export default {
        components: {
        },
        props: {
            boundary: {
                type: Object,
                default: () => {
                    return {
                        height: 400,
                    }
                }
            },
            viewport: {
                type: Object,
                default: () => {
                    return {
                        width: 300,
                        height: 300
                    }
                }
            },
            zoom: {
                type: Boolean,
                default: true
            },
            orientation: {
                type: Boolean,
                default: true
            },
            showZoomer: {
                type: Boolean,
                default: true
            },
            resize: {
                type: Boolean,
                default: true
            },
            viewportType: {
                type: String,
                default: 'square'
            },
            defaultAvatarSrc: {
                type: String,
                default: ''
            },
            avatarSize: {
                type: [String, Number],
                default: 250,
            },
            cropperSize: {
                type: [String, Object],
                default: 'original',
            },
            showCamera: {
                type: Boolean,
                default: true
            },
            showNewCamera: {
                type: Boolean,
                default: false
            },
            borderRadius: Number,
            isFullWidth: {
                type: Boolean,
                default: false
            },
            disable: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                previewImg: null,
                imgOriginal: null,
                uploaded: false,
                showModal: false,
                uploadedFile: null,
            }
        },
        computed: {
            computedViewport() {
                return {...this.viewport, type: this.viewportType};
            }
        },
        methods: {
            crop() {
                this.previewImg = this.imgOriginal;
                this.$emit("cropped", this.imgOriginal.split("base64,")[1]);
                this.showModal = false;
            },
            upload(binaryfile) {
                this.uploaded = true;
                this.uploadedFile = binaryfile;
                this.showModal = true; 
                // this.bind(binaryfile);
            },
            result(output) {
                this.imgOriginal = output;
                if(!this.previewImg) {
                    this.previewImg = output;
                    this.$emit("cropped", output.split("base64,")[1]);
                }
            },
            update(options) {
                this.$refs.croppieRef.result({
                    ...options,
                    quality: 1,
                    imageSmoothingQuality: 'high',
                    size: this.cropperSize,
                    type: 'canvas',
                    imageSmoothingEnabled: true
                });
            },
            bind(src) {
                const url = window.URL.createObjectURL(src);
                this.$refs.croppieRef.bind({
                    url
                });
            },
            defaultBind(src) {
                let url = src;
                this.$refs.croppieRef.bind({
                    zoom: 0,
                    url
                });
            },
            handleUploadClick() {
                let el = document.getElementById("fileUpload");
                if(el) {
                    el.click();
                }   
            },
            handleUpload(e) {
                let el = document.getElementById("fileUpload");
                if(el) {
                    let file = el.files[0];
                    const reader = new FileReader();
                    reader.onloadend = (e) => {
                    };
                    reader.readAsDataURL(file);
                    this.upload(file);
                }
            },
            handleCameraClick() {
                this.handleUploadClick();
            }
        },
        mounted() {
            this.$nextTick(() => {
                document.getElementById("fileUpload").addEventListener("change", this.handleUpload, false);
            });
        },
        watch: {
            showModal(val) {
                if(val) {
                    this.$nextTick(() => {
                        // if(!this.previewImg)
                        //     this.defaultBind(this.defaultAvatarSrc);
                        this.bind(this.uploadedFile);
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cropper {
        display: flex;
    }
    .croppie-container {
        max-height: 360px;
        .cr-boundary {
            .cr-viewport {
                border: none;
                border-radius: 50%;
            }
        }
        .cr-resizer {
            max-width: 100%;
            max-height: 100%;
        }
        /deep/ .cr-slider-wrap {
            .cr-slider {
                position: relative;
                &::after {
                    content: "zoom";
                    position: absolute;
                    left: -50px;
                    top: -4px;
                }
            }
        }
    }
    .avatar-wrapper {
        display: inline-flex;
        max-width: 100%;
        &__bot {
            display: flex;
            align-items: center;
            .el-link {
                margin-top: 10px;
            }
        }
    }
    .avatar-wrapper__bot {
        .btn {
            min-width: 80px;
            margin-left: 10px;
        }
    }
    .avatar-box {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 100%;
        border-radius: 4px;
        background: #eee;
        &__img {
            overflow: hidden;
            img {
                width: 150px;
                height: 150px;
                border-radius: 50%;
            }
        }
        .def-icon {
            font-size: 175px;
        }
        .el-avatar {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        &__btn {
            cursor: pointer;
            z-index: 1;
            position: absolute;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 0 4px 0 4px;
            background: rgba(0,0,0,0.5);
            color: #fff;
            font-size: 20px;
            .el-upload {
                width: 100%;
                height: 100%;
                line-height: 40px !important;
                i {
                    vertical-align: middle;
                }
            }
        }
    }
    .croppie-wrapper {
        box-sizing: border-box;
        * {
            box-sizing: inherit;
        }
    }
    
</style>
