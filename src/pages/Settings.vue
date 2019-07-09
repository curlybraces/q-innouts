<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col col-sm-8 col-md-6">
        <q-card class="bg-secondary q-pa-md">
          <q-card-section class="bg-primary text-white q-mb-md">
            <q-tabs
              v-model="tab"
              dense
              no-caps
              class="bg-orange text-white shadow-2"
            >
              <q-tab name="account" label="Account" />
              <q-tab name="personalDetails"  label="Personal Details" />
              <q-tab name="team"  label="Team" />
              <q-tab name="delete"  label="Delete Account" />
            </q-tabs>
          </q-card-section>

          <q-card-section>
            <q-tab-panels
              v-model="tab"
              animated
              transition-prev="jump-up"
              transition-next="jump-up"
              @before-transition="panelChange"
            >
              <q-tab-panel name="account">
                <div class="column">
                  <q-input
                    filled
                    type="email"
                    v-model="email"
                    :placeholder="user.email"
                    label="Change email *"
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
                    label="Change password *"
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
                </div>
              </q-tab-panel>

              <q-tab-panel name="personalDetails">
                <div class="column">
                  bb
                </div>
              </q-tab-panel>

              <q-tab-panel name="team">
                <div class="column">
                  team
                </div>
              </q-tab-panel>

              <q-tab-panel name="delete">
                <div class="column">
                  del
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',

  data: () => {
    return {
      tab: 'account',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },

  computed: {
    user: function () {
      return this.$store.state.user
    }
  },

  methods: {
    panelChange: () => {

    }
  }
}
</script>

<style>
</style>
