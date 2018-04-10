<template>
  <container>
    <race-table-list  v-if = "!this.$props.pastRun" subtitle="finished" :races="racesFinished" message-empty-list="There's no finished races" type="resume"></race-table-list>
     <div class="live-run__content only-flex">
      <race-header v-if = "this.$props.pastRun"  :isPastRun = "this.$props.pastRun"></race-header>
      <runners-table  v-if = "this.$props.pastRun"></runners-table>
     </div>
  </container>
</template>
<script>
import Container from '@/components/Container'
import RaceList from '@/components/Race/RaceList'
import RaceTableList from '@/components/Race/RaceTableList'
import RaceHeader from '@/components/LiveRun/Race/Header'
import { mapActions, mapGetters } from 'vuex'
import RunnersTable from '@/components/LiveRun/Race/RunnersTable'
export default {
  name: 'past-run',
  props: ['pastRun'],
  data () {
    return {
      racesFinished: []
    }
   
  },
  computed: {
    ...mapGetters({
      trainer: 'Trainer/trainer',
      races: 'RacesByTrainer/races',
    })
  },
 
  methods: {
    initialize () {
      this.addTaskToQueue('getTrainer')
      this.addTaskToQueue('getRacesByTrainer')

      this.getTrainer(this.$auth.user().id)
        .then(() => {
          this.removeTaskFromQueue('getTrainer')
        })
    },
    getRaces () {
      this.getRacesByTrainer(this.trainer.id)
        .then(() => {
          this.removeTaskFromQueue('getRacesByTrainer')
        })
    },
    setRacesFinished () {
      this.racesFinished = this.races.filter((race) => race.finishDate !== null)
    },
    ...mapActions({
      getTrainer: 'Trainer/get',
      getRacesByTrainer: 'RacesByTrainer/get',
      addTaskToQueue: 'LoadingQueue/addTaskToQueue',
      removeTaskFromQueue: 'LoadingQueue/removeTaskFromQueue'
    })
  },
  created () {
    this.initialize()
  },
  watch: {
    trainer () {
      this.getRaces()
    },
    races () {
      this.setRacesFinished()
    }
  },
  components: {
    RaceList,
    Container,
    RaceHeader,
    RaceTableList,
    RunnersTable
  }
}
</script>
