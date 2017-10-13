<template>
  <ul class="coBusPagination textCenter grayFont font12" v-if="totalPage > 1">
    <li class="fl cursorPointer prevPage bgWhiteColor borderColor2 btnHover1" @click="prevOnePageClick"><img src="../../../static/img/bus_order_pagination_prev.png"></li>
    <div class="center">
      <li v-for="item in totalPage" :index="item" class="fl cursorPointer" 
        @click="particularPageClick(item)">
        <span v-if="item === page" class="active">{{item}}</span>
        <span v-else>{{item}}</span>
      </li>
    </div>
    <li class="fr cursorPointer nextPage bgWhiteColor borderColor2 btnHover1" @click="nextOnePageClick"><img src="../../../static/img/bus_order_pagination_next.png"></li>
  </ul>
</template>

<script>
  export default{
    name: 'coBusPagination',
    props: {
      totalPage: { type: Number },
      page: { type: Number }
    },
    methods: {
      prevOnePageClick: function () {},
      particularPageClick: function (index) { this.$emit('particularPageClick', index) },
      nextOnePageClick: function () {}
    }
  }
</script>
