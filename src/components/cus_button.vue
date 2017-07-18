<template>
  <input type="button" class="coFormButton" :class="buttonType" :value="buttonValue" @click="clickAction">
</template>

<script>
  export default{
    name: 'coFormButton',
    props: {
      buttonType: {
        default: 'lightStyle'
      },
      buttonValue: ''
    },
    methods: {
      clickAction: function () {
        // 使父组件可以触发自定义事件
        this.$emit('clickAction')
      }
    }
  }
</script>
