<template>
  <v-table
    :width="800"
    :columns="columns"
    :table-data="tableData"
    :show-vertical-border="true"
    :title-bg-color = "'#7ef8fc'"
    :title-row-height ="30"
    :border="1"
    :row-click = "raceDetail"
  ></v-table>
</template>

<script>
import 'vue-easytable/libs/themes-base/index.css'
import {VTable,VPagination} from 'vue-easytable'
import Vue from "vue"
import moment from 'moment'
import { db } from '../../firebase'
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
export default {
  name: 'race-table-list',
  data: () => ({
    pastRaces: [],
    tableData: [],
    columns: [],
    weekdays : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    totalRunner:null
  }),
  props: {
    races: {
      type: Array,
      required: true
    },
    messageEmptyList: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false
    }
  },
  methods: {
    getRacesInfo () {
        const pastRuns = this.races.map((race) => {
          let totalRunner = 0

          db.ref(`/racers/${race.id}/runners`)
            .on('value', (runnersFirebase) => {

              const runnersObject = runnersFirebase.val()

              if (runnersObject) {
                totalRunner = Object.keys(runnersObject).length
              }
            })

          return {
            id: race.id,
            duration: race.duration,
            name: race.name,
            trainerName: race.trainer.firstName,
            date: moment(race.date).format('YYYY/MM/DD'),
            day: this.weekdays[moment(race.date).day()],
            startTime: moment(race.startDate).format('h:mm A'),
            totalRunner: totalRunner
          }
        })


        this.tableData = pastRuns

        this.columns = [
                {field: "date", title:'Date', width: 100, titleAlign: 'center',columnAlign:'center'},
                {field: "day", title:'Day', width: 100, titleAlign: 'center',columnAlign:'center'},
                {field: "startTime", title:'Start Time', width: 100, titleAlign: 'center',columnAlign:'center'},
                {field: "name", title:'Name', width: 190, titleAlign: 'center',columnAlign:'center'},
                {field: "duration", title:'Duration min', width: 90, titleAlign: 'center',columnAlign:'center'},
                {field: "totalRunner", title:'Total Runners', width: 100, titleAlign: 'center',columnAlign:'center'},
                {field: "trainerName", title:'Trainer', width: 120, titleAlign: 'center',columnAlign:'center'}
              ]
    },
   raceDetail(newValue,raceData){
              this.$router.push({
                   name: 'past-run',
                   params: { pastRun: true, raceId: raceData.id }
                })
            }
  },
  created () {
  this.getRacesInfo()
  },
  watch: {
    races (){
      this.getRacesInfo()
    }
  }
}
</script>
