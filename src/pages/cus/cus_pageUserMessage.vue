<template>
  <article id="cusUserMessage">
    <headModule :titleImgSrc="titleImg" title="我的消息">
      <div slot="body">
        <ul class="tabLine" v-if="this.$store.state.userMessage.location === 'all'">
          <li class="fl active"><button class="fontBold" @click='allLocation'>全部消息</button></li>
          <li class="fl"><button class="fontBold" @click='readLocation'>已读消息</button></li>
          <li class="fl"><button class="fontBold" @click='unreadLocation'>未读消息</button></li>
        </ul>
        <ul class="tabLine" v-if="this.$store.state.userMessage.location === 'read'">
          <li class="fl"><button class="fontBold" @click='allLocation'>全部消息</button></li>
          <li class="fl active"><button class="fontBold" @click='readLocation'>已读消息</button></li>
          <li class="fl"><button class="fontBold" @click='unreadLocation'>未读消息</button></li>
        </ul>
        <ul class="tabLine" v-if="this.$store.state.userMessage.location === 'unread'">
          <li class="fl"><button class="fontBold" @click='allLocation'>全部消息</button></li>
          <li class="fl"><button class="fontBold" @click='readLocation'>已读消息</button></li>
          <li class="fl active"><button class="fontBold" @click='unreadLocation'>未读消息</button></li>
        </ul>
        <div class="main">
          <div v-for="(item, index) in this.$store.state.userMessage.messages" class="messagePart borderBox">
            <div class="partHead font14">
              <div class="fl leftPart"><img src="../../../static/img/cus_userMessage_partTitle.png" class="fl">印云</div>
              <div class="fr rightPart" :class="item.state">{{item.time}}</div>
            </div>
            <div class="partBody">
              <div class="partTitle blueFont2 fontBold font18" :class="item.state">{{item.title}}</div>
              <div class="partContent font16" v-if="item.showAll">
                <div v-html="item.content" :class="item.state" class="show"></div>
                <div class="toggleBtn textRight"><button class="blueFont2 font14" @click="contentShowToggle(index)">收起<img src="../../../static/img/cus_user_content_off.png" class="fr"></button></div>
              </div>
              <div class="partContent font16" v-else>
                <div v-html="item.content" :class="item.state" class="hide overFlowHidden"></div>
                <div class="toggleBtn textRight"><button class="blueFont2 font14" @click="contentShowToggle(index)">展开全部<img src="../../../static/img/cus_user_content_on.png" class="fr"></button></div>
              </div>
            </div>
          </div>
          <ul class="pagination textCenter grayFont font12 fontBold" v-if="this.$store.state.userMessage.totalPage > 1">
            <li class="fl cursorPointer prevPage bgBlueColor2"><img src="../../../static/img/cus_user_pagination_prev.png"></li>
            <div class="center">
              <li class="fl" v-if="this.$store.state.userMessage.page > 3">···</li>
              <li class="fl cursorPointer btnHover1" :class="pageList[0].class">{{pageList[0].page}}</li>
              <li class="fl cursorPointer btnHover1" :class="pageList[1].class">{{pageList[1].page}}</li>
              <li class="fl cursorPointer btnHover1" :class="pageList[2].class">{{pageList[2].page}}</li>
              <li class="fl" v-if="this.$store.state.userMessage.page <= this.$store.state.userMessage.totalPage - 3">···</li>
            </div>
            <li class="fr cursorPointer nextPage bgBlueColor2"><img src="../../../static/img/cus_user_pagination_next.png"></li>
          </ul>
        </div>
      </div>
    </headModule>
  </article>
</template>

<script>
  import $ from 'jquery'
  import headModule from '../../components/cus/cus_rightMainModule.vue'
  import titlePicture from '../../../static/img/cus_userMessage_title.png'
  export default{
    name: 'cusUserMessage',
    components: {
      'headModule': headModule
    },
    data: function () {
      return {
        titleImg: titlePicture
      }
    },
    computed: {
      pageList: function () {
        let page = this.$store.state.userMessage.page
        let finalPage = this.$store.state.userMessage.totalPage
        let list = [
          {
            page: 0,
            class: ''
          },
          {
            page: 0,
            class: ''
          },
          {
            page: 0,
            class: ''
          }
        ]
        if (page <= 3) {
          list[0].page = 1
          list[1].page = 2
          list[2].page = 3
          list[page - 1].class = 'active'
        } else if (page <= finalPage - 3) {
          list[0].page = page - 1
          list[1].page = page
          list[2].page = page + 1
          list[1].class = 'active'
        } else {
          list[0].page = finalPage - 2
          list[1].page = finalPage - 1
          list[2].page = finalPage
          list[2 - (finalPage - page)].class = 'active'
        }
        return list
      }
    },
    mounted: function () {
      this.$store.dispatch('userLocationSet', {
        str: 'message'
      })
      $('#cusUserContainer aside.sideColumn').height($('#cusUserMessage .coCusRightMainModule').height())
    },
    updated: function () {
      $('#cusUserContainer aside.sideColumn').height($('#cusUserMessage .coCusRightMainModule').height())
    },
    methods: {
      allLocation: function () {
        this.$store.dispatch('userMessageLocationSet', {
          str: 'all'
        })
      },
      readLocation: function () {
        this.$store.dispatch('userMessageLocationSet', {
          str: 'read'
        })
      },
      unreadLocation: function () {
        this.$store.dispatch('userMessageLocationSet', {
          str: 'unread'
        })
      },
      contentShowToggle: function (index) {
        this.$store.dispatch('userMessageContentshowAllToggle', {
          index: index
        })
      }
    }
  }
</script>
