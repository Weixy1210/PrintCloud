<template>
  <div class="coMsgBox whiteFont font18">
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
