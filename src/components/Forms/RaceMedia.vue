<template>
  <div class="form__group">
    <label :for="name" v-if="label">{{ label }}: <span class="required" v-if="required">*</span></label>
    <input type="file" :id="name" :name="name" @change="changeFileHandle" :required="required" class="form-control" :class="{'is-danger': hasError }" accept=".mp3,audio/*">
    <span class="help is-danger" v-if="hasError">{{ errorMessage }}</span>
  </div>
</template>

<script>
import service from '@/services/index'
import { mapActions } from 'vuex'

const resource = service.resource('races/upload-audio-file')

export default {
  name: 'uploadField',
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
  data: () => ({
    input: ''
  }),
  methods: {
    changeFileHandle (e) {
      const originalFile = e.target.files[0]

      const file = new FormData()
      file.append('file', originalFile)

      this.addTaskToQueue('saveRaceMedia')
      resource.save(file)
        .then(({ body }) => {
          this.$emit('input', body.url)

          this.removeTaskFromQueue('saveRaceMedia')
        })
    },
    ...mapActions({
      addTaskToQueue: 'LoadingQueue/addTaskToQueue',
      removeTaskFromQueue: 'LoadingQueue/removeTaskFromQueue'
    })
  }
}
</script>
