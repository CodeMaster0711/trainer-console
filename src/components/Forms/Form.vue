<template>
  <form class="form-container" :class="{'form-container--half': halfSize}" @submit.prevent="handleSubmit" novalidate>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'customForm',
  props: {
    handleSubmit: {
      type: Function
    },
    halfSize: {
      type: Boolean
    }
  }
}
</script>
