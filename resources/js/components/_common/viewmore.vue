<template>
    <div class="row text-center" v-if="isLoading != 3">
        <a class="dviewmore text-center" href="javascript:;" @click="$emit('loadMore')">
            <span class="ttx" v-if="isLoading == 2">
                <i class="fa fa-cog fa-spin fa-2x fa-fw"></i>
                <span class="sr-only">Loading...</span>
            </span>
            <span class="view" v-else>
                {{$t("Label.Message.ViewMore")}}&nbsp; <i class="fa fa-angle-down" aria-hidden="true"></i>
            </span>
        </a>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        computed: mapGetters(['isLoading']),
    }
</script>
<style scoped>
    .dviewmore {
        color: white;
        background-color: #ffa30a;
        display: inline-block;
        padding: 10px 34px;
        border-radius: 25px;
    }
</style>