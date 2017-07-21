<template>
  <div class="coCusRegMainModile">
    <div class="title font18">
      <img :src="titleImgSrc">{{title}}
    </div>
    <div class="body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'coCusRegMainModile',
    props: {
      titleImgSrc: '',
      title: ''
    }
  }
</script>
