<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col col-sm-10 col-md-8 col-lg-6">
        <q-card class="bg-secondary q-pa-md">
          <q-card-section class="bg-primary text-white q-mb-md">
            <div class="text-h5">Forgot Password</div>
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
                val => val.includes('@') && val.includes('.') || 'Please type in a valid email'
              ]"
            />
            <div class="q-mb-md">
              <q-btn label="Send Reset Link" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'ForgotPass',

  data () {
    return {
      email: '',
    }
  },

  created: function () {
    this.$store.commit('setRightDrawer', false)
  },

  methods: {
    onSubmit () {
      this.$axios.post('api/forgot-password', { email: this.email })
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
            message: error.response.data.message
          })
        })
    },
  },

}
</script>

<style>
</style>
