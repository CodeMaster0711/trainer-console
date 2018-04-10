<template>
<div>
  <container>
    <div class="info">
      <router-link to="/admin/past-run">&#x21A9; Back</router-link>

      <div class="date">
        {{ startedDate }}
      </div>

      <div class="race-name">
        {{ race.name }}
      </div>

      <div class="trainer-name">
        {{ trainerName }}
      </div>
    </div>

    <v-table
      :width="485"
      :columns="columns"
      :table-data="tableData"
      :show-vertical-border="true"
      :odd-bg-color = "'#cfe2f3'"
      :title-row-height ="50"
      :border="1"
    ></v-table>
  </container>
</div>
</template>

<script>
import 'vue-easytable/libs/themes-base/index.css'
import Container from '@/components/Container'
import {VTable,VPagination} from 'vue-easytable'
import Vue from "vue"
import moment from 'moment'
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
import { mapGetters } from 'vuex'
import { db } from '../../../firebase'
import { sortBy, prop, groupBy, map, merge, find, propEq} from 'ramda'

export default {
  name: 'race-detail',
  computed: {
    ...mapGetters({
      race: 'Race/race',
      runners: 'Race/runners',
    }),
    startedDate () {
      return moment(this.race.startDate).format('YYYY/MM/DD')
    },
    trainerName (){
      if(this.race.trainer!= undefined){
           return this.race.trainer.firstName + this.race.trainer.lastName 
      }     
    }
  },
  data: () => ({
    tableData: [],
    columns: [],
  }),
  methods: {
    initialize(){
      this.columns = [
        {field: "position", title:'Rank', width: 90, titleAlign: 'center',columnAlign:'center'},
        {field: "firstName", title:'Runner Name', width: 95, titleAlign: 'center',columnAlign:'center'},
        {field: "id", title:'Runner Id', width: 90, titleAlign: 'center',columnAlign:'center'},
        {field: "lastName", title:'Location', width: 120, titleAlign: 'center',columnAlign:'center'},
        {field: "distance", title:'distance/KM', width: 90, titleAlign: 'center',columnAlign:'center'}
      ]

      db.ref(`/racers/${this.$route.params.raceId}`).on('value', (race)=>{
        if(race.val()){
          const runnersObject = race.val().runners  
          let fbrunners = Object.keys(runnersObject).map((idRunner) => {
            const runnerDistance = parseFloat(runnersObject[idRunner].distance).toFixed(2)
              
            return {
              id:idRunner,
              position: runnersObject[idRunner].position,
              name: runnersObject[idRunner].name,
              distance: (runnerDistance / 1000).toFixed(2)
            }
          })  
          const sortByPosition = sortBy(prop('position'))    
          let finalRunners = []
          for (var i = 0; i < this.runners.length; i++) {
                    var runnerId = this.runners[i].id
                    let fbRunner = fbrunners.filter(runner => runner.id == runnerId)
                    var finalRunner = this.runners[i]
                        finalRunner = merge(this.runners[i], fbRunner[0])
                    finalRunners.push(finalRunner)

          }
          this.tableData = sortByPosition(finalRunners)

        }
      })
    }
  },

 created () {
    
    this.$store.dispatch('Race/get', this.$route.params.raceId)
    this.$store.dispatch('Race/getRunners', this.$route.params.raceId)
    setTimeout(() => {
    this.initialize()
            }, 1000)

  },
  components: {
    Container
  }
}
</script>


<style lang="stylus" scoped>
  .info
    display flex
    flex-flow row wrap
    font-size 16px
    margin 0 0 15px

    a, div
      margin 0 15px 0 0
</style>
