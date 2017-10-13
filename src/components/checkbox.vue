<template>
  <div class="coCheckbox font16">
    <div class="checkbox cursorPointer" @click='checkboxClick'>
      <img v-if="checkState" src="../../static/img/form_checkbox.png">
      <div v-else :class="tableCheck"></div>
    </div>
    <div v-if="labelState" class="labelBox" @click='checkboxClick'>
      <label>{{labelText}}</label>
      <slot name="other"></slot>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'coCheckbox',
    props: {
      tableCheck: '',
      labelState: { default: true },
      labelText: '',
      checkState: { default: false }
    },
    methods: {
      checkboxClick: function () { this.$emit('checkboxClick') }
    }
  }
</script>
