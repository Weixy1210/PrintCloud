<template>
  <div class="coInputText">
    <!-- 左侧图标 -->
    <slot name="iconLeft"></slot>
    <!-- 左侧标签 -->
    <label v-if="labelState" class="labelLeft font14">{{labelText}}</label>
    <!-- 输入框 -->
    <input v-if="inputCanUse"
      :type="inputType" :name="inputName"
      :placeholder="inputPlaceholder" :value="inputValue"
      :class="inputClass" class="font14" 
      @blur="inputOnBlur">
    <!-- 禁用状态的输入框 -->
    <input v-else disabled="true"
      :type="inputType" :name="inputName"
      :placeholder="inputPlaceholder" :value="inputValue"
      :class="inputClass" class="forbid font14">
    <!-- 右侧图标按钮 -->
    <slot name="iconRight"></slot>
    <!-- 右侧按钮可点击 -->
    <button type="button" v-if="buttonState && buttonCanUse"
      class="font14 whiteFont buttonRight" @click="buttonClick">
      {{buttonText}}
    </button>
    <!-- 按钮不可点击 -->
    <button type="button" v-else-if="buttonState && !buttonCanUse"
      class="font14 whiteFont forbid buttonRight">
      {{buttonText}}
    </button>
    <!-- 提示信息 -->
    <div v-if="warnMsgState" class="warnMsg font14" :class="warnMsgClass">
      <img v-if="warnImgState" :src="warnImgSrc" class="fl">
      <span v-if="warnTextState">{{warnText}}</span>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default{
    name: 'coInputText',
    props: {
      labelState: {
        default: true
      },
      labelText: '',
      inputCanUse: {
        default: true
      },
      inputType: {
        default: 'text'
      },
      inputName: '',
      inputPlaceholder: '',
      inputValue: '',
      inputClass: '',
      buttonState: {
        default: true
      },
      buttonCanUse: {
        default: true
      },
      buttonText: '',
      warnMsgState: {
        default: true
      },
      warnMsgClass: '',
      warnImgState: {
        default: true
      },
      warnImgSrc: '',
      warnTextState: {
        default: true
      },
      warnText: ''
    },
    methods: {
      inputOnBlur: function () { this.$emit('inputOnBlur') },
      buttonClick: function () { this.$emit('buttonClick') }
    },
    mounted: function () {
      // 警告提示跟在输入框之后
      let fonsize = parseInt($('html').css('font-size').match(/[0-9]+/g))
      $('.coInputText .warnMsg').css('left', $('.coInputText').width() + fonsize)
    }
  }
</script>
