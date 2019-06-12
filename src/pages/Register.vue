<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col col-sm-8 col-md-6">
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
                val => val.length >= 6 || 'Please use minimum 6 characters'
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

            <q-toggle v-model="accept" label="I accept Innouts' terms" />

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
      name: null,
      email: null,
      password: null,
      passwordConfirm: null,
      accept: false,
    }
  },

  created: function () {
    this.$emit('sendView', ['hhh lpR fff', false, false])
  },

  methods: {
    onSubmit () {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
      }
      this.$store.dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
      // if (this.accept !== true) {
      //   this.$q.notify({
      //     color: 'red-5',
      //     textColor: 'white',
      //     icon: 'fas fa-exclamation-triangle',
      //     message: 'You need to accept the license and terms first'
      //   })
      // } else {
      //   this.$q.notify({
      //     color: 'green-4',
      //     textColor: 'white',
      //     icon: 'fas fa-check-circle',
      //     message: 'Submitted'
      //   })
      // }
    },

    onReset () {
      this.name = null
      this.email = null
      this.password = null
      this.passwordConfirm = null
      this.accept = false
    }
  },

}
</script>

<style>
</style>
