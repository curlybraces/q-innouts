<template>
  <q-page padding>
    <q-dialog v-model="confirmDeletion" persistent v-close-popup>
      <q-card>
        <q-card-section class="row items-center q-py-sm">
          <span style='font-size:35px;'>&#128561;</span>
          <span class="q-ml-sm">Confirm Deletion?</span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn label="Cancel" color="primary" v-close-popup />
          <q-btn flat @click="deleteAccount" size="sm" label="yes" color="negative" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="row justify-center">
      <div class="col col-sm-10 col-md-8 col-lg-6">
        <q-card class="bg-secondary" :class="cardClass">
          <q-card-section class="bg-primary text-white q-mb-md">
            <q-tabs
              v-model="tab"
              dense
              no-caps
              class="bg-secondary text-primary shadow-2 rounded-borders"
              active-bg-color="accen"
              active-color="accent"
            >
              <q-tab name="account" label="Account" />
              <q-tab name="personal"  label="Personal Info" />
              <q-tab name="team"  label="Team" />
              <q-space/>
              <q-tab name="delete"  label="Delete Account" />
            </q-tabs>
          </q-card-section>

          <q-card-section :class="cardPanelClass">
            <q-tab-panels
              v-model="tab"
              animated
              transition-prev="jump-up"
              transition-next="jump-up"
              class="bordered"
            >
              <q-tab-panel name="account">
                <div class="column">
                  <q-list>
                    <q-item>
                      <q-item-section side class="bg-">
                        <q-item-label>
                          Email
                          <q-badge v-if="user.email_verified_at" color="positive">verified</q-badge>
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
                              :type="isPwd ? 'password' : 'text'"
                              v-model="password"
                              lazy-rules
                              :rules="[
                                val => val.length >= 7 || 'Please use a minimum of 7 characters'
                              ]"
                            >
                              <template v-slot:append>
                                <q-icon
                                  :name="isPwd ? 'visibility_off' : 'visibility'"
                                  class="cursor-pointer"
                                  @click="isPwd = !isPwd"
                                />
                              </template>
                            </q-input>
                          </q-popup-edit>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item class="q-mt-lg">
                      <q-item-section class="text-center">
                        <!-- <q-uploader
                          :url="'api/users/'+user.id" no-thumbnail label="Upload Profile Picture" class="q-mx-auto"
                          accept="image/*" :max-file-size="500000" field-name="profile" method="PUT"
                          :headers="[{name: 'Authorization', value: 'Bearer ' + token}, {name: 'Accept', value: 'application/json, text/plain, */*'}]"
                          ref="profile" :factory="uploadFile"
                        /> -->
                        <form method="post" @submit.prevent='uploadFile' :action="'/api/users/'+this.user.id" enctype="multipart/form-data">
                          Upload a profile picture: <input type="file" name="profile" accept="image/*" required ref="profile"><br><br>
                          <q-btn label="Submit" type="submit" color="primary" size="sm" />
                          <!-- <input type="submit"> -->
                        </form>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-tab-panel>

              <q-tab-panel name="personal">
                <div class="column">
                  <q-list>
                    <q-item>
                      <q-item-section side class="bg-">
                        <q-item-label>
                          Name
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="text-center">
                        <q-item-label >
                          {{user.name}}
                          <q-popup-edit :value="user.name" :validate="validateName" @save="saveName" @cancel="cancelName" buttons title="New name" persistent>
                            <q-input filled v-model="user.name" label="Name" :placeholder="user.name" hint="Name and surname recommended" lazy-rules
                              :rules="[ val => val.length > 1 || 'Name too short']"
                            />
                          </q-popup-edit>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item >
                      <q-item-section side class="bg-">
                        <q-item-label>
                          Nationality
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="text-center">
                        <q-item-label >
                          <span v-if="!user.nationality">Choose nationality</span>{{user.nationality}}
                          <q-popup-edit :value="user.nationality" @save="saveCountry" @cancel="cancelCountry" buttons title="Choose nationality" persistent>
                            <q-select filled v-model="user.nationality" :options="countries" label="Nationality" />
                          </q-popup-edit>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section side class="bg-">
                        <q-item-label>
                          Birthday
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="text-center">
                        <q-item-label >
                          <span v-if="!user.birthday">Enter birthday</span> {{user.birthday}}
                          <q-popup-edit :value="user.birthday" :validate="validateBirthday" @save="saveBirthday" @cancel="cancelBirthday" buttons title="Enter birthday" persistent>
                              <q-input v-model="user.birthday" filled type="date" :rules="[val => validateBirthday(val) || 'That year sounds weird! :)']" lazy-rules >
                            </q-input>
                          </q-popup-edit>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section side class="bg-">
                        <q-item-label>
                          Gender
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="text-center">
                        <q-item-label >
                          <span v-if="!user.gender">Select gender</span> {{user.gender}}
                          <q-popup-edit :value="user.gender" @save="saveGender" @cancel="cancelGender" buttons title="Choose gender" persistent>
                            <q-radio v-model="user.gender" val="female" label="Female" />
                            <q-radio v-model="user.gender" val="male" label="Male" />
                            <q-radio v-model="user.gender" val="other" label="Other" />
                          </q-popup-edit>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-tab-panel>

              <q-tab-panel name="team">
                <div class="colu">
                  <div v-if="user.team">
                    <div class="row justify-center">
                      <div class="col-md-2 col-3">
                        <q-img :src="user.team.logo" contain class="full-width league-team-thumbnail" />
                      </div>
                    </div>
                    <div class="row justify-center q-my-md">
                      <q-btn @click="change = !change" class="glossy" size="sm" rounded color="blue-grey-3" label="Change Team" />
                    </div>
                  </div>
                  <div v-if="!user.team || change">
                    <div v-if="user.team" class="text-subtitle2 text-center q-py-sm"> Note: Changing your loyalties will cost you 1 level!</div>
                    <div class="row justify-center q-gutter-sm">
                      <div class="col">
                        <q-select filled v-model="league" :options="leagues" option-label="name" option-value="id" label="League" />
                      </div>
                      <div class="col self-center text-center">
                        Team
                        <q-popup-edit :value="team" :validate="validateTeam" @save="saveTeam" @cancel="cancelTeam" buttons title="Change team" persistent label-set="SAVE">
                          <q-select filled v-model="team" :options="teams" lazy-rules :rules="[ val => validateTeam(val) || 'Please fill Personal Info fields first!']" option-label="name" options-dense option-value="id" label="team" >
                            <template v-slot:option="scope">
                              <q-item
                                v-bind="scope.itemProps"
                                v-on="scope.itemEvents"
                              >
                                <q-item-section avatar>
                                  <q-avatar square>
                                    <q-img contain class="team-thumbnail" :src="scope.opt.logo" />
                                  </q-avatar>
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label v-text="scope.opt.name" />
                                  <!-- <q-item-label caption>{{ scope.opt.name }}</q-item-label> -->
                                </q-item-section>
                              </q-item>
                            </template>
                          </q-select>
                        </q-popup-edit>
                      </div>
                    </div>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="delete">
                <div class="column q-gutter-sm text-subtitle1 q-pa-sm">
                  Pressing the button below, will enlist your account for deletion. You will have a short period to reclaim it by just logging back in.
                  <q-btn @click="confirmDeletion = true"  class="glossy col-auto q-mt-md q-mx-auto" size="sm" rounded color="negative" label="Delete Account" />
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
  name: 'Settings',

  data: () => {
    return {
      tab: 'account',
      password: '',
      isPwd: true,
      newPassPrompt: false,
      newPass: '',
      oldPassPrompt: false,
      oldPass: '',
      confirmDeletion: false,
      confirmedDeletion: false,
      countries: [],
      country: '',
      change: false,
      leagues: [],
      teams: [],
      league: '',
      team: '',
      cardClass: {
        'q-pa-md': true
      },
      cardPanelClass: {}
    }
  },

  computed: {
    user: function () {
      return this.$store.state.user
    },
    token: function () {
      return this.$store.state.token
    },
  },

  watch: {
    league: function () {
      this.teams = this.league.teams
    }
  },

  meta () {
    return {
      title: 'Settings - Innouts',
    }
  },

  created: function () {
    this.$store.commit('setRightDrawer', false)
    if (this.$q.screen.lt.md) {
      this.cardClass = {
        'q-pa-none': true
      }
      this.cardPanelClass = { 'q-pa-xs': true }
    }
    this.$axios({ url: 'api/countries', method: 'GET' })
      .then(response => {
        for (let x in response.data) {
          this.countries.push(response.data[x])
        }
      })
      .catch(error => {
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: error.response.data.error
        })
      })
    this.$axios.get('api/leagues')
      .then(response => {
        this.leagues = response.data
      })
      .catch(error => {
        this.$q.notify({ message: error.data.message })
      })
  },

  mounted () {
    if (!this.user.team_id) {
      this.$q.notify({
        timeout: 10000,
        // position: 'top',
        color: 'warning',
        textColor: 'black',
        icon: 'fas fa-information-circle',
        message: 'Innouts is more fun when you support a team!'
      })
    }
  },

  methods: {
    // panelChange: () => {

    // },

    cancelEmail: function (val, initialVal) {
      this.user.email = initialVal
    },

    saveEmail: function (val, initialVal) {
      this.$axios({ url: 'api/users/' + this.user.id, data: { email: val }, method: 'PUT' })
        .then(response => {
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Email updated!'
          })
        })
        .catch(error => this.$q.notify({ message: error.data.message }))
    },

    cancelPass: function (val, initialVal) {
      this.password = ''
    },

    validatePass: function (val) {
      return val.length >= 7
    },

    savePass: function (val, initialVal) {
      this.$q.dialog({
        dark: true,
        // color: 'secondary',
        title: 'Password Confirmation',
        message: 'Please confirm new password',
        prompt: {
          model: '',
          type: 'password' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        if (data === this.password) {
          this.$q.dialog({
            dark: true,
            title: 'Old Password',
            message: 'Please enter old password',
            prompt: {
              model: '',
              type: 'password' // optional
            },
            cancel: true,
            persistent: true
          }).onOk(data => {
            if (data.length >= 7) {
              this.$axios({ url: 'api/users/' + this.user.id, data: { newPass: this.password, oldPass: data }, method: 'PUT' })
                .then(response => {
                  this.$q.notify({
                    color: 'positive',
                    textColor: 'white',
                    icon: 'fas fa-check-circle',
                    message: 'Password updated!'
                  })
                })
                .catch(err => {
                  this.$q.notify({
                    color: 'negative',
                    textColor: 'white',
                    icon: 'fas fa-check-circle',
                    message: err.response.data.error
                  })
                })
              // this.password = ''
            } else {
              this.$q.notify({
                color: 'negative',
                textColor: 'white',
                icon: 'fas fa-check-circle',
                message: 'Old password not correct!'
              })
              this.password = ''
            }
          }).onCancel(() => {
            this.password = ''
          }).onDismiss(() => {})
        } else {
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Passwords did not match!'
          })
          this.password = ''
        }
      }).onCancel(() => {
        this.password = ''
      }).onDismiss(() => {
        // gets to run on both confirm and cancel!
      })
    },

    cancelName: function (val, initialVal) {
      this.user.name = initialVal
    },

    validateName: function (val) {
      return val.length >= 2
    },

    saveName: function (val, initialVal) {
      this.$axios({ url: 'api/users/' + this.user.id, data: { newName: val }, method: 'PUT' })
        .then(response => {
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Name changed!'
          })
        })
        .catch(error => this.$q.notify({ message: error.data.message }))
    },

    cancelCountry: function (val, initialVal) {
      this.user.nationality = initialVal
    },

    saveCountry: function (val, initialVal) {
      this.$axios({ url: 'api/users/' + this.user.id, data: { newNationality: val }, method: 'PUT' })
        .then(response => {
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Nationality saved!'
          })
        })
        .catch(error => this.$q.notify({ message: error.data.message }))
    },

    cancelBirthday: function (val, initialVal) {
      this.user.birthday = initialVal
    },

    validateBirthday: function (val) {
      let year = parseInt(val.split('-')[0])
      return year > 1900 && year < 2019
    },

    saveBirthday: function (val, initialVal) {
      this.$axios({ url: 'api/users/' + this.user.id, data: { newBirthday: val }, method: 'PUT' })
        .then(response => {
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Birthday saved!'
          })
        })
        .catch(error => this.$q.notify({ message: error.data.message }))
    },

    cancelGender: function (val, initialVal) {
      this.user.gender = initialVal
    },

    saveGender: function (val, initialVal) {
      this.$axios({ url: 'api/users/' + this.user.id, data: { newGender: val }, method: 'PUT' })
        .then(response => {
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Gender saved!'
          })
        })
        .catch(error => this.$q.notify({ message: error.data.message }))
    },

    cancelTeam: function (val, initialVal) {
      this.team = initialVal
    },

    validateTeam: function (val) {
      if ((this.user.nationality && this.user.birthday && this.user.gender) !== null) {
        return true
      } else {
        this.league = ''
        this.teams = []
        this.team = null
        return false
      }
    },

    saveTeam: function (val, initialVal) {
      this.$axios({ url: 'api/users/' + this.user.id, data: { team: val.id }, method: 'PUT' })
        .then(response => {
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Team saved!'
          })
          this.$store.dispatch('getUser', this.$q.cookies.get('token'))
        })
        .catch(error => this.$q.notify({ message: error.data.message }))
    },

    deleteAccount: function () {
      this.$axios({ url: 'api/users/' + this.user.id, method: 'DELETE' })
        .then(response => {
          this.$q.notify({
            color: 'warning',
            textColor: 'primary',
            icon: 'fas fa-check-circle',
            message: 'Account listed for deletion! We hope to welcome you back again!'
          })
          this.$store.dispatch('logout').then(() => {
            this.$router.push('/')
          })
        })
        .catch(err => {
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: err.response.data.message
          })
        })
    },

    uploadFile (files) {
      let formData = new FormData()
      formData.append('profile', this.$refs.profile.files[0])
      let headers = {
        'Content-Type': 'multipart/form-data'
      }
      formData.append('_method', 'PUT')
      // console.log(files)
      // console.log(this.$refs.profile.files[0])
      // console.log(formData)
      // return new Promise((resolve, reject) => {
      this.$axios.post('api/users/' + this.user.id, formData, headers)
        .then(response => {
          this.$q.notify({
            color: 'positive',
            textColor: 'secondary',
            message: response.data.message
          })
          // resolve(files)
          this.$store.dispatch('getUser', this.$q.cookies.get('token'))
          this.$refs.profile.value = null
        })
        .catch(error => {
          this.$q.notify({
            color: 'positive',
            textColor: 'secondary',
            message: error.data.message
          })
          // reject(error)
        })
      // })
    },

  }
}
</script>

<style>
</style>
