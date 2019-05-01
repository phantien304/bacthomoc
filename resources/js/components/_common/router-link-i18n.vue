<template>
    <router-link :to="toWithLang">
        <slot></slot>
    </router-link>
</template>

<script>
    export default {
        name: 'router-link-i18n',
        props: {
            to: {
                type: String,
                required: true
            }
        },
        computed: {
            toWithLang() {
                return '/' + this.lang + this.to;
            }
        }
    }
</script>
