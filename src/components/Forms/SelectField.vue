<template>
  <div class="form__group">
    <label :for="name" v-if="label">{{ label }}: <span class="required" v-if="required">*</span></label>
    <select v-model="input" :id="name" :name="name" @change="changeHandle" :required="required" class="form-control" :class="{'is-danger': hasError }">
      <option value="" disabled :selected="input === ''">Select a {{ label }}...</option>
      <option :value="option[optionValue]" v-for="option in options"> {{ option[optionName] }}</option>
    </select>
    <span class="help is-danger" v-if="hasError">{{ errorMessage }}</span>
  </div>
</template>

<script>
export default {
  name: 'selectField',
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
    },
    options: {
      type: Array,
      default () {
        return []
      }
    },
    optionValue: {
      type: String
    },
    optionName: {
      type: String
    }
  },
  mounted () {
    this.input = this.value
  },
  data: () => ({
    input: ''
  }),
  methods: {
    changeHandle () {
      this.updateInput()
    },
    updateInput () {
      this.$emit('input', this.input)
    }
  }
}
</script>
