<template>
  <div class="logo">
    <router-link :to="{ path: '/admin/live-run' }">
      <img src="../../assets/logo.png" alt="LiveRun">
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'logo-header'
  }
</script>

<style lang="stylus" scoped>
  .logo
    img
      display block
      width 100%
      max-width 100%

    &.logo-app-header
      img
        max-width 59px
</style>

