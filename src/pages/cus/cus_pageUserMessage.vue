<template>
  <div id="cusUserMessage">
    <coBanner></coBanner>
    <columnsFrame :liList="liList" :titleImgSrc="titleImg" title="我的消息">
      <div slot="body">
        <coTab :tabList="this.$store.state.userMessage.tabList"></coTab>
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
          <coPagination :page="this.$store.state.userMessage.page" :totalPage="this.$store.state.userMessage.totalPage"
            @particularPageClick="particularPageClick"></coPagination>
        </div>
      </div>
    </columnsFrame>
  </div>
</template>

<script>
  import $ from 'jquery'
  import cusUserBanner from '../../components/cus/cus_userBanner.vue'
  import columnsFrame from '../../components/cus/cus_columnsFrame.vue'
  import cusUserTabLine from '../../components/cus/cus_userTab.vue'
  import cusPagination from '../../components/cus/cus_pagination.vue'
  import titlePicture from '../../../static/img/cus_userMessage_title.png'
  export default{
    name: 'cusUserMessage',
    components: {
      'coBanner': cusUserBanner,
      'columnsFrame': columnsFrame,
      'coTab': cusUserTabLine,
      'coPagination': cusPagination
    },
    data: function () {
      return {
        liList: [
          {
            path: '/user/set',
            class: '',
            name: '个人设置'
          },
          {
            path: '/user/message',
            class: 'active',
            name: '我的消息'
          },
          {
            path: '/user/order',
            class: '',
            name: '我的订单'
          }
        ],
        titleImg: titlePicture
      }
    },
    mounted: function () {
      this.$store.dispatch('userLocationSet', {
        str: 'message'
      })
      $('#cusUserMessage aside.sideColumn').height($('#cusUserMessage article.mainColumn').height())
    },
    updated: function () {
      $('#cusUserMessage aside.sideColumn').height($('#cusUserMessage article.mainColumn').height())
    },
    methods: {
      contentShowToggle: function (index) {
        this.$store.dispatch('userMessageContentshowAllToggle', {
          index: index
        })
      },
      particularPageClick: function (page) {
        alert(page)
      }
    }
  }
</script>
