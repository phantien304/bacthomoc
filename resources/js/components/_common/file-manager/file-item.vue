<template>
    <div class="file-box" @click="select" :class="{selected:selected}">
        <div class="file">
            <a href="javascript:void(0);" :title="file.name">
                <span class="corner"></span>
                <div class="image" v-if="isImage">
                    <photo :alt="file.name" class="img-responsive" :src="file.url" :width="180" :height="140" />
                </div>
                <div class="icon" v-else>
                    <i class="fa fa-file"></i>
                </div>
                <div class="file-name">
                    <b>{{file.name}}</b>
                    <small>{{ file.createdDate | moment("HH:mm DD/MM/YYYY") }}</small>
                </div>
            </a>
        </div>
    </div>
</template>
<style>
    .file-name b { display: block; width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .file-box.selected .corner { border-right: 0.6em solid #4CAF50; border-bottom: 0.6em solid #4CAF50; }
    .file-box.selected .file { border: 1px solid #4CAF50; }
</style>
<script>
    export default {
        name: 'file-item',
        props: ['file'],
        data() {
            return { selected: false }
        },
        computed: {
            isImage() {
                return ['png', 'jpg', 'jpeg', 'gif'].indexOf(this.file.ext.toLowerCase()) != -1;
            }
        },
        methods: {
            select() {
                this.selected ? this.$emit('deselect') : this.$emit('select');
                this.selected = !this.selected;
            }
        }
    }
</script>