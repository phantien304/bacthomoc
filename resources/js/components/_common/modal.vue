<template>
    <div>
        <div id="myModal" :class="'modal fade '+cls" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display:block" @click.self="close()">
            <div :class="modalCls" :style="style">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title mt-0" id="myModalLabel">{{title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="forceClose">&times;</button>
                    </div>
                    <div class="modal-body">
                        <slot name="body">Chưa có nội dung. Thêm div slot="body" để thay thế!</slot>
                    </div>
                    <div class="modal-footer" v-if="footer">
                        <slot name="footer">
                            <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal" @click="forceClose">Đóng</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
        <slot name="outside"></slot>
    </div>
</template>
<style>
    @media(min-width: 600px) {
        .modal-huge { max-width: 90%; }
    }
</style>
<script>
    export default {
        name: 'modal',
        props: {
            title: {
                type: String,
                default: 'Thông báo'
            },
            width: {
                type: Number,
                default: 600
            },
            height: {
                type: Number,
                default: 100
            },
            noCloseBackground: {
                type: Boolean,
                default: false
            },
            footer: {
                type: Boolean,
                default: true
            },
            size: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                cls: '',
                tempId: null
            }
        },
        methods: {
            close() {
                if (!this.noCloseBackground) {
                    this.forceClose();
                }
            },
            forceClose() {
                this.cls = '';
                setTimeout(() => {
                    this.$emit('close');
                }, 200);
            }
        },
        computed: {
            style() {
                if (this.size != 'huge')
                    return { 'max-width': this.width + 'px' || '600px' }
                return {};
            },
            modalCls() {
                let cls = 'modal-dialog modal-dialog-centered';
                if (this.size == 'large')
                    cls += ' modal-lg';
                else if (this.size == 'huge')
                    cls += ' modal-huge';
                return cls;
            }
        },
        mounted() {
            this.tempId = 'modal' + new Date().getTime();
            document.getElementsByTagName('html')[0].classList.add('modal-open');
            let backDrop = document.createElement('div');
            backDrop.setAttribute('id', this.tempId + 'popupBackdrop');
            backDrop.setAttribute('class', 'modal-backdrop fade');
            document.getElementsByTagName('body')[0].appendChild(backDrop);
            setTimeout(() => {
                this.cls = 'show';
                let b2 = document.getElementById(this.tempId + 'popupBackdrop');
                b2.className += ' show';
            }, 100);
        },
        destroyed() {
            document.getElementsByTagName('html')[0].classList.remove('modal-open');
            this.cls = '';
            let b2 = document.getElementById(this.tempId + 'popupBackdrop');
            if (b2) {
                b2.parentNode.removeChild(b2);
            }
        }
    }
</script>
