<template>
  <a-layout-header :class="{'flex':true,'header':true}">
    <div class="logo flex al-ct">
      <lb-icon type="svg-iconedu"></lb-icon>
      <span class="title flex al-ct mg-l-md">{{ systemName }}</span>
    </div>
    <div class="headInfo flex al-ct jc-fe">
      <div class="account-info flex">
        <a-dropdown class="flex al-ct"
                    @visibleChange="messageVisibleChangeHandle"
                    v-model="dropDown.message.visible"
                    :getPopupContainer="common().getModalContainer('layout-header-message-info')"
                    placement="topLeft">
          <div id="layout-header-message-info" class="cur-pointer message">
            <a-badge :count="unreadCount">
              <lb-icon type="fa-bell-o" size="22"></lb-icon>
            </a-badge>
          </div>
          <div class="dropdown-overlay-box" slot="overlay">
            <div class="message-content">
              <div class="message-title flex al-ct jc-sb">
                <div class="text-bd">消息({{ unreadCount }}条未读)</div>
                <div class="text-lk text-sm cur-pointer" @click="messageReadAllHandle">全部标记已读</div>
              </div>
              <list-container
                  ref="messageListContainer"
                  class="message-body"
                  :footer="false"
                  :border="false">
                <a-list slot="list"
                        :data-source="dropDown.message.data"
                        :loading="dropDown.message.loading">
                  <a-list-item class="cur-pointer message-item" slot="renderItem" slot-scope="item,index"
                               @click="readMessageHandle(item.uuid)">
                    <a-list-item-meta
                        :description="item.content"
                    >
                      <lb-avatar
                          type="img"
                          error-icon="svg-iconheadimg"
                          slot="avatar"
                          :src="item.fromAccountImage"
                          size="small"/>
                      <div slot="title"> {{ item.title }}</div>
                    </a-list-item-meta>
                    <div class="text-sm">{{ $util.data.time.timeFromNow(item.createdTime) }}</div>
                  </a-list-item>
                </a-list>
              </list-container>
              <div class="message-foot text-lk text-sm  cur-pointer flex al-ct jc-ct"
                   @click="$router.push({name: 'message', params: {}})">
                查看全部消息
              </div>
            </div>
          </div>
        </a-dropdown>


        <a-dropdown class="account-dropdown flex al-ct" v-model="dropDown.account.visible">
          <a @click="e => e.preventDefault()">
            <lb-avatar class="mg-r-min head-pic" type="img"
                       error-icon="svg-iconheadimg"
                       :src="accountState.image"
                       size="small"/>
            <div class="mg-r-min">{{ accountState.account }}</div>
            <a-icon type="down"/>
          </a>
          <a-menu slot="overlay">
            <a-menu-item disabled>
              {{ getRoleName }}
            </a-menu-item>
            <a-menu-divider/>
            <a-menu-item @click="quitLogin">
              <lb-icon class="mg-r-min" type="fa-power-off"></lb-icon>
              <span>退出登录</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import {mapActions, mapState} from "vuex";
import lodash from "lodash";
import listContainer from "@/components/section/listContainer/listContainer";
import store from "@/store";

export default {
  name: 'layoutHeader',
  components: {
    'list-container': listContainer,
  },
  props: {},
  data() {
    return {
      dropDown: {
        account: {
          visible: false
        },
        message: {
          visible: false,
          data: [],
          loading: false,
        },
      },
    }
  },
  computed: {
    ...mapState({
      unreadCount: state => state.messageStore.unreadCount,
    }),
    getRoleName() {
      return this.accountState.roleVos.map(p => p.name)?.toString();
    }
  },
  created() {

  },
  methods: {
    ...mapActions(['logout']),
    quitLogin() {
      const {
        logout,
        $router,
        $util
      } = this;
      logout({});
    },
    messageReadAllHandle() {
      if (this.unreadCount > 0) {
        this.$httpApi.ews.system.message.messageReadAll().then(res => {
          store.dispatch("getMessage")
          this.messageDataHandle();
        })
      }
    },
    messageVisibleChangeHandle(visible) {
      if (visible) {
        this.messageDataHandle();
        //延时执行 避免尚未block
        setTimeout(()=>{this.$refs["messageListContainer"]?.resetScroll()},1)
      }
    },
    readMessageHandle(uuid) {
      this.$httpApi.ews.system.message.messageRead({uuid: uuid}).then(res => {
        store.dispatch("getMessage")
        this.messageDataHandle();
        // if(this.$route)
        if (this.$route.name == "message") {
          this.$emit("routerMethod", "refreshHandle")
        }
      })
    },
    messageDataHandle() {
      this.dropDown.message.loading = true;
      this.$httpApi.ews.system.message.getMessage({
        readType: 0
      }).then(res => {
        this.dropDown.message.data = res.data
      }).finally(f => {
        this.dropDown.message.loading = false;
      })
    }
  }
}
</script>

<style lang="less" scoped>
@messageTitleHeight: 36px;
@messageFootHeight: 36px;
.header {
  width: 100%;
  background: @color-bg-main;
  color: @color-font-base;
  height: @home-head-height !important;
  padding: 0 !important;

  .logo {
    height: 100%;
    width: 250px;
    padding-left: @padding-lg;

    svg {
      font-size: @font-size-lg*1.5;
    }

    .title {
      font-size: @font-size-lg;
      height: 100%;
      font-weight: 600;
    }
  }

  .headInfo {
    width: calc(100% - 250px);
    height: 100%;

    & > div {
      height: 100%;
    }

    .account-info {
      padding-right: @padding-md;

      .message-content {
        position: relative;
        width: 400px;
        height: 350px;
        overflow: hidden;

        .message-title {
          padding: @padding-md;
          width: 100%;
          height: @messageTitleHeight;
          border-bottom: @border-base;
        }

        .message-body {
          width: 100%;
          height: calc(100% - @messageTitleHeight - @messageFootHeight) !important;
          border-radius: 0;
          padding: 0;

          .message-item {
            width: 100%;
            height: 100%;
            padding: @padding-sm @padding-md;
          }

          .message-item:hover {
            background-color: @primary-1;
          }
        }

        .message-foot {
          border-top: @border-base;
          height: @messageFootHeight;
        }
      }


      & > * {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      & > *:not(:last-child) {
        margin-right: @padding-md;
      }

      .account-dropdown {
        .head-pic {
          background-color: @primary-5;
        }

        color: @color-font-base !important;
        height: 100%;
      }

    }
  }

}

</style>
