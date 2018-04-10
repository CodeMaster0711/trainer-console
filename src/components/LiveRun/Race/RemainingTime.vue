<template>
  <div class="timers">
    <div class="past-time">
      <div id="timerset">Past Time</div>
      <div id="timerset bottom"><span>{{ pastTime }}</span></div>
    </div>
    <div class="remaining-time">
      <div class="title">Remaining Time</div>
      <div class="time">{{ remainingTime }}</div>
    </div>
  </div>
</template>

<script>
  import {
    db
  } from '../../../firebase'
  import {
    mapGetters
  } from 'vuex'
  
  export default {
    name: 'remaining-time',
    data: () => ({
      remainingTime: '00:00:00',
      pastTime: '00:00:00', 
    }),
    computed: mapGetters({
      race: 'Race/race'
    }),
    methods: {
      initialize() {
        if (this.race.duration) {
          this.remainingTime = this.convertHoursToHuman(this.race.duration * 60)
        }
  
        this.listenStartTimeFirebase()
      },
      convertHoursToHuman(secondsToConvert) {
        let hours = Math.floor((secondsToConvert % 86400) / 3600)
        let minutes = Math.floor((secondsToConvert % 86400) % 3600 / 60)
        let seconds = secondsToConvert % 60 < 10 ? `0${secondsToConvert % 60}` : secondsToConvert % 60
  
        hours = hours < 10 ? `0${hours}` : hours
        minutes = minutes < 10 ? `0${minutes}` : minutes
  
        return `${hours}:${minutes}:${seconds}`
      },
      listenStartTimeFirebase() {
        db.ref(`/racers/${this.$route.params.raceId}`)
          .on('value', (snapshot) => {
            const race = snapshot.val()
  
            if (race && race.startDateTime && race.status === 'running' && (race.currentTime === undefined || race.currentTime >= 1)) {
              this.startCountDown(race.startDateTime)
            } else if ((race && race.status === 'finished') || (race && race.status === 'running' && race.currentTime <= 0)) {
              this.remainingTime = this.convertHoursToHuman(0)
            }
          })
      },
      startCountDown(startDateTime) {
        if (this.race.duration) {
          const then = startDateTime + (this.race.duration * 60) * 1000
  
          setTimeout(() => {
            const seconds = Math.round((then - Date.now()) / 1000)
  
            if (seconds <= 0) {
              this.remainingTime = this.convertHoursToHuman(0)
            }
  
            db.ref(`/racers/${this.$route.params.raceId}`)
              .update({
                'currentTime': seconds
              })
              .then(() => {
                this.remainingTime = this.convertHoursToHuman(seconds)
                this.pastTime = this.convertHoursToHuman(this.race.duration * 60 - seconds)             
              })
          }, 1000)
        }
      }
    },
    watch: {
      race() {
        this.remainingTime = this.convertHoursToHuman(this.race.duration * 60)
        this.listenStartTimeFirebase()
      }
    },
    created() {
      this.initialize()
    }
  }
</script>
