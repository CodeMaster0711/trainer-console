<template>
  <div class="box__header">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'box-with-header',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
