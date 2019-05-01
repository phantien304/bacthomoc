<template>
    <span class="badge badge-info">
        <template v-for="lang in appSettings.languages" v-if="lang.code==code">
            {{lang.name}}
        </template>
    </span>
</template>
<script>
    export default {
        name: 'language-label',
        props: {
            code: {
                type: String,
                default: '',
                required: true
            }
        }
    }
</script>