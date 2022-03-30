import {mapState} from "vuex";
import layoutStore from "@/store/module/layout-store";
import curd from "@/utils/crud/index"

const mixin = {
    data() {
        return {
            ...curd.data
        }
    },
    mounted() {
    },
    created() {
    },
    computed: {
        ...mapState({
            media: state => state.layoutStore.media.media,
            accountStore:state => state.accountStore.account
        }),
        ...curd.computed
    },
    methods: {
        ...curd.method,
        isSuitMedia(arr){
            return typeof arr==="string"?arr===this.media:arr.indexOf(this.media)>-1
        }
    }
}


export default mixin
