<template>
    <div class="left side-menu">
        <div class="slimscroll-menu" id="remove-scroll">
            <!--- Sidemenu -->
            <vue-scroll :ops="ops">
                <div id="sidebar-menu">
                    <!-- Left Menu Start -->
                    <ul class="metismenu" id="side-menu">
                        <li class="menu-title">Nội dung</li>
                        <li><router-link :to="{name: 'post'}"><i class="mdi mdi-file-document"></i><span>Post</span></router-link></li>
                        <li class="menu-title">Hệ thống</li>
                        <li><router-link to="/member"><i class="mdi mdi-altimeter"></i><span>Thành viên</span></router-link></li>
                    </ul>
                </div>
                <!-- Sidebar -->
                <div class="clearfix"></div>
            </vue-scroll>
        </div>
        <!-- Sidebar -left -->
    </div>
</template>
<style>
    #remove-scroll { height: calc(100vh - 80px); }
</style>
<script>
    import Vue from 'vue'
    import vueScroll from 'vuescroll'
    export default {
        components: { vueScroll },
        props: {
            open: {
                type: Boolean,
                default: true
            },
            docked: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                menuVal: '#/',
                versions: [],
                ops: {
                    rail: {
                        opacity: '0.5',
                        background: 'transparent',
                        keepShow: false
                    },
                    bar: {
                        background: '#ccc',
                        keepShow: false
                    },
                    scrollPanel: {
                        easing: 'easeInQuad',
                        speed: 800
                    }
                }
            }
        },
        computed: {
            lang() {
                return Vue.config.lang
            }
        },
        methods: {
            handleClose() {
                this.$emit('close')
            },
            handleMenuChange(val) {
                this.menuVal = val
                if (this.docked) {
                    window.location.hash = this.menuVal
                } else {
                    this.changeHref = true
                }
                this.changeHref = true
                this.$emit('change', val)
            },
            handleHide() {
                if (!this.changeHref) return
                window.location.hash = this.menuVal
                this.changeHref = false
            },
            changeLang(lang) {
                Vue.config.lang = lang
                window.localStorage.setItem('lang', lang)
            },
            handleMenuClick(item) {
                this.$emit('change', item.title);
            },
            checkPermission(permissionIds) {
                if (typeof (permissionIds) != "object")
                    permissionIds = [permissionIds];

                let permission = this._.filter(this.userPermissions, (item) => {
                    return permissionIds.indexOf(item.id) >= 0;
                });
                return (permission && permission.length > 0);
            }
        }
    }
</script>
