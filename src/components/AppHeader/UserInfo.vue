<template>
  <div class="user-info">
    <div class="hour">
      {{ time }}
    </div>
    <div class="user">
      <p class="name">{{ trainer.firstName }}</p>
      <a class="logout" @click="logout">Log out</a>
    </div>
    <img :src="userPicture">
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'user-info',
  data: () => ({
    userPicture: 'https://randomuser.me/api/portraits/thumb/men/10.jpg',
    time: ''
  }),
  computed: {
    trainer () {
      return this.$store.getters['Trainer/trainer']
    }
  },
  methods: {
    logout () {
      this.$auth.logout({redirect: '/login'})
    }
  },
  mounted () {
    setInterval(() => {
      this.time = moment().format('LT')
    }, 1000)
  },
  watch: {
    trainer () {
      if (this.trainer.profilePhoto && this.trainer.profilePhotoContentType) {
        this.userPicture = `data:${this.trainer.profilePhotoContentType};base64,${this.trainer.profilePhoto}`
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .user-info
    display flex
    flex-flow row wrap
    align-items flex-end
    justify-content flex-end

    .hour
      flex 1 0 auto
      margin 0 20px 0 0
      font-size 12px
      text-align right
      color #fff

    .user
      flex 1 0 100%
      max-width calc(5/12 * 100% - (1 - 5/12) * 1px)
      display flex
      flex-flow row wrap
      justify-content flex-end
      padding 0 15px 0 0

      .name
        flex 1 0 100%
        color #fff

      .logout
        flex 1 0 100%
        color #fff
        cursor pointer
        text-decoration none

    img
      flex 1 0 100%
      max-width 40px
      border-radius 40px
</style>

