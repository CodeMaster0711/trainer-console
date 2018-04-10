<template>
  <container>
    <race-header title="Update Race">
    </race-header>

    <custom-form :handle-submit="handleSubmit" v-if="update">
      <text-field v-model="update.name" label="Name" name="name" v-validate="'required'" data-vv-value-path="input" data-vv-name="name" error-message="Fill in the name" :has-error=" errors.has('name')" :required="true"></text-field>



   <div class="form__group">
          <label for="description">Description <span class="required">*</span></label>
          <input v-validate data-vv-rules="required" :class="{'form-control': true, 'is-danger': errors.has('description') }" type="text" maxlength="50" name="description" v-model="update.description" required>
        </div>

      <date-time-field v-model="update.date" :label="`Date - ${getTimezone()}`" name="date" v-validate="'required'" data-vv-value-path="startDate.time" data-vv-name="date" error-message="Fill in the date" :has-error=" errors.has('date')" :required="true"></date-time-field>


    <div class="form__group">
          <label for="duration">Duration(in minutes):</label>
          <input v-validate data-vv-rules="required" :class="{'form-control': true,  'is-danger': errors.has('duration') }" type="number" step="1"  min=1  max=max_duration  name="duration" v-model="update.duration" required>
          <span v-show="errors.has('duration')" class="help is-danger">Fill in the duration</span>
        </div>
     <div class="form__group">
        <label for="type">Type:</label>
          <select v-model="update.type" label="Type" name="type" >
                                <option>LIVE</option>
                                <option>SOLO</option>                 
          </select>
      </div>
      <div>
        <div v-if="update.audioFileUrl != ''">
          <p>Current audio race:</p>
          <audio controls>
            <source :src="update.audioFileUrl">
          </audio>   
        </div>
        <race-media v-if="update.type == 'SOLO'" v-model="race.audioFileUrl" label="MP3" name="media" data-vv-value-path="input" data-vv-name="media" error-message="Fill in the audio" :has-error=" errors.has('media')" ></race-media>
      </div>
       
      <div>
        <div v-if="update.imageUrl != ''">
          <p>Current photo race:</p>
          <img :src="update.imageUrl" width="200px">
        </div>
        <race-photo v-model="update.imageUrl" label="Photo" name="photo"></race-photo>
      </div>



      <button class="btn btn--primary" id="submit-form">Update Race</button>
    </custom-form>
  </container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Container from '@/components/Container'
import RaceHeader from '@/components/Race/Header'
import CustomForm from '@/components/Forms/Form'
import TextField from '@/components/Forms/TextField'
import IntegerField from '@/components/Forms/IntegerField'
import DateTimeField from '@/components/Forms/DateTimeField'
import RacePhoto from '@/components/Forms/RacePhoto'
import RaceMedia from '@/components/Forms/RaceMedia'
import {pick} from 'ramda'

export default {
  name: 'UpdateRace',
  data: () => ({
    update: null,
    upload: null
  }),
  computed: mapGetters({
    trainer: 'Trainer/trainer',
    race: 'Race/race'
  }),
  methods: {
    initialize () {
      this.getRace(this.$route.params.raceId)
    },
    handleSubmit () {
      this.$validator.validateAll()
        .then(success => {
          if (!success) {
            return
          }

          this.loadingUpdateButton()
          this.updateRace(this.update)
            .then(() => {
              this.$router.push({ path: '/admin/races' })
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
      updateRace: 'Race/updateOne',
      getRace: 'Race/get'
    }),
    loadingUpdateButton () {
      const btnUpdate = document.querySelector('#submit-form')
      btnUpdate.innerHTML = 'Updating...'
      btnUpdate.setAttribute('disabled', true)
    },
    resetUpdateButton () {
      const btnUpdate = document.querySelector('#submit-form')
      btnUpdate.innerHTML = 'Update Race'
      btnUpdate.removeAttribute('disabled', true)
    },
    getTimezone () {
      return new Date().toString().match(/([A-Z]+[+-][0-9]+.*)/)[1]
    }
  },
  created () {
    this.initialize()
  },
  watch: {
    race () {
      const race = pick(['id', 'name', 'description', 'date', 'startDate', 'finishDate', 'type', 'notes', 'imageUrl','audioFileUrl', 'schedule', 'trainer', 'duration'], this.race)
      race.date = race.date.replace('T', ' ')
      race.date = race.date.substring(0, 19)
         
      this.update = race
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
