<template>
    <div class="content">
        <layout-header @routerMethod="routerMethod"></layout-header>
        <layout-body ref="layoutBody"></layout-body>
    </div>
</template>

<script>
    import methods from "./home.js";
    import layoutBody from '../../components/layout/layoutBody/layoutBody'
    import layoutHeader from '../../components/layout/layoutHeader/layoutHeader'

    export default {
        name: "home",
        components: {
            'layout-body': layoutBody,
            'layout-header':layoutHeader,
        },
        data() {
            return {}
        },
        created() {
            this.init()
        },
        computed: {},
        methods: methods
    }
</script>

<style lang="less" scoped>
    @import "./home.less";
</style>