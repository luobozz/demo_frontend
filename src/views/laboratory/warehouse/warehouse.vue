<template>
    <div class="content">

    </div>
</template>

<script>
    import methods from "./warehouse.js";
    export default {
        name: "warehouse",
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
    @import "./warehouse.less";
</style>