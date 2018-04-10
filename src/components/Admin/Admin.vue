<template>
  <my-panel>
    <router-view></router-view>
  </my-panel>
</template>
<script>
  import MyPanel from '@/components/MyPanel/MyPanel'
  import {
    mapActions
  } from 'vuex'
  
  export default {
    name: 'home',
    methods: {
      initialize() {
        this.addTaskToQueue('getTrainerByUser')
  
        this.getTrainer(this.$auth.user().id)
          .then(() => {
            this.removeTaskFromQueue('getTrainerByUser')
          })
      },
      ...mapActions({
        getTrainer: 'Trainer/get',
        addTaskToQueue: 'LoadingQueue/addTaskToQueue',
        removeTaskFromQueue: 'LoadingQueue/removeTaskFromQueue'
      })
    },
    created() {
      this.initialize()
    },
    components: {
      MyPanel
    }
  }
</script>
