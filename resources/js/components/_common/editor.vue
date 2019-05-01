<template>
    <textarea v-if="id" :id="id" v-model="bodyContent"></textarea>
</template>
<script>
    window.loadCK = null;
    export default {
        name: 'editor',
        props: {
            content: {
                type: String,
                default: ''
            },
            id: {
                type: String,
                required: true
            },
            height: {
                type: Number,
                default: 500
            }
        },
        data() {
            return {
                bodyContent: ''
            }
        },
        methods: {
            initScript() {
                return new Promise((resolve, reject) => {
                    (function (d, s, id) {
                        if (d.getElementById(id)) {
                            return resolve();
                        }
                        const fjs = d.getElementsByTagName(s)[0];
                        const js = d.createElement(s); js.id = id;
                        js.src = '/ckeditor/ckeditor.js';
                        fjs.parentNode.insertBefore(js, fjs);
                        return resolve();
                    }(document, 'script', 'ckeditor'));
                });
            },
            initEditor(id) {
                if (CKEDITOR.instances[id]) CKEDITOR.instances[id].destroy();
                var config = {
                    height: this.height + 'px',
                    language: 'vi',
                    entities: false,
                    fullPage: false,
                    toolbarCanCollapse: false,
                    resize_enabled: false,
                    colorButton_enableMore: false,
                    extraPlugins: 'mediamanager,thepancontent',
                    toolbar: [{ name: 'document', items: ['Source', 'ShowBlocks'] },
                    { name: 'tools', items: ['mediamanager', 'iframe'] },
                    { name: 'colors', items: ['TextColor', 'BGColor'] },
                    { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
                    { name: 'insert', items: ['Table', 'HorizontalRule', 'Iframe'] },
                    { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'RemoveFormat'] },
                    { name: 'paragraph', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
                    { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize','thepancontent'] }],
                    allowedContent: true
                };
                window.CKEDITOR.replace(id, config);
                CKEDITOR.instances[id].setData(this.bodyContent);
            },
            setData(data) {
                CKEDITOR.instances[this.id].setData(data);
            },
            getData() {
                return CKEDITOR.instances[this.id].getData();
            }
        },
        created() {
            if (this.id) {
                this.bodyContent = this.content;
                this.initScript().then(() => {
                    window.loadCK = setInterval(() => {
                        if (window.CKEDITOR && window.CKEDITOR.replace) {
                            this.initEditor(this.id);
                            this.$emit('loaded', this.id);
                            clearInterval(window.loadCK);
                        }
                    }, 100);
                });
            }
        }
    }
</script>