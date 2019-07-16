<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col col-sm-8 col-md-6">
        <q-card class="bg-secondary q-pa-md">
          <!-- <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-sm"
          > -->
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
                  <q-list>
                    <q-item>
                      <q-item-section side class="bg-">
                        <q-item-label>
                          Email
                          <q-badge v-if="user.email_verified" color="positive">verified</q-badge>
                          <q-badge v-else color="warning">unverified</q-badge>
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="text-center">
                        <q-item-label >
                          {{user.email}}
                          <q-popup-edit :value="user.email" @save="saveEmail" @cancel="cancelEmail" buttons title="New email address" persistent>
                            <q-input
                              filled
                              type="email"
                              v-model="user.email"
                              :placeholder="user.email"
                              label="Change email *"
                              lazy-rules
                              :rules="[
                                val => val.includes('@') && val.includes('.') || 'Please type a valid email'
                              ]"
                            />
                          </q-popup-edit>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section side class="bg-">
                        <q-item-label>
                          Change Password
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="text-center">
                        <q-item-label >
                          New password
                          <q-popup-edit :value="password" @save="savePass" @cancel="cancelPass" :validate="validatePass" buttons title="New password" persistent>
                            <q-input
                              filled
                              type="password"
                              v-model="password"
                              lazy-rules
                              :rules="[
                                val => val.length >= 6 || 'Please use minimum 6 characters'
                              ]"
                            />
                          </q-popup-edit>
                          <q-dialog v-model="newPassPrompt" persistent>
                            <q-card style="min-width: 400px">
                              <q-card-section>
                                <div class="text-h6">Please repeat new password</div>
                              </q-card-section>

                              <q-card-section>
                                <q-input type="password" dense v-model="newPass" autofocus @keyup.enter="newPassPrompt = false" />
                              </q-card-section>

                              <q-card-actions align="right" class="text-primary">
                                <q-btn flat label="Cancel" v-close-popup />
                                <q-btn flat label="Confirm" v-close-popup />
                              </q-card-actions>
                            </q-card>
                          </q-dialog>
                          <q-dialog v-model="oldPassPrompt" persistent>
                            <q-card style="min-width: 400px">
                              <q-card-section>
                                <div class="text-h6">Please enter old password</div>
                              </q-card-section>

                              <q-card-section>
                                <q-input type="password" dense v-model="oldPass" autofocus @keyup.enter="oldPassPrompt = false" />
                              </q-card-section>

                              <q-card-actions align="right" class="text-primary">
                                <q-btn flat label="Cancel" v-close-popup />
                                <q-btn flat label="Confirm" v-close-popup />
                              </q-card-actions>
                            </q-card>
                          </q-dialog>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-tab-panel>

              <q-tab-panel name="personal">
                <div class="column">
                  <q-input
                    filled
                    v-model="name"
                    label="Name"
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
                <div class="colu">
                  <div v-if="user.team">
                    <div class="row justify-center">
                      <div class="col-md-2 col-3">
                        <q-img :src="'statics/'+user.team.logo" class="full-width" />
                      </div>
                    </div>
                    <div class="row justify-center q-my-md">
                      <q-btn @click="change = !change" class="glossy" rounded color="deep-orange" label="Change Team" />
                    </div>
                  </div>
                  <div v-else-if="!user.team || change">
                    <div class="row justify-center q-gutter-sm">
                      <div class="col">
                        <q-select filled v-model="league" :options="leagues" label="League" />
                      </div>
                      <div class="col">
                        <q-select filled v-model="team" :options="teams" label="Team" />
                      </div>
                    </div>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="delete">
                <div class="colum">
                  Pressing the button below, will enlist your account for deletion. You will have a short period to reclaim it by just logging back in.
                  <q-btn  class="glossy" rounded color="negative" label="Delete Account" />
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
          <!-- <q-card-section>
            <div class="q-mb-md">
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-card-section> -->
          <!-- </q-form> -->
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
      // email: '',
      password: '',
      newPassPrompt: false,
      newPass: '',
      oldPassPrompt: false,
      oldPass: '',
      name: '',
      gender: '',
      birthday: '',
      countries: [],
      country: '',
      change: false,
      leagues: [],
      teams: [],
      league: '',
      team: '',
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

    cancelEmail: function (val, initialVal) {
      this.user.email = initialVal
    },

    saveEmail: function (val, initialVal) {
      this.$axios({ url: 'http://innouts.test/api/users/' + this.user.id, data: { email: val }, method: 'PUT' })
        .then(response => {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Email updated!'
          })
        })
        .catch(err => console.log(err))
    },

    cancelPass: function (val, initialVal) {
      this.password = ''
    },

    validatePass: function (val) {
      return val.length >= 6
    },

    savePass: function (val, initialVal) {
      this.newPassPrompt = true

      this.oldPassPrompt = true
      if (val === this.newPass) {
        alert('submit')
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Passwords did not match!'
        })
      }
    }
  }
}
</script>

<style>
</style>
