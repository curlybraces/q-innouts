<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col col-sm-10 col-md-8 col-lg-6">
        <q-card class="bg-secondary q-pa-md">
          <q-card-section class="bg-primary text-white q-mb-md">
            <div class="text-h5">Register</div>
          </q-card-section>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-sm"
          >
            <q-input
              filled
              v-model="name"
              label="Your name *"
              hint="Name and surname"
              lazy-rules
              :rules="[ val => val.length > 1 || 'Name too short']"
            />

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
                val => val.length >= 7 || 'Please use a minimum of 7 characters'
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="passwordConfirm"
              label="Password Confirmation *"
              lazy-rules
              :rules="[
                val => val === password || 'Passwords do not match!'
              ]"
              class=""
            />

            <q-toggle v-model="accept" label="I accept Innouts' terms" checked-icon="check" />

            <div class="q-mb-md">
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Register',

  data () {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      accept: false,
    }
  },

  meta () {
    return {
      title: 'Register - Innouts',

      meta: {
        description: { name: 'description', content: 'Get started with Innouts and leave behind the age of passive fans!' },
        // keywords: { name: 'keywords', content: [this.player.nickname, this.fullname, this.player.team.name, this.fullname + ' transfers', this.fullname + ' rumours', this.fullname + ' height', this.fullname + ' age'] },
      },
    }
  },

  created: function () {
    this.$store.commit('setView', {
      view: 'hhh lpR fff'
    })

    this.$store.commit('setRightDrawer', false)
  },

  methods: {
    onSubmit () {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
      }
      if (this.accept) {
        this.$store.dispatch('register', data)
          .then(() => {
            this.$q.notify({
              timeout: 8000,
              color: 'warning',
              textColor: 'black',
              icon: 'fas fa-information-circle',
              message: 'Thanks for signing up! We\'ve sent an activation link to your email. Please confirm it before trying to login.'
            })
            this.$router.push({ path: '/login' })
          })
          .catch(err => {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: err.response.data.message
            })
          })
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Terms not accepted!'
        })
      }
    },

    onReset () {
      this.name = ''
      this.email = ''
      this.password = ''
      this.passwordConfirm = ''
      this.accept = false
    }
  },

}
</script>

<style>
</style>
