<template>
  <div class="form__group">
    <label :for="name" v-if="label">{{ label }}: <span class="required" v-if="required">*</span></label>
    <input type="text" v-model="input" :id="name" :name="name" @keyup="keyUpHandle" :required="required" class="form-control" :class="{'is-danger': hasError }">
    <span class="help is-danger" v-if="hasError">{{ errorMessage }}</span>
  </div>
</template>

<script>
export default {
  name: 'textField',
  props: {
    label: {
      required: false,
      type: String
    },
    value: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    errorMessage: {
      required: false,
      type: String
    },
    hasError: {
      required: false
    },
    required: {
      type: Boolean
    }
  },
  mounted () {
    this.input = this.value
  },
  data: () => ({
    input: ''
  }),
  methods: {
    keyUpHandle () {
      this.updateInput()
    },
    updateInput () {
      this.$emit('input', this.input)
    }
  }
}
</script>
