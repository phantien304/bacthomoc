<template>
    <tree-select :options="zoneData" :value="value" v-model="zoneId" v-if="listZone"/>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';
    import treeSelect from './tree-select';

    export default {
        name: 'zone-select',
        components: { treeSelect },
        props: {
            value: null,
            typeName: ''
        },
        computed: {
            ...mapGetters(['listZone']),
            zoneData() {
                if (!this.typeName)
                    return this.listZone;
                return this.listZone.filter(k => k.info.typeName == this.typeName);
            }
        },
        data() {
            return {
                zoneId: this.value
            }
        },
        methods: {
            ...mapActions(['getZoneTree'])
        },
        watch: {
            'value'() {
                this.zoneId = this.value;
            },
            'zoneId'() {
                this.$emit('input', this.zoneId);
                this.$emit('change', this.zoneId);
            }
        },
        created() {
            if (!this.listZone)
                this.getZoneTree();
        }
    }
</script>