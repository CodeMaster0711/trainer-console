<template>
  <div class="streaming__status">
    <span class="status" :class="{ 'status--offline': status === false, 'status--online': status === true }">
    </span>
    <span class="text">
      {{ status ? 'Streaming now' : `You're offline` }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'status-streaming',
  data () {
    return {
      status: false
    }
  }
}
</script>
