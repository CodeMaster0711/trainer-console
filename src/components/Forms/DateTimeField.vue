<template>
  <div class="form__group" :class="{ 'has-danger' : hasError }">
    <label :for="name" v-if="label">{{ label }}: <span class="required" v-if="required">*</span></label>
    <date-picker :date="startDate" :option="option"></date-picker>
    <span class="help is-danger" v-if="hasError">{{ errorMessage }}</span>
  </div>
</template>

<script>
import DatePicker from '@/components/DatePicker/DatePicker'

export default {
  name: 'dateField',
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
    let date = new Date().toISOString()
    date = date.replace('T', ' ')
    date = date.substring(0, 16)

    this.startDate = {
      time: this.value ? this.value : date
    }

    this.updateInput()
  },
  data: () => ({
    startDate: {
      time: ''
    },
    option: {
      type: 'min',
      week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      format: `YYYY-MM-DD HH:mm`,
      inputClass: 'form-control',
      color: {
        checked: '#F50057',
        header: '#423799',
        headerText: '#fff'
      },
      buttons: {
        ok: 'Ok',
        cancel: 'Cancel'
      },
      overlayOpacity: 0.5, // 0.5 as default
      dismissible: true // as true as default
    }
  }),
  methods: {
    updateInput () {
      const value = this.startDate.time !== '' ? new Date(this.startDate.time).toISOString() : ''
      this.$emit('input', value)
    }
  },
  watch: {
    'startDate.time' () {
      this.updateInput()
      return this.startDate.time
    }
  },
  components: {
    DatePicker
  }
}
</script>
