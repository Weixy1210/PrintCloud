<template>
  <ul class="coCusPagination textCenter grayFont font12 fontBold" v-if="totalPage > 1">
    <li class="fl cursorPointer prevPage bgBlueColor2" @click="prevOnePageClick"><img src="../../../static/img/cus_user_pagination_prev.png"></li>
    <div class="center">
      <li class="fl" v-if="page > 3" @click="prevPagesClick">···</li>
      <li class="fl cursorPointer btnHover1" :class="pageList[0].class" @click="firthPageClick">{{pageList[0].page}}</li>
      <li class="fl cursorPointer btnHover1" :class="pageList[1].class" @click="secondPageClick">{{pageList[1].page}}</li>
      <li class="fl cursorPointer btnHover1" :class="pageList[2].class" @click="thirdPageClick">{{pageList[2].page}}</li>
      <li class="fl" v-if="page <= totalPage - 3" @click="nextPagesClick">···</li>
    </div>
    <li class="fr cursorPointer nextPage bgBlueColor2" @click="nextOnePageClick"><img src="../../../static/img/cus_user_pagination_next.png"></li>
  </ul>
</template>

<script>
  export default{
    name: 'coCusPagination',
    props: {
      totalPage: { type: Number },
      page: { type: Number }
    },
    computed: {
      pageList: function () {
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
        if (this.page <= 3) {
          list[0].page = 1
          list[1].page = 2
          list[2].page = 3
          list[this.page - 1].class = 'active'
        } else if (this.page <= this.totalPage - 3) {
          list[0].page = this.page - 1
          list[1].page = this.page
          list[2].page = this.page + 1
          list[1].class = 'active'
        } else {
          list[0].page = this.totalPage - 2
          list[1].page = this.totalPage - 1
          list[2].page = this.totalPage
          list[2 - (this.totalPage - this.page)].class = 'active'
        }
        return list
      }
    },
    methods: {
      prevOnePageClick: function () {},
      prevPagesClick: function () {},
      firthPageClick: function () { this.$emit('particularPageClick', this.pageList[0].page) },
      secondPageClick: function () { this.$emit('particularPageClick', this.pageList[1].page) },
      thirdPageClick: function () { this.$emit('particularPageClick', this.pageList[2].page) },
      nextPagesClick: function () {},
      nextOnePageClick: function () {}
    }
  }
</script>
