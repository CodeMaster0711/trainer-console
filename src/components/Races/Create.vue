<template>
  <container>
    <race-header title="New Race">
    </race-header>
    <custom-form :handle-submit="handleSubmit">
      <text-field v-model="race.name" label="Name" name="name" v-validate="'required'" maxlength="5"  data-vv-value-path="input" data-vv-name="name" error-message="Fill in the name" :has-error=" errors.has('name')" :required="true"></text-field>
   <div class="form__group">
          <label for="description">Description <span class="required">*</span></label>
          <input v-validate data-vv-rules="required" :class="{'form-control': true, 'is-danger': errors.has('description') }" type="text" maxlength="255" name="description" v-model="race.description" required>
          <span v-show="errors.has('description')" class="help is-danger">Fill in the description</span>
        </div>
     <field name="myintegervalue" type="integer" default="Some integer" label="Choose an integer" description="" first="1" last="10" step="1" />
      <date-time-field v-model="race.date" :label="`Date - ${getTimezone()}`" name="date" v-validate="'required'" data-vv-value-path="startDate.time" data-vv-name="date" error-message="Fill in the date" :has-error=" errors.has('date')" :required="true"></date-time-field>
      <div class="form__group">
          <label for="duration">Duration(in minutes):</label>
          <input v-validate data-vv-rules="required" :class="{'form-control': true,  'is-danger': errors.has('duration') }" type="number" step="1"  min=1  max=max_duration  name="duration" v-model="race.duration" required>
          <span v-show="errors.has('duration')" class="help is-danger">Fill in the duration</span>
        </div>
      <div class="form__group">
        <label for="type">Type:</label>
          <select v-model="race.type" label="Type" name="type" >
                                <option>LIVE</option>
                                <option>SOLO</option>                 
          </select>
      </div>
       <race-media v-if="race.type == 'SOLO'" v-model="race.audioFileUrl" label="MP3" name="media" v-validate="'required'" data-vv-value-path="input" data-vv-name="media" error-message="Fill in the audio" :has-error=" errors.has('media')" :required="true"></race-media>
      <race-photo v-model="race.imageUrl" label="Photo" name="photo" v-validate="'required'" data-vv-value-path="input" data-vv-name="photo" error-message="Fill in the photo" :has-error=" errors.has('photo')" :required="true"></race-photo>
      <button class="btn btn--primary" id="submit-form">Create Race</button>
        <race-header1>
      <router-link to="/admin/races" id="Cancel" class="btn btn--primary" >Cancel</router-link>
    </race-header1>
    </custom-form>
  </container>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import Container from '@/components/Container'
  import RaceHeader from '@/components/Race/Header'
  import CustomForm from '@/components/Forms/Form'
  import TextField from '@/components/Forms/TextField'
  import IntegerField from '@/components/Forms/IntegerField'
  import DateTimeField from '@/components/Forms/DateTimeField'
  import RacePhoto from '@/components/Forms/RacePhoto'
  import RaceMedia from '@/components/Forms/RaceMedia'
  export default {
    name: 'CreateRace',
    data: () => ({
      race: {
        name: '',
        description: '',
        notes: '',
        date: '',
        startDate: '',
        finishDate: '',
        type: 'LIVE',
        imageUrl: '',
        audioFileUrl:''
      }
    }),
    computed: {
      ...mapGetters({
        trainer: 'Trainer/trainer'
      })
    },
    methods: {
      handleSubmit() {
        this.$validator.validateAll()
          .then(success => {
            if (!success) {
              return
            }
  
            this.race.trainer = this.trainer
  
            this.loadingUpdateButton()

            this.createRace(this.race)
              .then(() => {
                this.$router.push({
                  path: '/admin/races'
                })
                this.error = ''
                this.resetUpdateButton()
              })
              .catch(() => {
                this.error = 'Failed!'
                this.resetUpdateButton()
              })
          })
      },
      ...mapActions({
        createRace: 'Race/createOne'
      }),
      loadingUpdateButton() {
        const btnUpdate = document.querySelector('#submit-form')
        btnUpdate.innerHTML = 'Creating...'
        btnUpdate.setAttribute('disabled', true)
      },
      resetUpdateButton() {
        const btnUpdate = document.querySelector('#submit-form')
        btnUpdate.innerHTML = 'Create Race'
        btnUpdate.removeAttribute('disabled', true)
      },
      getTimezone() {
        return new Date().toString().match(/([A-Z]+[+-][0-9]+.*)/)[1]
      }
    },
    components: {
      Container,
      RaceHeader,
      CustomForm,
      TextField,
      IntegerField,
      DateTimeField,
      RacePhoto,
      RaceMedia
    }
  }
</script>
