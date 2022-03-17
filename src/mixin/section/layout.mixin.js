import {mapActions, mapState} from "vuex";

const mixin = {
    data() {
        return {}
    },

    mounted() {
    },
    created() {
    },
    computed: {
        ...mapState({
            layout: state => state.layoutStore.layout,
            tabs: state => state.layoutStore.tabs,
        }),
    },
    methods: {
        ...mapActions(['menuCollapse']),
    }
}


export default mixin
