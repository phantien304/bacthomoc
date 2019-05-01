<template>
    <treeselect :options="listZoneWithDefault"
                :value="value"
                :normalizer="normalizer" v-if="listZoneWithDefault && listZoneWithDefault.length>0" v-model="zoneId" :defaultExpandLevel="10" :load-options="loadOptions" />
</template>
<script>
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
        name: 'tree-select',
        components: { Treeselect },
        props: {
            options: null,
            value: null
        },
        data() {
            return {
                zoneId: this.value,
                normalizer(node) {
                    let name = [];
                    this._.each(node.zoneByLangs, (o) => {
                        name.push(o.name);
                    });
                    return {
                        id: node.info.id,
                        label: name.join(' / '),
                        children: node.children,
                    }
                }
            }
        },
        methods: {
            loadOptions({ action, parentNode, callback }) {
                if (action == 'LOAD_CHILDREN_OPTIONS') {
                    if (!parentNode.children)
                        parentNode.children = undefined;
                    callback();
                }
            }
        },
        computed: {
            listZoneWithDefault() {
                if (this.options) {
                    let okeyZone = this.options;
                    let data = [{
                        info: { id: 0, name: 'Chọn danh mục' }, zoneByLangs: [{ name: 'Chọn danh mục' }]
                    }].concat(okeyZone);
                    return data;
                }
                else {
                    return [{ id: 0, name: 'Chọn danh mục' }];
                }
            }
        },
        watch: {
            'value'() {
                this.zoneId = this.value;
            },
            'zoneId'() {
                this.$emit('input', this.zoneId);
            }
        }
    }
</script>