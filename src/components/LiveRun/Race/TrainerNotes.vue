<template>
  <div class="trainers-notes" v-if="update">
    <box>
      <box-header :title="!saving ? `TRAINER'S NOTES` : `TRAINER'S NOTES - SAVING...`"></box-header>
      <box-content>
        <div class="form__group">
          <textarea v-model="update.note" :disabled="saving" class="form-control form-control--no-border" placeholder="Type here...">
          </textarea>
        </div>
      </box-content>
    </box>
  </div>
</template>

<script>
import Box from '@/components/Box/Box'
import BoxHeader from '@/components/Box/BoxHeader'
import BoxContent from '@/components/Box/BoxContent'
import { mapGetters, mapActions } from 'vuex'

let timer = null

export default {
  name: 'race-trainer-notes',
  data: () => ({
    update: null,
    saving: false,
    firstTime: true
  }),
  computed: mapGetters({
    race: 'Race/race'
  }),
  methods: {
    ...mapActions({
      updateNote: 'Race/updateNote'
    })
  },
  watch: {
    race () {
      this.update = {
        id: this.race.id,
        note: this.race.notes
      }
    },
    'update.note' () {
      if (this.firstTime === false) {
        clearTimeout(timer)

        timer = setTimeout(() => {
          this.saving = true

          this.updateNote(this.update)
            .then(() => {
              this.saving = false
            })
            .catch(() => {
              this.saving = false
            })
        }, 1500)
      }

      this.firstTime = false

      return this.update.note
    }
  },
  components: {
    Box,
    BoxHeader,
    BoxContent
  }
}
</script>
