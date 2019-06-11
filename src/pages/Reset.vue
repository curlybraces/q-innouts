<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col col-sm-8 col-md-6">
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

            <div class="q-mb-md">
              <q-btn label="Send Password Reset Link" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Reset',

  data () {
    return {
      email: null,
    }
  },

  created: function () {
    this.$emit('sendView', ['hhh lpR fff', false, false])
  },

  methods: {
    onSubmit () {
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'fas fa-check-circle',
        message: 'Submitted'
      })
    },

  },

}
</script>

<style>
</style>
