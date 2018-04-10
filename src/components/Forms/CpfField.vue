<template>
  <div class="form__group" :class="{ 'has-danger' : hasError }">
    <label :for="name" v-if="label">{{ label }}: <span class="required" v-if="required">*</span></label>
    <input type="text" v-model="input" :id="name" :name="name" @keyup="keyUpHandle" :required="required" class="form-control" :class="{'is-danger': hasError }" autocomplete="off" maxlength="14">
    <span class="help is-danger" v-if="hasError">{{ errorMessage }}</span>
  </div>
</template>

<script>
import VMasker from 'vanilla-masker'

export default {
  name: 'cpfField',
  props: {
    label: {
      required: false,
      type: String
    },
    value: {
      required: true
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
    this.input = this.applyMask(this.value)
    this.updateInput()
  },
  data: () => ({
    input: ''
  }),
  methods: {
    keyUpHandle () {
      this.input = this.applyMask(this.input)
      this.updateInput()
    },
    updateInput () {
      this.$emit('input', this.removeMask(this.input))
    },
    applyMask (value) {
      return VMasker.toPattern(value, '999.999.999-99')
    },
    removeMask (value) {
      return VMasker.toNumber(value)
    }
  }
}
</script>
