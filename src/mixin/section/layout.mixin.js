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
            layout: state => state.systemStore.layout,
        }),
    },
    methods: {
        ...mapActions(['menuCollapse']),
    }
}


export default mixin