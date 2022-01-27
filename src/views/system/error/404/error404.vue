<template>
    <div class="content">
        404
    </div>
</template>

<script>
    import methods from "./error404.js";

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
    @import "./error404.less";
</style>