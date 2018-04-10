<template>
  <div class="runners">
    <box>
      <box-header :title="`RUNNERS (${runners.length})`"></box-header>
      <box-content>
        <runners-list :runners="runners"></runners-list>
      </box-content>
    </box>
  </div>
</template>

<script>
import Box from '@/components/Box/Box'
import BoxHeader from '@/components/Box/BoxHeader'
import BoxContent from '@/components/Box/BoxContent'
import RunnersList from '@/components/Runners/RunnersResumeList'
import {db} from '../../../firebase'
import {project, descend, prop, sort} from 'ramda'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'race-runners',
  data: () => ({
    runners: [],
    runnersFirebase: []
  }),
  computed: mapGetters({
    race: 'Race/race'
  }),
  methods: {
    getRunners () {
      this.addTaskToQueue('getRunnersFirebase')

      db.ref(`/racers/${this.$route.params.raceId}/runners`)
        .on('value', (runnersFirebase) => {
          if (runnersFirebase.val()) {
            const runners = []

            const snap = runnersFirebase.val()

            Object.keys(snap).forEach((key) => {
              runners.push(snap[key])
            })
            this.runnersFirebase = runners
          }
          this.removeTaskFromQueue('getRunnersFirebase')
        })
    },
    ...mapActions({
      addTaskToQueue: 'LoadingQueue/addTaskToQueue',
      removeTaskFromQueue: 'LoadingQueue/removeTaskFromQueue'
    })
  },
  watch: {
    race () {
      this.$store.dispatch('Race/getRunners', this.$route.params.raceId)
    },
    runnersFirebase () {
      const runners = project(['distance', 'name', 'speed', 'time'], this.runnersFirebase)
      const byDistance = descend(prop('distance'))

      const runnersSortByDistance = sort(byDistance, runners)

      this.runners = runnersSortByDistance
    }
  },
  created () {
    this.getRunners()
  },
  components: {
    Box,
    BoxHeader,
    BoxContent,
    RunnersList
  }
}
</script>
