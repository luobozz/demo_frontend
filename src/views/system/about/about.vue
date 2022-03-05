<template>
    <div class="content">
        <layout-card>
          123
        </layout-card>
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

<style lang="scss" scoped>
    @import "./about";
</style>