<template>
    <div id="app">
        <div id="wrapper">
            <!-- Top Bar Start -->
            <menuLeft></menuLeft>
            <div class="content-page">
                <div class="content">
                    <div class="container-fluid">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import menuLeft from '../components/_share/site-left'
    export default {
        name: 'App',
        components: {
            'menuLeft': menuLeft,
        },
    };
</script>

