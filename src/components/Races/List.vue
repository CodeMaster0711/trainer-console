<template>
  <container>
    <race-header title="Races" class="new-races-top">
      <router-link to="/admin/races/add" class="btn btn--primary" id="newrace" slot="actions">+ New Race</router-link>
    </race-header>
    <table class="table table--full">
      <thead>
        <tr>
          <th align="left">Name</th>
          <th align="left">Description</th>
          <th align="left">Duration</th>
          <th align="left">Status</th>
          <th align="left">Type</th>
          <th align="left" colspan="3">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="race in races" :key="race.id">
          <td>{{race.name}}</td>
          <td>{{race.description}}</td>
          <td width="250px">{{race.duration}} minutes</td>
          <td width="150px">{{getStatusRace(race)}}</td>
          <td width="100px">{{race.type}}</td>
          <td width="250px">{{race.date | date}}</td>

          <td width="57px" v-show="activeRaceId!=race.id ||activeRaceId==0">
            <router-link :to="{ path:`/admin/races/edit/${race.id}` }" class="btn btn--primary btn--block" v-if="race.startDate === null">Edit</router-link>
          </td>
          <td width="100px" v-show="activeRaceId!=race.id ">
            <button id="delete2" class="btn btn--danger btn--block"  v-on:click="handleDelete(race)">Delete</button>
          </td>
          <td colspan="2" class="confirm-container" v-show="deleteMode" width="183px">
            <div class="confirmation">
              <span v-if="activeRaceId==race.id">
           <label>Sure?</label>
          <button  class="btn btn--primary " v-on:click="deleteRaceSelected(race,event)">Yes</button>
          <button  v-on:click="Clear"  class="btn btn-xs btn-danger">No</button>
  </span>

            </div>

          </td>
        </tr>


      </tbody>

    </table>

  </container>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import Container from '@/components/Container'
  import RaceHeader from '@/components/Race/Header'

  export default {
    name: 'races',
    data: () => ({
      // activeClass: 'active',
      deleteMode: false,
      activeRaceId: 0,
      delete: true
    }),
    computed: mapGetters({
      trainer: 'Trainer/trainer',
      races: 'RacesByTrainer/scheduleraces'
    }),
    methods: {
      initialize() {
        this.addTaskToQueue('getTrainer')
        this.addTaskToQueue('getRacesByTrainer')

        this.getTrainer(this.$auth.user().id)
          .then(() => {
            this.removeTaskFromQueue('getTrainer')
          })
      },
      getRaces() {
        return this.getRacesByTrainer(this.trainer.id)
          .then(() => {
            this.removeTaskFromQueue('getRacesByTrainer')
          })
      },
      Clear(race) {
        this.activeRaceId = race.id
        this.deleteMode = false

      },
      handleDelete(race) {
        this.activeRaceId = race.id
        this.deleteMode = true

        //this.delete2[race.id] = true
        //delete2[race.id].removeAttribute('disabled', true)
        //var retVal = confirm("Are you sure you want to delete ?")
        // if( retVal == true ){
        //     alert("User wants to delete!")
        //     this.deleteRace(race)
        //     .then(this.getRaces)
        //     .then(() => this.loadingDelete(event.target, false))
        //     .catch(() => this.loadingDelete(event.target, false))
        // }
        // else{
        //     alert ("User does not want to delete!")
        // }
      },
      deleteRaceSelected(race, event) {
        this.deleteRace(race)
          .then(this.getRaces)
          .then(() => this.loadingDelete(event.target, false))
          .catch(() => this.loadingDelete(event.target, false))
        this.deleteMode = false
      },
      ...mapActions({
        getTrainer: 'Trainer/get',
        deleteRace: 'Race/deleteOne',
        getRacesByTrainer: 'RacesByTrainer/get',
        addTaskToQueue: 'LoadingQueue/addTaskToQueue',
        removeTaskFromQueue: 'LoadingQueue/removeTaskFromQueue'
      }),
      loadingDelete(target, active = true) {
        const btn = target

        btn.disabled = active
        btn.innerHTML = active ? 'Deleting...' : 'Delete'
      },
      getStatusRace(race) {
        if (race.startDate === null && race.finishDate === null) {
          return 'to start'
        } else if (race.startDate !== null && race.finishDate === null) {
          return 'in progress'
        } else if (race.startDate !== null && race.finishDate !== null) {
          return 'finished'
        }
      }
    },
    created() {
      this.initialize()
    },
    watch: {
      trainer() {
        this.getRaces()
      }
    },
    components: {
      Container,
      RaceHeader

    }
  }
</script>
