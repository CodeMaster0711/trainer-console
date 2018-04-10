<template>
  <div class="race-question">
    <sweet-modal ref="question" @close="onClose()">
    <div class="image">
        <img src="https://contattafiles.s3-us-west-1.amazonaws.com/tnt8888/hIf7gIIFd6jb9AY/q.png"/>
    <h1>Today's Question</h1>
</div>
    <div>
     <textarea v-model="question" id="Question" name="question" Placeholder="enter your question here"></textarea>
      </div>
      <div>
       <button class="btn btn--primary"  v-on:click="Save(question)">Save</button>
       </div>
    </sweet-modal>

  </div>
</template>

<script>
  import {
    SweetModal
  } from 'sweet-modal-vue'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    name: 'race-question',
    data: () => ({
     question: ''
    }),
    props:{
      show:false
    // },
    // computed: {
    //   show: {
    //     // getter
    //     get: function() {
    //       return this.showMe
    //     },
    //     // setter
    //     set: function(newValue) {
    //       console.log(newValue)
    //       if (newValue)
    //         this.$refs.question.open()
    //     }
    //   }
    },
    components: {
      SweetModal,
    },
    mounted() {
        //this.$parent.$emit('closed', true)
    },
    computed: {
      ...mapGetters({
        race: 'Race/race',
        questions: 'RaceQuestion/raceQuestion'
      })
    },
    methods: {
      onClose() {
        this.$parent.$emit('closed', true)
      },
  
      Save: function(question){
            var raceQuestion = {
              question:question,
              race: {
                id: this.race.id
              }
            }
            this.createRaceQuestion(raceQuestion)
              .then(() => {
                console.log('success')
                this.$refs.question.close()
              })
              .catch(() => {
                 console.log('failed')
              })
              
      },
      ...mapActions({
        createRaceQuestion: 'RaceQuestion/createOne'
      })
    },
    
    watch: {
      show(oldVal, newVal) {
        if (this.show)
          this.$refs.question.open()
      }
    },
    Save () {
    },
    created() {
      this.$watch('show', function (val) {
      })
    }
  }
</script>
