<template>
  <container>
    <div class="live-run__content only-flex">
      <race-header  :isPastRun = "this.$props.pastRun"></race-header>
      <runners-table></runners-table>
      <edit-runner v-if = "this.$route.query.openhood == 1"></edit-runner>
      <runners></runners>
      <trainer-notes></trainer-notes>
      <infos></infos>
    </div>
  </container>
</template>

<script>
import Container from '@/components/Container'
import RaceHeader from '@/components/LiveRun/Race/Header'
import Runners from '@/components/LiveRun/Race/Runners'
import TrainerNotes from '@/components/LiveRun/Race/TrainerNotes'
import Infos from '@/components/LiveRun/Race/Infos'
import RunnersTable from '@/components/LiveRun/Race/RunnersTable'
import EditRunner from '@/components/LiveRun/Race/EditRunner'
import Vue from "vue"
export default {
  name: 'race',
  created () {
    Vue.prototype.$inProgress = false
    this.$store.dispatch('Race/get', this.$route.params.raceId)
  },
  props: ['pastRun'],
  components: {
    Container,
    RaceHeader,
    Runners,
    TrainerNotes,
    Infos,
    RunnersTable,
    EditRunner
  }
}
</script>
