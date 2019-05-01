<template>
    <span class="badge badge-success status-label" v-if="status==1">
        Hiển thị
    </span>
    <span class="badge badge-danger status-label" v-else>
        Không hiển thị
    </span>
</template>
<style scoped>
    .status-label { margin: 0 5px; }
</style>
<script>
    export default {
        name: 'status-label',
        props: {
            status: {
                type: String,
                default: '',
                required: true
            }
        }
    }
</script>