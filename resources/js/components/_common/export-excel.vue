<template>
    <download-excel class="btn btn-default" :data="json_data" :fields="json_fields" name="filename.xls" worksheet="My Worksheet">
        Download Data
    </download-excel>
</template>
<script>
    export default {
        props: ['json_data', 'json_fields'],
    }
</script>
