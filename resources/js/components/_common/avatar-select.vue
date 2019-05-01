<template>
    <div class="avatar-select-wrapper">
        <img :src="displayAvatar" class="avatar-select-image" />
        <div>
            <label class="custom-file-upload">
                <input type="file" @change="onFileChange" />
                {{$t("Label.Upload")}}
            </label>
        </div>
    </div>
</template>
<style scoped>
    .avatar-select-image { width: 90px; max-height: 135px; }
    input[type="file"] { opacity: 0; position: absolute; right: 0; top: 0; }
    .custom-file-upload { border: 1px solid #ccc; display: inline-block; padding: 5px 8px; cursor: pointer; position: relative; text-align: center; background: #f1f1f1; }
</style>
<script>
    import { getOrientation, resetOrientation } from '../../core/utils/index';
    export default {
        name: 'avatar-select',
        props: ['src'],
        data() {
            return {
                srcUpload: ''
            }
        },
        computed: {
            displayAvatar() {
                let _src = '';
                if (this.srcUpload)
                    _src = this.srcUpload;
                else if (this.src)
                    _src = this.src;
                else return '/img/avatar.png';
                if (_src.lastIndexOf('http') == -1 && _src.lastIndexOf('data:image/') == -1)
                    _src = this.appSettings.storageDomain + this.src;
                return _src;
            }
        },
        methods: {
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                let file = files[0];
                if (file) {
                    let loading = this.$loading.show();
                    var image = new Image();
                    var reader = new FileReader();
                    var vm = this;
                    reader.onload = (e) => {
                        try {
                            getOrientation(file, (orientation) => {
                                if (orientation != -1 && orientation != -2 && orientation != 1) {
                                    resetOrientation(e.target.result, orientation, (newBase64) => {
                                        this.srcUpload = newBase64;
                                        loading.hide();
                                    });
                                } else {
                                    this.srcUpload = e.target.result;
                                    loading.hide();
                                }
                            });
                        } catch (e) {
                            loading.hide();
                            this.srcUpload = e.target.result;
                        }
                    };
                    reader.readAsDataURL(file);
                }
            }
        },
        watch: {
            'srcUpload'() {
                this.$emit('change', this.srcUpload);
            }
        }
    }
</script>