<template>

    <v-table
            :width="1200"
            :columns="columns"
            style="font-size:10.5px"
            :column-cell-class-name="columnCellClass"
            :table-data="tableData"
            :show-vertical-border="true"
            :odd-bg-color = "'#cfe2f3'"
            :title-row-height ="60"
            :border="1"
    ></v-table>
</template>

<script>
import 'vue-easytable/libs/themes-base/index.css'
import {VTable,VPagination} from 'vue-easytable'
import Vue from "vue"
import axios from 'axios'
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
var interval
import { mapGetters } from 'vuex'
import { db } from '../../../firebase'
export default {
  name: 'runners-table',
  computed: mapGetters({
    runners: 'Race/runners',
    race: 'Race/race',
    questions: 'RaceQuestion/raceQuestion'
  }),
  data: () => ({
    tableData: [],
    columns: [ {field: "rank", title:'Rank', width: 35, titleAlign: 'center',columnAlign:'center'},
                            {field: "firstName", title:'Runner Name', width: 95, titleAlign: 'center',columnAlign:'center'},
                            {field: "id", title:'ID', width: 35, titleAlign: 'center',columnAlign:'center'},
                            {field: "lastName", title:'Location', width: 120, titleAlign: 'center',columnAlign:'center'},
                            {field: "gender", title:'Sex', width: 30, titleAlign: 'center',columnAlign:'center'},
                            {field: "distance", title:'distance/KM', width: 65, titleAlign: 'center',columnAlign:'center'},
                            {field: "gap", title:'Gap to runner above', width: 85, titleAlign: 'center',columnAlign:'center'},
                            {field: "pace", title:'Current Pace(min/km)', width: 80, titleAlign: 'center',columnAlign:'center'},
                            {field: "finalAltitude", title:'Altitude Change last 5 min(m)', width: 80, titleAlign: 'center',columnAlign:'center'},
                            {field: "changeInRank", title:'Change in Rank last 5 min', width: 65, titleAlign: 'center',columnAlign:'center'},
                            {field: "totalRuns", title:'# of Completed LiveRuns', width: 65, titleAlign: 'center',columnAlign:'center'},
                            {field: "totalDistance", title:'Total LiveRuns ran(km)', width: 65, titleAlign: 'center',columnAlign:'center'},
                            {field: "dummy", title:'Last Run', width: 70, titleAlign: 'center',columnAlign:'center'},
                            {field: "daysSinceLastRun", title:'Days since last LiveRuns', width: 60, titleAlign: 'center',columnAlign:'center'},
                            {field: "questionAnswer", title:'Questionaire', width: 250, titleAlign: 'center',columnAlign:'center'}],
    firbaseRunners:{},
    oldPosition:null,
    status:null,
    isSuccess:true
  }),
  methods:{

    columnCellClass(rowIndex,columnName,rowData){
        if (!rowData.isRunning){
            return 'gray'
        }
        else{
          return ""
        }
    },
    getRunnerData(raceId){
        const AuthStr = 'Bearer '.concat(window.localStorage.getItem('default-auth-token'))
          if(this.isSuccess){
            axios.get(`http://trainerapi.liverunapp.com:3004/updateRace/`+raceId, { headers: { Authorization: AuthStr } })
              .then(response => {
                // JSON responses are automatically parsed.
                  this.isSuccess  = true              
                  this.tableData = response.data        
              })
              .catch(e => {
                this.isSuccess  = false
              })
          }
    }
  },

  created() {  
    let _this = this
    if(this.$route.params.raceId!=undefined){ 
      interval = setInterval(function(){  
          if(!_this.isSuccess){
             axios.get('http://trainerapi.liverunapp.com:3004/')
              .then(response => {
                // JSON responses are automatically parsed.
                  _this.isSuccess  = true                     
              })
              .catch(e => {
                _this.isSuccess  = false
              })
          }
          if(_this.$route.params.raceId !=undefined){
            _this.getRunnerData(_this.$route.params.raceId)
          } 
      }, 1500)
    }
  },
  watch: {
    runners () {
      let _this = this
       db.ref(`/racers/${this.$route.params.raceId}`).on('value', (race)=>{
          if(race.val()){
          _this.status = race.val().status             
          }
      })
     
      if(this.status == 'finished'){
        clearInterval(interval)
      }
    }
  }
}
</script>
