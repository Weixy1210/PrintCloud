<template>
  <section class="coCusColumnsFrame overFlowHidden bgLightColor3">
    <div class="container">
      <aside class="sideColumn">
        <ul class="font16">
          <li v-for="item in liList">
            <router-link :to="item.path" :class="item.class">{{item.name}}</router-link>
          </li>
        </ul>
      </aside>
      <article class="mainColumn bgWhiteColor">
        <div class="title font18"><img :src="titleImgSrc">{{title}}</div>
        <div class="body"><slot name="body"></slot></div>
      </article>
    </div>
  </section>
</template>

<script>
  export default{
    name: 'coCusColumnsFrame',
    props: {
      liList: { type: Array },
      titleImgSrc: '',
      title: ''
    }
  }
</script>
