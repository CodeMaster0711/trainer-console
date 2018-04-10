<template>
  <div class="flex flex--justify-center login">
    <div class="login__content">
      <div class="logo">
        <img src="../../assets/logo.png" alt="LiveRun">
      </div>
      <form class="login__form" @submit="handleSubmit($event)" novalidate>
        <div class="alert alert--danger" v-if="error" v-html="error"></div>
        <div class="form__group">
          <label for="username">Username <span class="required">*</span></label>
          <input v-validate data-vv-rules="required" :class="{'form-control': true, 'is-danger': errors.has('username') }" type="text" name="username" v-model="user.username" required>
          <span v-show="errors.has('username')" class="help is-danger">Fill in the username</span>
        </div>
        <div class="form__group">
          <label for="password">Password <span class="required">*</span></label>
          <input v-validate data-vv-rules="required" :class="{'form-control': true, 'is-danger': errors.has('password') }" type="password" name="password" v-model="user.password" required>
          <span v-show="errors.has('password')" class="help is-danger">Fill in the password!</span>
        </div>
        <div class="form__group form__group--inline">
          <input type="checkbox" v-model="rememberMe" id="rememberMe" name="rememberMe">
          <label for="rememberMe">Remember me</label>
        </div>
         <div class="form__group form__group--inline">
         <router-link to="" slot="actions">Forget Password</router-link>
        </div>
        <button id="sign-in" class="btn btn--primary btn--block">Sign In</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user: {
        username: null,
        password: null
      },
      rememberMe: false,
      error: ''
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()

      this.$validator.validateAll()
        .then(success => {
          if (!success) {
            return
          }

          this.loadingSignInButton()

          this.$auth.login({
            body: this.user,
            rememberMe: this.rememberMe,
            success (res) {
              this.error = ''
              this.resetSignInButton()
            },
            error (res) {
              this.error = '<strong>Failed to sign in!</strong> Please check your credentials and try again.'
              this.resetSignInButton()
            }
          })
        })
    },
    loadingSignInButton () {
      const btnSignIn = document.querySelector('#sign-in')
      btnSignIn.innerHTML = 'Loading...'
      btnSignIn.setAttribute('disabled', true)
    },
    resetSignInButton () {
      const btnSignIn = document.querySelector('#sign-in')
      btnSignIn.innerHTML = 'Sign In'
      btnSignIn.removeAttribute('disabled', true)
    }
  }
}
</script>
