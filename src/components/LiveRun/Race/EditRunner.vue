<template>
  <container> 
   <custom-form >
     <div class="form__group">
      <label for="duration">Runner Id:</label>
      <input v-validate data-vv-rules="required" :class="{'form-control': true,  'is-danger': errors.has('id') }" type="number" ref="id" name="id" v-model="runner.id" style="width:10%" required>
         <span v-show="errors.has('id')" class="help is-danger">Fill in the Id</span>
      <button  :disabled='!runner.id' class="btn btn--primary" @click.prevent="addRunner()">Add</button>
      <button  :disabled='!runner.id' class="btn btn--danger" @click.prevent="removeRunner()">Remove</button>
     </div>
    </custom-form >
  </container>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  // Tell Vue to install the plugin.
  import Vue from "vue"
  import VuejsDialog from "vuejs-dialog"
  Vue.use(VuejsDialog)
  import Container from '@/components/Container'
  import CustomForm from '@/components/Forms/Form'
  import TextField from '@/components/Forms/TextField'
  import IntegerField from '@/components/Forms/IntegerField'
  import RunnersByRaceService from '../../../services/runnersByRace'
  import RunnersTable from '@/components/LiveRun/Race/RunnersTable'
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
  //  isComplete = boolean
  export default {
    name: 'edit-runner',
    mixins: [
        RunnersTable
    ],
    data: () => ({
      runner: {
        id: ''
      }
    }),
    computed: {
      ...mapGetters({
        trainer: 'Trainer/trainer'
      })
    },
    methods: {
      addRunner () {
        let that = this
        this.$dialog.confirm("Are you sure you want to Add Runner?", dialogOptions)
            .then((dialog) => {
                RunnersByRaceService.add(this.$refs.id.value,this.$route.params.raceId).then((response) => {
                  that.getRunnerData(this.$route.params.raceId)
                })
            })
      },
      removeRunner () {
        let that = this
        this.$dialog.confirm("Are you sure you want to Remove Runner?", dialogOptions)
            .then((dialog) => {
                RunnersByRaceService.remove(this.$refs.id.value,this.$route.params.raceId).then((response) => {
                  that.getRunnerData(this.$route.params.raceId)
                })
            })
      },

      ...mapActions({
        createRace: 'Race/createOne'
      })
    },
    components: {
      Container,
      CustomForm,
      TextField,
      IntegerField,
      RunnersTable
    }
  }
</script>
