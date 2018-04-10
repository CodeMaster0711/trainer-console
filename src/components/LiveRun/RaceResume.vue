<template>
  <container>
    <div class="live-run__content only-flex">
      <race-header></race-header>

      <runners-resume></runners-resume>

      <trainer-notes></trainer-notes>
    </div>
  </container>
</template>

<script>
import Container from '@/components/Container'
import RaceHeader from '@/components/LiveRun/Race/Header'
import RunnersResume from '@/components/LiveRun/Race/RunnersResume'
import TrainerNotes from '@/components/LiveRun/Race/TrainerNotes'
import Infos from '@/components/LiveRun/Race/Infos'
import { mapActions } from 'vuex'

export default {
  name: 'race',
  methods: {
    ...mapActions({
      getRaceById: 'Race/get',
      addTaskToQueue: 'LoadingQueue/addTaskToQueue',
      removeTaskFromQueue: 'LoadingQueue/removeTaskFromQueue'
    })
  },
  created () {
    this.addTaskToQueue('getRaceById')

    this.getRaceById(this.$route.params.raceId)
      .then(() => {
        this.removeTaskFromQueue('getRaceById')
      })
  },
  components: {
    Container,
    RaceHeader,
    RunnersResume,
    TrainerNotes,
    Infos
  }
}
</script>
