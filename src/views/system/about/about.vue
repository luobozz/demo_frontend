<template>
    <div class="content">
        about
    </div>
</template>

<script>
    import methods from "./about.js";

    export default {
        name: "about",
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
    @import "./about.less";
</style>