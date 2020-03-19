<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="scss">
    body, html {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
    }

    #app {
        width: 100%;
        height: 100%;
    }
</style>
