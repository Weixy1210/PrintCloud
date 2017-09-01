<template>
  <div class="coCusRightMainModule bgWhiteColor">
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
    name: 'coCusRightMainModule',
    props: {
      titleImgSrc: '',
      title: ''
    }
  }
</script>
