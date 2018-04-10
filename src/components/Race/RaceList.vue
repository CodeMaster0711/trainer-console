<template>
  <div class="only-flex">
    <race-header :subtitle="subtitle"></race-header>
    <race-item :type="type" :info="race" v-for="race in races" :key="race.id"></race-item>
    <div class="race__empty" v-if="races.length === 0">
      {{ messageEmptyList }}
    </div>
  </div>
</template>

<script>
import RaceItem from '@/components/Race/RaceItem'
import RaceHeader from '@/components/Race/Header'

export default {
  name: 'race-list',
  props: {
    subtitle: {
      type: String,
      required: true
    },
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
  components: {
    RaceItem,
    RaceHeader
  }
}
</script>
