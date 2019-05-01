<template>
    <span>{{displayPrice}}</span>
</template>
<script>
    export default {
        name: 'price',
        props: {
            value: {
                type: Number,
                default: 0
            },
            zeroText: {
                type: String,
                default: 'Miễn phí'
            }
        },
        computed: {
            displayPrice() {
                let _price = '';
                if (this.value && this.value > 0)
                    _price = this.$options.filters.currency(this.value, '', 0, { thousandsSeparator: '.' }) + 'đ'
                else _price = this.zeroText;
                return _price;
            }
        }
    }
</script>