<template>
  <ul class="runners-list">
    <li class="runners-list__item" v-for="(runner, index) in runners" :key="index">
      <div class="flex">
        <div class="user-image">
        </div>
        <div class="user-infos">
          <h1 class="name">
             {{ runner.name }}
          </h1>
          <div class="more-infos">
            <div class="flex flex--align-start">
              <span>{{ runner.time | secondsToHours }}</span>
              <span class="separation"></span>
              <span>{{ runner.pace ? runner.pace : `0'00"` }}</span>
              <span class="separation"></span>
              <span>{{ runner.distance | distance }}</span>
            </div>
          </div>
        </div>
        <div class="position">
          {{ index + 1 }}
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import {db} from '../../../firebase'
import {project, descend, prop, sort} from 'ramda'

export default {
  data: () => ({
    runners: [],
    runnersFirebase: []
  }),
  props: {
    raceId: {
      type: String,
      required: true
    }
  },
  watch: {
    runnersFirebase () {
      //GET ALL RUNNERS FROM FIREBASE AND SORT DESC BY DISTANCE AND TAKE TOP 3
      const runners = project(['id', 'distance', 'name', 'speed', 'time', 'pace'], this.runnersFirebase)

      const byDistance = descend(prop('distance'))

      const runnersSortByDistance = sort(byDistance, runners)

      runnersSortByDistance.forEach((runner, key) => {
        db.ref(`/racers/${this.$route.params.raceId}/runners`)
          .child(runner.id)
          .update({position: key + 1})
      })

      this.runners = runnersSortByDistance.slice(0, 3)
    }
  },
  created: function () {
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
  }
}
</script>
