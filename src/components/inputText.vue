<template>
  <!-- 需要外部定义输入框宽度 -->
  <div class="coInputText">
    <!-- 左侧标签 -->
    <!-- labelState默认true,即标签存在 -->
    <label v-if="labelState" class="labelLeft font16">{{labelText}}</label>
    <!-- 输入框内部左侧图标 -->
    <slot name="iconLeft"></slot>
    <!-- 输入框 -->
    <!-- inputCanUse默认true,即输入框可用 -->
    <!-- inputType默认text,可修改为password -->
    <!-- inputClass可选有:警告warn,左侧内部有图标时leftPadding,右侧内部有图标时rightPadding -->
    <input v-if="inputCanUse"
      :type="inputType" :name="inputName"
      :placeholder="inputPlaceholder" :value="inputValue"
      :class="inputClass" class="font16 borderRadius borderColor borderBox" 
      @blur="inputOnBlur">
    <!-- 禁用状态的输入框,inputCanUse=false -->
    <input v-else disabled="true"
      :type="inputType" :name="inputName"
      :placeholder="inputPlaceholder" :value="inputValue"
      :class="inputClass" class="forbid font16 borderRadius borderColor borderBox grayFont">
    <!-- 输入框内部右侧图标按钮 -->
    <slot name="iconRight"></slot>
    <!-- 右侧按钮,可点击 -->
    <!-- buttonState默认true,即按钮存在 -->
    <!-- buttonCanUse默认true,即按钮可点击 -->
    <button type="button" v-if="buttonState && buttonCanUse"
      class="font16 whiteFont buttonRight borderRadius" @click="buttonClick">
      {{buttonText}}
    </button>
    <!-- 右侧按钮,不可点击,buttonCanUse=false -->
    <button type="button" v-if="buttonState && !buttonCanUse"
      class="font16 whiteFont forbid buttonRight borderRadius">
      {{buttonText}}
    </button>
    <!-- 提示信息 -->
    <!-- warnMsgState默认true,即提示信息存在 -->
    <!-- warnMsgClass用于显示提示信息(默认不显示),即取值warnMsgShow -->
    <div v-if="warnMsgState" class="warnMsg font14" :class="warnMsgClass">
      <!-- warnImgState默认true,即提示信息左侧图标存在 -->
      <img v-if="warnImgState" :src="warnImgSrc" class="fl">
      <!-- warnTextState默认true,即提示信息提示文字存在 -->
      <span v-if="warnTextState">{{warnText}}</span>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default{
    name: 'coInputText',
    props: {
      labelState: { default: true },  // 标签是否渲染
      labelText: { default: '' },     // 标签内容
      inputCanUse: { default: true },     // 输入框是否禁用
      inputType: { default: 'text' },     // 输入框类型
      inputName: { default: '' },         // 输入框名称
      inputPlaceholder: { default: '' },  // 输入框提示文字
      inputValue: { default: '' },        // 输入框输入值
      inputClass: { default: '' },        // 输入框状态控制
      buttonState: { default: true },   // 按钮是否渲染
      buttonCanUse: { default: true },  // 按钮是否禁用
      buttonText: { default: '' },      // 按钮文字
      warnMsgState: { default: true },   // 提示信息是否渲染
      warnMsgClass: { default: '' },     // 提示信息显示与否状态控制
      warnImgState: { default: true },   // 提示信息图标是否渲染
      warnImgSrc: { default: '' },       // 提示信息图标地址
      warnTextState: { default: true },  // 提示信息文本是否渲染
      warnText: { default: '' }          // 提示信息文本内容
    },
    methods: {
      inputOnBlur: function (event) { this.$emit('inputOnBlur', event) },
      buttonClick: function () { this.$emit('buttonClick') }
    },
    mounted: function () {
      // 警告提示跟在输入框之后
      let fonsize = parseInt($('html').css('font-size').match(/[0-9]+/g))
      $('.coInputText .warnMsg').css('left', $('.coInputText').width() + fonsize)
    }
  }
</script>
