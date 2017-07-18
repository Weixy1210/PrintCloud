<template>
  <div class="coInputText">
  	<div class="imgLeft"><slot name="iconLeft"></slot></div>
  	<input :type="inputType" :name="inputName" :placeholder="inputPlaceholder" :class="inputClass" @blur="inputOnBlur" :value="inputValue">
  	<div class="imgRight"><slot name="iconRight"></slot></div>
  	<div v-if="warnMsgState" class="warnMsg font14">
      <img src="../../static/img/cus_msgBox_notice_notice.png" class="fl">
      {{warnMsgTxt}}
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default{
    name: 'coInputText',
    // 暴露组件中每个标签的属性接口
    props: {
      inputType: {
        default: 'text'
      },
      inputName: '',
      inputPlaceholder: '',
      inputValue: '',
      inputClass: '',
      warnMsgState: {
        default: false
      },
      warnMsgTxt: ''
    },
    methods: {
      inputOnBlur: function () {
        this.$emit('inputOnBlur')
      }
    },
    mounted: function () {
      // 警告提示跟在输入框之后
      $('.coInputText .warnMsg').css('left', $('.coInputText').width())
    }
  }
</script>
