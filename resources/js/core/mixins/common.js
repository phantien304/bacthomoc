import Vue from 'vue';
if (!process.env.VUE_ENV) {
    Vue.mixin({
        data() {
            return {
                ww: window.innerWidth
            }
        },
        computed: {
            isMobile() {
                return this.ww < 767;
            }
        },
        methods: {
            handleResize() {
                this.ww = window.innerWidth;
            }
        },
        mounted: function () {
            window.addEventListener('resize', this.handleResize);
            if (this.scope)
                document.body.classList.add(this.scope);
        },
        beforeDestroy: function () {
            window.removeEventListener('resize', this.handleResize);
        },
        destroyed() {
            if (this.scope)
                document.body.classList.remove(this.scope);
        }
    });
    Vue.mixin({
        computed: {
            navigator() {
                var ua = navigator.userAgent, tem,
                    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                if (/trident/i.test(M[1])) {
                    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                    return 'IE ' + (tem[1] || '');
                }
                if (M[1] === 'Chrome') {
                    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                    if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
                }
                M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
                if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
                return M.join(' ');
            }
        }
    });
}