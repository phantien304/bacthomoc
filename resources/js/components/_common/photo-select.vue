<template>
    <div class="avatar-select-wrapper">
        <ul>
            <li v-for="(img,i) in displayPhotos">
                <img :src="img" class="photo-select-image" />
                <span class="remove-photo" @click="$delete(sourcePhotos, i)">x</span>
            </li>
        </ul>
        <img src="/img/img-plh.png" class="photo-select-image-plh" v-if="sourcePhotos.length==0" />
        <div v-if="showUploadButton">
            <label class="custom-file-upload">
                <input type="file" @change="onFileChange" :multiple="multiple" />
                + {{$t("Label.Upload")}}
            </label>
        </div>
    </div>
</template>
<style scoped>
    ul { display: flex; }
        ul li { list-style-type: none; position: relative; margin-right: 10px; margin-bottom: 5px; }
            ul li .remove-photo { position: absolute; background: #fff; cursor: pointer; top: 1px; right: 1px; width: 20px; text-align: center; height: 20px; line-height: 20px; }
                ul li .remove-photo:hover { background: red; color: #fff; }
    .photo-select-image { width: 150px; max-height: 150px; }
    .photo-select-image-plh { width: 120px; max-height: 150px; }
    input[type="file"] { opacity: 0; position: absolute; right: 0; top: 0; }
    .custom-file-upload { display: inline-block; padding: 5px 20px; cursor: pointer; position: relative; text-align: center; background: #f1f1f1; background-image: linear-gradient(to right, #051937, #004d7a, #008793, #00bf72, #a8eb12); color: #fff; border: 0; border-radius: 3px; }
</style>
<script>
    import { getOrientation, resetOrientation } from '../../core/utils/index';
    export default {
        name: 'photo-select',
        props: {
            src: null,
            multiple: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                sourcePhotos: []
            }
        },
        computed: {
            displayPhotos() {
                let _photos = [];
                this._.each(this.sourcePhotos, (o) => {
                    _photos.push(this.getDisplayAvatar(o));
                });
                return _photos;
            },
            showUploadButton() {
                if (!this.multiple && this.sourcePhotos.length == 1)
                    return false;
                return true;
            }
        },
        methods: {
            getDisplayAvatar(src) {
                if (!src)
                    return '/img/img-plh.png';
                if (src.lastIndexOf('http') == -1 && src.lastIndexOf('data:image/') == -1)
                    src = this.appSettings.storageDomain + src;
                return src;
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                for (let i = 0; i < files.length; i++) {
                    let file = files[i];
                    if (file) {
                        //let loading = this.$loading.show();
                        var image = new Image();
                        var reader = new FileReader();
                        var vm = this;
                        reader.onload = (e) => {
                            try {
                                getOrientation(file, (orientation) => {
                                    if (orientation != -1 && orientation != -2 && orientation != 1) {
                                        resetOrientation(e.target.result, orientation, (newBase64) => {
                                            this.sourcePhotos.push(newBase64);
                                            //loading.hide();
                                        });
                                    } else {
                                        this.sourcePhotos.push(e.target.result);
                                        //loading.hide();
                                    }
                                });
                            } catch (e) {
                                //loading.hide();
                                this.sourcePhotos.push(e.target.result);
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                }
            },
            reloadSource() {
                this.sourcePhotos = [];
                if (!this.multiple) {
                    if (this.src) {
                        if (this.src instanceof Array) {
                            this.sourcePhotos = this.src;
                        } else {
                            this.sourcePhotos.push(this.src);
                        }
                    }
                }
                else {
                    this.sourcePhotos = [];
                    if (this.src) {
                        if (this.src instanceof Array) {
                            this.sourcePhotos = this.src;
                        } else {
                            this.sourcePhotos = JSON.parse(this.src);
                        }
                    }
                }
            }
        },
        watch: {
            'sourcePhotos'() {
                this.$emit('change', this.multiple ? this.sourcePhotos : this.sourcePhotos.length > 0 ? this.sourcePhotos[0] : '');
            },
            'src'() {
                this.reloadSource();
            }
        },
        created() {
            this.reloadSource();
        }
    }
</script>