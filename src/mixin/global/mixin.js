import {mapState} from "vuex";

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
            media: state => state.systemStore.media.media,
        }),
    },
    methods: {
        isSuitMedia(arr){
            return typeof arr==="string"?arr===this.media:arr.indexOf(this.media)>-1
        }
    }
}


export default mixin