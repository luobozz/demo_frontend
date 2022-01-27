import httpApi from "../../api/"
import uiUtil from "../../utils/ui"
import router from "@/router";

export default {
    state: {
        unreadCount: 0
    },
    actions: {
        getMessage(context, params) {
            httpApi.ews.system.message.getMessageListen().then(res=>{
                // console.log(res.data[0])
                context.commit('SET_UN_READ_COUNT', res.data[0].unreadCount);
                if(res.data[0].hasNew){
                    uiUtil.notification({
                        message:res.data[0].newMessage.title,
                        description:res.data[0].newMessage.content,
                        btn:[{
                            text:"去查看",
                            click:()=>{
                                router.push({name: 'message', params: {}})
                            },
                            size:"small"
                        }]
                    })
                }
            })
        },

    },
    mutations: {
        SET_UN_READ_COUNT(state,payload) {
            state.unreadCount = payload;
        },
    }
}