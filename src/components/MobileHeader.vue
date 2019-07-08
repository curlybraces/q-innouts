<template>
  <div class="row inlin no-wrap shadow-1">
    <q-toolbar class="q-gutter-x-sm">
      <q-btn
        flat dense round @click="$store.commit('toggleLeftDrawer')" aria-label="Menu"
        class="q-mr-sm"
      >
        <q-icon name="menu" />
      </q-btn>

    <q-avatar clickable link to="/">
      <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
    </q-avatar>

      <q-toolbar-title>
        Innouts
      </q-toolbar-title>

      <q-btn-dropdown icon="perm_identity" class="gloss" dense
      >
        <div v-if="loggedIn" class="row no-wrap q-pa-sm">
          <div class="column">
            <q-list class="bg-primar">
              <q-item clickable  v-close-popup to="/123" >
                <q-item-section avatar>
                  <q-avatar icon="home" color="secondar" size="2.1rem" text-color="" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Home</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable  v-close-popup to="/leagues/1" >
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/club_logos/atletico-madrid.png" size="2.1rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{user.team_id}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable  v-close-popup to="/leagues/1" >
                <q-item-section avatar>
                  <q-avatar icon="settings" color="" size="2.1rem" text-color="" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Settings</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <q-separator vertical inset class="q-mx-md" />

          <div class="column items-center">
            <q-avatar size="72px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs text-capitalize">{{user.name}}</div>

            <q-btn
              color="primary"
              label="Logout"
              @click="logout"
              push
              size="sm"
              v-close-popup
            />
          </div>
        </div>

        <div v-else class="row no-wrap q-pa-sm">
          <div class="column">
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

              <div>
                <q-btn label="Submit" type="submit" color="primary" size="sm"/>
                <q-btn label="Forgot Password?" type="a" color="primary" size="sm" class="q-ml-sm" />
              </div>

              <q-btn size="sm" push type="a" label="New Around? Register" to="/register" />
            </q-form>
            <q-separator/>
          </div>
        </div>
      </q-btn-dropdown>

    </q-toolbar>

  </div>
</template>

<script>
export default {
  name: 'MobileHeader',
  data () {
    return {
      leagues: Array,
      email: '',
      password: '',
      remember: false,
    }
  },

  computed: {
    loggedIn: function () {
      return this.$store.getters.loggedIn
    },

    user: function () {
      return this.$store.getters.user
    }
  },

  created: function () {
    this.$axios.get('http://innouts.test/api/leagues')
      .then(response => {
        this.leagues = response.data.data
      })
      .catch(error => {
        this.error = error
      })
    if (this.loggedIn) {
      if (localStorage.getItem('token')) {
        this.$store.dispatch('getUser', localStorage.getItem('token'))
      } else {
        this.$store.dispatch('getUser', sessionStorage.getItem('token'))
      }
    }
  },

  methods: {
    onSubmit () {
      let email = this.email
      let password = this.password
      let remember = this.remember
      this.$store.dispatch('login', { email, password, remember })
        .then(() => this.$router.push({ name: 'profile', params: { user: '123' } }))
        .catch(err => {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: err.response.data.error
          })
        })
    },

    logout: function () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/')
      })
    }
  },

}
</script>

<style>
</style>
