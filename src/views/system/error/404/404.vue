<template>
    <div class="content">
        404
    </div>
</template>

<script>
    import methods from "./404";

    export default {
        name: "error404",
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
    @import "./404.less";
</style>