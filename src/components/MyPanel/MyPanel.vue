<template>
  <div class="panel">
    <app-header/>
    <slot></slot>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader/AppHeader'

export default {
  name: 'my-panel',
  components: {
    AppHeader
  }
}
</script>
