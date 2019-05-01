<template>
    <ul class="pagination" v-if="showPager && total > pageSize">
        <li :class="prevCls" v-if="showNextPrev">
            <a class="page-link" href="javascript:;" @click="changePage(pageIndex - 1)"><i class="fas fa-chevron-left"></i></a>
        </li>
        <li :class="{'page-item':true,'active':pageIndex===item.value}" v-for="item in items" v-if="showNumber">
            <a class="page-link" href="javascript:;" @click="changePage(item.value)">{{item.text}}</a>
        </li>
        <li :class="nextCls" v-if="showNextPrev">
            <a class="page-link" href="javascript:;"  @click="changePage(pageIndex + 1)"><i class="fas fa-chevron-right"></i></a>
        </li>
    </ul>
</template>
<style scoped>
    .disabled { opacity: 0.5; pointer-events: none; }
</style>
<script>
    export default {
        name: 'pager',
        props: {
            total: {
                type: Number,
                default: 0,
                validator: (val) => val >= 0
            },
            pageIndex: {
                type: Number,
                default: 1,
                validator: (val) => val >= 1
            },
            pageCount: {
                type: Number,
                default: 7,
                validator(val) {
                    return val >= 5 && val <= 21 && val % 2 !== 0;
                }
            },
            pageSize: {
                type: Number,
                default: 20
            },
            showNextPrev: {
                type: Boolean,
                default: true
            },
            showNumber: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            showPager() {
                return this.totalPage > 1;
            },
            prevCls() {
                return 'page-item ' + (this.pageIndex <= 1 ? 'disabled' : '');
            },
            nextCls() {
                return 'page-item ' + (this.pageIndex >= this.totalPage ? 'disabled' : '');
            },
            showPageCount() {
                return this.pageCount - 2;
            },
            totalPage() {
                return Math.ceil(this.total / this.pageSize);
            },
            items() {
                if (this.total === 0) return [];
                const showPageCount = this.showPageCount;
                const arr = [];
                const start = 1;
                const end = this.totalPage;

                if (end <= showPageCount + 2) {
                    for (let i = start; i <= end; i++) {
                        arr.push({ text: i, value: i });
                    }
                    return arr;
                }
                arr.push({ text: start, value: start });
                if (this.pageIndex - start >= showPageCount - 1) {
                    const go = this.pageIndex - showPageCount;
                    arr.push({
                        text: '...',
                        value: go < 1 ? 1 : go
                    });
                }

                let listStart = this.pageIndex - Math.floor(showPageCount / 2);
                if (listStart <= 1) listStart = 2;
                let listEnd = listStart + showPageCount - 1;
                if (listEnd >= end) listEnd = end - 1;
                listStart = listEnd - showPageCount + 1;

                for (let i = listStart; i <= listEnd; i++) {
                    arr.push({ text: i, value: i });
                }

                if (end - this.pageIndex >= showPageCount - 1) {
                    const go = this.pageIndex + showPageCount;
                    arr.push({
                        text: '...',
                        value: go > end ? end : go
                    });
                }
                arr.push({ text: end, value: end });
                return arr;
            }
        },
        methods: {
            changePage(page) {
                this.$emit('update:pageIndex', page);
                this.$emit('change', page);
            }
        }
    };
</script>