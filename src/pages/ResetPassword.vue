<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col col-sm-8 col-md-6">
        <q-card class="bg-secondary q-pa-md">
          <q-card-section class="bg-primary text-white q-mb-md">
            <div class="text-h5">Reset Password</div>
          </q-card-section>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-sm"
          >
            <q-input
              filled
              type="email"
              v-model="email"
              label="Email"
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
              label="New Password"
              lazy-rules
              :rules="[
                val => val.length >= 6 || 'Please use minimum 6 characters'
              ]"
            />
            <q-input
              filled
              type="password"
              v-model="passwordConfirm"
              label="Password Confirmation"
              lazy-rules
              :rules="[
                val => val === password || 'Passwords do not match!'
              ]"
              class=""
            />

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
  name: 'ResetPass',
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
    }
  },

  created: function () {
    this.$store.commit('setRightDrawer', false)
  },

  methods: {
    onSubmit () {
      this.$axios.post('api/reset-password/', {
        token: this.$route.params.token,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirm
      })
        .then(response => {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: response.data.message
          })
          this.$router.push({ name: 'login' })
        }, error => {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: error.response.data.message
          })
        })
    },

    onReset () {
      this.email = ''
      this.password = ''
      this.passwordConfirm = ''
    }
  }
}
</script>

<style>
</style>
