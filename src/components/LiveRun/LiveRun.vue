<template>
  <container>
  <header class="live-run-inner">
    <race-list subtitle="in progress" :races="racesInProgress" v-if="racesInProgress.length !== 0"></race-list>
    <race-list subtitle="to start" :races="racesToStart" message-empty-list="You don't have upcoming races."></race-list>
   </header>
  </container>
</template>

<script>
import Container from '@/components/Container'
import RaceList from '@/components/Race/RaceList'
import RaceHeader from '@/components/Race/Header'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'live-run',
  data () {
    return {
      racesInProgress: [],
      racesToStart: []
    }
  },
  computed: {
    ...mapGetters({
      trainer: 'Trainer/trainer',
      races: 'RacesByTrainer/races'
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
    setRacesInProgress () {
      this.racesInProgress = this.races.filter((race) => race.startDate !== null && race.finishDate === null)
    },
    setRacesToStart () {
      this.racesToStart = this.races.filter((race) => race.startDate === null && race.finishDate === null)
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
      this.setRacesInProgress()
      this.setRacesToStart()
    }
  },
  components: {
    RaceList,
    Container,
    RaceHeader
  }
}
</script>
