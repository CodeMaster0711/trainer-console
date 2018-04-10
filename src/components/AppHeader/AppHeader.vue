<template>
  <div class="app-header">
    <div class="container">
      <div class="app-header__row">
        <logo class="logo-app-header" />
        <div v-if="isRaceLive" class="race-status">📢 Live Now</div>
        <div class="main">
          <div class="title">
            Trainer Console
          </div>
          <ul>
            <li>
              <router-link to="/admin/live-run">Liverun</router-link>
            </li>
            <li>
              <router-link to="/admin/races">Schedule</router-link>
            </li>
            <li>
              <router-link to="/admin/past-run" >Past Run</router-link>
            </li>
            <li>

            </li>
          </ul>
        </div>
        <user-info/>
      </div>
    </div>
  </div>
</template>

<script>
  import Logo from '@/components/AppHeader/Logo'
  import UserInfo from '@/components/AppHeader/UserInfo'
  import PastRun from '@/components/LiveRun/Race/PastRun'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    name: 'AppHeader',
    components: {
      Logo,
      UserInfo,
      PastRun
    },
    computed: mapGetters({
      isRaceLive: 'Race/isRaceLive',
      template: '#modal-template'
    }),
    watch: {
      isRaceLive() {
        //console.log(this.isRaceLive)
      },
    },
    created() {
    }
  }
</script>

<style lang="stylus" scoped>
  .app-header
    background #423799
    padding 15px 0

    &__row
      display flex
      flex-flow row wrap
      justify-content space-between
      align-items center

    .logo-app-header
      flex 1 0 100%
      max-width calc(2.5/12 * 100% - (1 - 2.5/12) * 1px)

    .main
      text-align center

      .title
        font-size 22px
        color #fff

      ul
        list-style none
        display flex
        flex-flow row wrap
        justify-content center
        margin 10px 0 0

        li
          a
            border-bottom 2px solid transparent
            color #fff
            text-decoration none
            text-transform uppercase

            &.router-link-active
              border-bottom 2px solid #fff

          &:not(:last-child)
            margin 0 40px 0 0

    .user-info
      flex 1 0 100%
      max-width calc(2.5/12 * 100% - (1 - 2.5/12) * 1px)

  .race-status
    position absolute
    margin-left 100px
    background-color #50ad69
    padding 5px 10px
    border-radius 3px
    color #fff

</style>

