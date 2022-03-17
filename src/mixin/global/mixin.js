import {mapState} from "vuex";
import layoutStore from "@/store/module/layout-store";

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
            media: state => state.layoutStore.media.media,
        }),
    },
    methods: {
        isSuitMedia(arr){
            return typeof arr==="string"?arr===this.media:arr.indexOf(this.media)>-1
        }
    }
}


export default mixin
