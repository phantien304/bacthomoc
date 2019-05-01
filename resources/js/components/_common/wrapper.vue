<template>
    <div>
        <div class="row" v-if="title">
            <div class="col-sm-12">
                <div class="page-title-box">
                    <h4 class="page-title">{{title}}</h4>
                    <ol class="breadcrumb" v-if="sapo">
                        <li class="breadcrumb-item active">{{sapo}}</li>
                    </ol>
                </div>
            </div>
        </div>
        <div class="card m-b-20">
            <div class="card-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'wrapper',
        props: {
            title: {
                type: String,
                default: 'Tiêu đề'
            },
            sapo: {
                type: String,
                default: 'Mô tả'
            }
        }
    }
</script>