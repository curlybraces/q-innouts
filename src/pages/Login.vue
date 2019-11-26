<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col col-sm-10 col-md-8 col-lg-6">
        <q-card class="bg-secondary q-pa-md">
          <q-card-section class="bg-primary text-white q-mb-md">
            <div class="text-h5">Login</div>
          </q-card-section>
          <q-form
            @submit="onSubmit"
            class="q-gutter-sm"
          >
            <q-input
              filled
              type="email"
              v-model="email"
              label="Email *"
              lazy-rules
              :rules="[
                val => val !== '' || 'Please type a valid email',
                val => val.includes('@') && val.includes('.') || 'Please type a valid email'
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="password"
              label="Password *"
              lazy-rules
              :rules="[
                val => val.length >= 6 || 'Please use minimum 6 characters'
              ]"
            />

            <q-checkbox v-model="remember" label="Remember Me?" />

            <div class="q-mb-md q-gutter-sm">
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn to="/forgot-password" label="Forgot Password?" type="a" color="primary" class="q-ml-sm" />
              <q-btn @click="resendActivation" label="Resend Activation Link?" type="a" color="info" size="sm" class="float-right" />
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',

  data () {
    return {
      email: '',
      password: '',
      remember: false,
    }
  },

  computed: {
    adminIn: function () {
      return this.$store.getters.adminIn
    },

    loggedIn: function () {
      return this.$store.getters.loggedIn
    },
  },

  mounted () {
    if (this.loggedIn) {
      this.$router.go(-1)
    }
  },

  meta () {
    return {
      title: 'Login - Innouts',

      meta: {
        description: { name: 'description', content: 'Login to Innouts!' },
        // keywords: { name: 'keywords', content: [this.player.nickname, this.fullname, this.player.team.name, this.fullname + ' transfers', this.fullname + ' rumours', this.fullname + ' height', this.fullname + ' age'] },
      },
    }
  },

  created: function () {
    this.$store.commit('setRightDrawer', false)
  },

  methods: {
    onSubmit () {
      if (this.adminIn) {
        this.$store.dispatch('adminLogout')
      }
      let email = this.email
      let password = this.password
      let remember = this.remember
      this.$store.dispatch('login', { email, password, remember })
        .then(() => this.$router.push({ name: 'home' }))
        .catch(err => {
          this.$q.notify({
            color: 'red-5',
            icon: 'fas fa-exclamation-triangle',
            message: err.response.data.message
          })
        })
    },

    resendActivation () {
      if (this.email) {
        this.$axios({ url: 'api/resend-activation-link', data: { email: this.email }, method: 'POST' })
          .then(response => {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: response.data.message
            })
          })
          .catch(error => {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'fas fa-exclamation-triangle',
              message: error.response.data.error
            })
          })
      } else {
        this.$q.notify({
          color: 'red-5',
          icon: 'fas fa-exclamation-triangle',
          message: 'Please enter your email!'
        })
      }
      // console.log('hey')
    }

  },

}
</script>

<style>
</style>
