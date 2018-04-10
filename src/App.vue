<template>
  <div id="app">
    <loading-page></loading-page>
    <router-view></router-view>
  </div>
</template>

<script>
import LoadingPage from '@/components/LoadingPage'

export default {
  name: 'app',
  components: {
    LoadingPage
  }
}
</script>
