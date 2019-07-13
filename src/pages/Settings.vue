<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col col-sm-8 col-md-6">
        <q-card class="bg-secondary q-pa-md">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-sm"
          >
          <q-card-section class="bg-primary text-white q-mb-md">
            <q-tabs
              v-model="tab"
              dense
              no-caps
              class="bg-orange text-white shadow-2 rounded-borders"
            >
              <q-tab name="account" label="Account" />
              <q-tab name="personal"  label="Personal Details" />
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
                    label="Repeat new password"
                    lazy-rules
                    :rules="[
                      val => val === password || 'Passwords do not match!'
                    ]"
                    class=""
                  />
                </div>
              </q-tab-panel>

              <q-tab-panel name="personal">
                <div class="column">
                  <q-input
                    filled
                    v-model="name"
                    label="New name"
                    :placeholder="user.name"
                    hint="Name and surname recommended"
                    lazy-rules
                    :rules="[ val => val.length > 1 || 'Name too short']"
                  />
                  <div class="row q-gutter-sm q-my-sm">
                    <div v-if="user.nationality" class="col">
                      <q-select filled v-model="country" :options="countries" label="Nationality" />
                    </div>
                    <div v-if="user.birthday" class="col">
                      <q-input  filled v-model="birthday" mask="date" :rules="['date']" label="Birthday">
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <!-- <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                              <q-date v-model="birthday" @input="() => $refs.qDateProxy.hide()" />
                            </q-popup-proxy> -->
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div v-if="user.gender" class="q-gutter-sm q-mx-auto">
                    <q-radio v-model="gender" val="female" label="Female" />
                    <q-radio v-model="gender" val="male" label="Male" />
                    <q-radio v-model="gender" val="other" label="Other" />
                  </div>
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
          <q-card-section>
            <div class="q-mb-md">
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-card-section>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Settings',

  data: () => {
    return {
      tab: 'account',
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      gender: '',
      birthday: '',
      countries: [],
      country: '',
    }
  },

  computed: {
    user: function () {
      return this.$store.state.user
    }
  },

  created: function () {
    this.$axios({ url: 'http://innouts.test/api/countries', method: 'GET' })
      .then(response => {
        for (let x in response.data) {
          this.countries.push(response.data[x])
        }
        this.gender = this.user.gender
        this.country = this.user.nationality
        this.birthday = this.user.birthday
        // this.countries = response.data
      })
      .catch(error => {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: error.response.data.error
        })
      })
  },

  methods: {
    panelChange: () => {

    },

    onSubmit () {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
      }
      this.$store.dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    },

    onReset () {
      switch (this.tab) {
        case 'account':
          this.email = ''
          this.password = ''
          this.passwordConfirm = ''
          break
        case 'personal':
          this.name = ''
          break
        case 'team':
          // this.email = ''
          // this.password = ''
          // this.passwordConfirm = ''
          break
      }
    },
  }
}
</script>

<style>
</style>
