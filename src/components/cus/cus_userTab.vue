<template>
  <ul class="coTabLine">
    <li  v-for="item in tabList" :class="'fl ' + item.class">
      <button class="fontBold" @click="item.func">{{item.name}}</button>
    </li>
  </ul>
</template>

<script>
  export default{
    name: 'coTabLine',
    props: {
      tabList: { type: Array }
    }
  }
</script>
