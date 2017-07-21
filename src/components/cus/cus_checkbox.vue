<template>
  <div class="coCheckbox font14">
    <div class="checkbox" @click='checkboxClick'>
      <img v-if="checkState" src="/static/img/form_checkbox.png">
      <div v-else></div>
    </div>
    <div class="labelBox" @click='checkboxClick'>
      <label>{{labelText}}</label>
      <slot name="other"></slot>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'coCheckbox',
    props: {
      labelText: '',
      checkState: {
        default: false
      }
    },
    methods: {
      checkboxClick: function () { this.$emit('checkboxClick') }
    }
  }
</script>
