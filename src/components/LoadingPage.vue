<template>
  <div v-if="hasLoading">
    <div class="loading-page">
    </div>
    <spinner message="Loading..." text-fg-color="#000" line-fg-color="#423799" line-bg-color="#555555"></spinner>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner'
import { mapGetters } from 'vuex'

export default {
  name: 'loading-page',
  data: () => ({
    hasLoading: false
  }),
  computed: mapGetters({
    queue: 'LoadingQueue/queue'
  }),
  components: {
    Spinner
  },
  watch: {
    queue () {
      this.hasLoading = this.queue.length > 0
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #fff;
  opacity: .8;
  top: 0;
  left: 0;
}

.loading-page + div {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 9999999;
}
</style>
