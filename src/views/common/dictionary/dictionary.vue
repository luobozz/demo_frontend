<template>
    <div class="content">

    </div>
</template>

<script>
    import methods from "./dictionary.js";
    export default {
        name: "dictionary",
        data() {
            return {

            }
        },
        created() {
            this.init()
        },
        computed: {
        },
        methods: methods
    }
</script>

<style lang="less"  scoped>
    @import "./dictionary.less";
</style>