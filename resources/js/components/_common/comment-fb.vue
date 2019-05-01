<template>
    <div class="cfb-comment-fb" v-if="url">
        <div class="fb-comments" :data-href="url" :data-width="width ? width : '100%'" :data-numposts="numPost ? numPost : 5"></div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "comment-fb",
        props: ['url', 'numPost', 'width'],
        data() {
            return {
                fbInited: false
            }
        },
        computed: {
            ...mapGetters(['locale'])
        },
        watch: {
            url(val) {
                if (val) {
                    this.$nextTick(function () {
                        FB.XFBML.parse();
                    })
                }
            }
        },
        created() {
            var me = this;
            if (!process.env.VUE_ENV) {
                window.fbAsyncInit = function () {
                    FB.init({
                        appId: me.appSettings.fbAppId,
                        cookie: true,  // enable cookies to allow the server to access
                        // the session
                        xfbml: true,  // parse social plugins on this page
                        version: 'v2.5' // use graph api version 2.5
                    });
                    me.fbInited = true;
                };
                let l = 'en_US';
                if (this.locale == 'vi')
                    l = 'vi_VN';
                else if (this.locale == 'zh')
                    l = 'zh_CN';
                //Facebook SDK
                (function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) { return me.fbInited = true; }
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/" + l + "/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            }
        },
        mounted() {
            this.$nextTick(function () {
                if (this.fbInited) {
                    FB.XFBML.parse();
                }
            })
        }
    }
</script>
<style scoped>
    .cfb-comment-fb { margin-top: 35px; }
</style>