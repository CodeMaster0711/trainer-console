<template>
  <header>
    <div class="flex live-run" v-if="!this.$props.isPastRun">
      <h1 class="title">LIVE RUN</h1>
      <label id="Runner">Runners Waiting 73</label>
      <div class="actions" v-if="Object.keys(race).length >= 0">
        <div id="app-buttons">
          <button id="Standby" :disabled="CurrentRaceStatus!=2" class="btn btn--primary" @click="showQuestionModalNow()">StandBy</button>
          <button id="live-button" class="btn btn--primary" @click="startLive" :disabled="CurrentRaceStatus!=3">Start Live</button>
          <button id="StartRun" class="btn btn--primary" @click="startRace" :disabled="CurrentRaceStatus!=4">Start Run</button>
          <button id="FinishRun" class="btn btn--primary" :disabled="CurrentRaceStatus!=5" @click="finishRace">Finish Run</button>
          <button id="live-button" class="btn btn--primary" @click="finishLive" :disabled="CurrentRaceStatus!=6">Finish Live</button>
        </div>
        <div id="BuyNow" style="display:none">
          <a href="http://google.com">
            <p style="text-align:center; font-size:26px;">Buy Now!</p>
          </a>
        </div>
        <div class="headertimers">
          <remaining-time></remaining-time>
        </div>
      </div>
    </div>
     <router-link to="/admin/past-run" v-if="this.$props.isPastRun">&#x21A9; Back</router-link>
    <div class="flex">
     
      <div class="description">
        <div class="name">{{ race.name }} with {{ trainer.firstName }} {{ trainer.lastName }}</div>
        <span id="date">{{ race.description }}</span>
      </div>
    </div>
    <race-question :show="showQuestionModal"></race-question>

    <span id="date">{{race.date | date}}</span>
  </header>
</template>

<script>
  var RaceStatus = {
    "New": 1,
    "Standby": 2,
    "Live": 3,
    "StartRun": 4,
    "FinishRun": 5,
    "FinishLive": 6,
    "Ended": 7
  }

  let dialogOptions = {
    html: false, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
    loader: false, // set to true if you want the dailog to show a loader after click on "proceed"
    reverse: false, // switch the button positions (left to right, and vise versa)
    cancelText: 'No',
    okText: 'Yes',
    animation: 'zoom', // Available: "zoom", "bounce", "fade"
    type: 'basic', // coming soon: 'soft', 'hard'
    verification: 'continue', // for hard confirm, user will be prompted to type this to enable the proceed button
    clicksCount: 3,
    animation: 'bounce', // for soft confirm, user will be asked to click on "proceed" btn 3 times before actually proceeding
  }

  import Pace from '@/utils/calculation/Pace'
  import RaceResumeService from '@/services/raceResume'
  import RemainingTime from './RemainingTime'
  import RaceQuestion from './Question'
  import Vue from "vue"
  import VuejsDialog from "vuejs-dialog"

  // Tell Vue to install the plugin.
  Vue.use(VuejsDialog)

  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import {
    db
  } from '../../../firebase'
  import {project, descend, prop, sort} from 'ramda'
  import axios from 'axios'
  import RunnersByRaceService from '../../../services/runnersByRace'
  let intervalPace = null
  let runnersFirebase = []
  export default {
    name: 'race-header',
    data: () => ({
      textActionButton: '',
      textLiveButton: '',
      statusLive: false,
      raceFirebase: {},
      loadingUpdate: false,
      el: '#app',
      due: '2017-01-01',
      mydate: new Date(),
      showModal: false,
      remainingTime: '00:00:00',
      startDate: Date.now,
      counter: 0,
      my_timer: 0,
      showQuestionModal: false,
      // raceIsStarted: false, //FOR BUTTON STATES - ENABLE/DISABLE
      // raceIsLive: false, //FOR BUTTON STATES - ENABLE/DISABLE
      // raceInStandby: false,
      CurrentRaceStatus: 2
    }),
    props:{
      isPastRun:Boolean
    },
    computed: mapGetters({
      race: 'Race/race',
      trainer: 'Trainer/trainer',
      //runner:'Runners/runners',
      template: '#modal-template',
      runners: 'Race/runners'
      // template: '#bs-modal'
    }),
    firebase: {
      racers: db.ref('racers')
    },
    methods: {
      // isFinishLiveDisabled(){
      //   if(!this.raceIsStarted)
      //     return true
      //   if(this.raceIsStarted || this.raceIsLive || this.raceInStandby)
      //     return true
      // },
      // getFinishStatus() {
      //   if (this.raceIsStarted) {
      //     return false
      //   } else if (this.raceInStandby || this.raceIsLive) {
      //     return true
      //   } else
      //     return true
      // },
      showQuestionModalNow() {
        this.showQuestionModal = true
      },
      initialize() {
        this.$on('closed', () => { //WHEN MODAL IS CLOSED
          this.showQuestionModal = false
          this.CurrentRaceStatus = RaceStatus.Live
        })
      },

      //FUNCTION TO START THE RUN/RACE
      startRace() {
        let race = {
          status: 'running',
          runners: [],
          // raceResumeId: '' //THIS CAUSES FIREBASE TO LOSE THE ID ON RACE RESUME
        }
        this.$dialog.confirm("Are you sure you want to Start Run now?", dialogOptions)
          .then((dialog) => {
            this.textActionButton = 'Starting...'
            this.loadingUpdate = true
            this.$firebaseRefs.racers.child(this.$route.params.raceId).update({
              'status': 'running'
            })
                return this.$store
                  .dispatch('Race/start', this.$route.params.raceId)
                  .then(() => {
                    const raceResume = {
                      totalAmountRunners: this.runners.length,
                      startDate: new Date().toISOString(),
                      race: this.race
                    }
                    return this.createRaceResume(raceResume)
                  })
                  .then((raceResumeResult) => {
                    this.$firebaseRefs.racers.child(this.$route.params.raceId).update({
                      'raceResumeId': raceResumeResult.body.id,
                      'startDateTime': Date.now(),
                    })
                     
                  })
                  .then(() => {
                    this.loadingUpdate = false
                    this.textActionButton = 'Finish Race'
                    this.CurrentRaceStatus = RaceStatus.FinishRun
                  })

          })
          .catch(() => {
            // Triggered when cancel button is clicked
            console.log('Start Run aborted')
          })
      },
      //FUNCTION USED TO END/FINISH THE RACE/RUN
      finishRace() {
        this.$dialog.confirm("Are you sure?", dialogOptions)
          .then((dialog) => {
            let _this = this
            this.$firebaseRefs.racers.child(this.$route.params.raceId).update({
              'status': 'finished'
            })
            let raceResumeId = this.raceFirebase.raceResumeId
            let that = this
            return RaceResumeService.get(raceResumeId)
              .then(({
                data
              }) => {
                    const raceResume = {
                      id: data.id,
                      finishDate: new Date().toISOString(),
                      startDate: data.startDate,
                      race: data.race,
                      totalAmountRunners: this.runnersFirebase.length                     
                    }
                RaceResumeService.update(raceResume)
                  .then(() => {
                    this.$firebaseRefs.racers.child(this.$route.params.raceId).update({
                      'status': 'finished'
                    })
                    this.textActionButton = 'Finishing...'
                    this.loadingUpdate = true
                    return this.$store
                      .dispatch('Race/finish', this.$route.params.raceId)
                      .then(() => {
                        // this.$router.push({
                        //   path: `/admin/live-run/race/${this.$route.params.raceId}/resume`
                        // })
                        this.loadingUpdate = false
                        this.textActionButton = 'Finish Race'
                      })
                  })
                //UPDATE BUTTONS
                this.CurrentRaceStatus = RaceStatus.FinishLive
              })
              .catch(function(error) {
                // This will be triggered when user clicks on cancel
                console.log(error)
                console.log('We are not able to find raceresume Id Still we are trying to finish the current race!')
                that.CurrentRaceStatus = RaceStatus.FinishLive
              })
          })
      },

      resetTimer() {
        clearInterval(this.my_timer)
      },
      timerFormat(timer) {
        return timer > 9 ? timer : '0' + timer
      },
      startLive() {
        this.$dialog.confirm("Are you sure you want to Start Live now?", dialogOptions)
          .then((dialog) => {
            this.$firebaseRefs.racers.child(this.$route.params.raceId).update({
              'statusLive': 'started'
            })
       
            this.CurrentRaceStatus = RaceStatus.StartRun
            // this.raceIsLive = true
            // this.raceIsStarted = false
            // this.raceInStandby = false
            this.$store.dispatch("Race/startLive")
            setTimeout(() => {
              console.log('Start Live Continue.')
            }, 100)
          })
          .catch(() => {
            // Triggered when cancel button is clicked
            console.log('Start Live aborted.')
          })
      },

      finishLive() {
        this.$firebaseRefs.racers.child(this.$route.params.raceId).update({
          'statusLive': 'finished'
        })
        this.$store.dispatch("Race/stopLive")
        this.CurrentRaceStatus = RaceStatus.Ended
      },
      updateButtons() {

        let status = this.raceFirebase.status
        if (status === "running") {
          this.CurrentRaceStatus = RaceStatus.FinishRun
        }
      },
     
      handleClickLiveButton() {
        this[this.getFunctionLiveButton()]()
      },
      ...mapActions({
        createRaceResume: 'RaceResume/createOne'
      })
    },
    watch: {
      race() {
         db.ref(`/racers/${this.$route.params.raceId}/runners`)
        .on('value', (runnersFirebase) => {
          if (runnersFirebase.val()) {
            const runners = []
            const snap = runnersFirebase.val()
            Object.keys(snap).forEach((key) => {
              snap[key].id = key
              runners.push(snap[key])
            })
            this.runnersFirebase = runners
          }
       })
      },
      raceFirebase() {
        this.updateButtons()
      },
      CurrentRaceStatus() {
      },

    },
    created() {
      this.initialize()
      this.$bindAsObject('raceFirebase', db.ref(`/racers/${this.$route.params.raceId}`))
      db.ref(`/racers/${this.$route.params.raceId}/runners`)
        .on('value', (runnersFirebase) => {
          if (runnersFirebase.val()) {
            const runners = []
            const snap = runnersFirebase.val()
            Object.keys(snap).forEach((key) => {
              snap[key].id = key
              runners.push(snap[key])
            })
            this.runnersFirebase = runners
          }
      })
    },
    components: {
      RemainingTime,
      RaceQuestion
    }
  }
</script>
