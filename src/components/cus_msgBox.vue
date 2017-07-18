<template>
  <div class="coMsgBox whiteFont">
    <img :src="imgSrc" class="fl">{{ msg }}
  </div>
</template>

<script>
  export default{
    name: 'comsgBox',
    props: {
      imgSrc: '',
      msg: ''
    }
  }
</script>
