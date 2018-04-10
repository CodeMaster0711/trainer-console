<template>
  <header>
    <div class="flex">
      <h1 class="title">{{ title }} <span v-if="subtitle">{{ subtitle }}</span></h1>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'raceHeader',
  props: {
    title: {
      type: String,
      required: false
    },
    subtitle: {
      type: String,
      required: false
    }
    // ,
    // classes: {
    //   type: String,
    //   required: false
    // }
  }
}
</script>
