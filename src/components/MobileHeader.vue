<template>
  <div class="row inlin no-wrap shadow-1">
    <q-toolbar class="q-gutter-x-sm">
      <q-btn
        flat dense round @click="$store.commit('toggleLeftDrawer')" aria-label="Menu"
        class="q-mr-sm"
      >
        <q-icon name="menu" />
      </q-btn>

    <q-avatar square>
      <img src="~assets/innouts.png">
    </q-avatar>

      <q-toolbar-title>
        <router-link to="/" class="no-decor text-white">
          Innouts
        </router-link>
      </q-toolbar-title>

      <q-btn-dropdown icon="perm_identity" class="gloss" dense>
        <div v-if="loggedIn" class="row no-wrap q-pa-sm">
          <div class="column">
            <q-list dense class="bg-primar">
              <q-item clickable  v-close-popup to="/home" >
                <q-item-section avatar>
                  <q-avatar icon="home" color="secondar" size="2.1rem" text-color="" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Home</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="user.team" clickable  v-close-popup :to="'/teams/'+user.team.slug" >
                <q-item-section avatar>
                  <q-avatar :icon="'img:'+user.team.logo" size="2.1rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{user.team.name}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable  v-close-popup to="/settings" >
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
            <q-avatar size="52px">
              <img :src="user.picture">
            </q-avatar>

            <div class="text-subtitle1 q-mt-xs q-mb-xs text-capitalize">{{user.name}}</div>

            <q-btn
              dense
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
                class="q-pb-sm"
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
                class="q-pb-sm"
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
                <q-btn to="/forgot-password" label="Forgot Password?" type="a" color="primary" size="sm" class="q-ml-sm" />
              </div>

              <div>
                <q-btn to="/register"  size="sm" push type="a" label="New Around? Register" class="full-width" />
              </div>
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
      // leagues: Array,
      email: '',
      password: '',
      remember: false,
    }
  },

  computed: {
    loggedIn: function () {
      return this.$store.getters.loggedIn
    },

    adminIn: function () {
      return this.$store.getters.adminIn
    },

    user: function () {
      return this.$store.getters.user
    }
  },

  created: function () {
    if (this.loggedIn) {
      if (this.$q.cookies.has('token')) {
        this.$store.dispatch('getUser', this.$q.cookies.get('token'))
      }
    }
  },

  methods: {
    onSubmit () {
      if (this.adminIn) {
        this.$store.dispatch('adminLogout')
      }
      let email = this.email
      let password = this.password
      let remember = this.remember
      this.$store.dispatch('login', { email, password, remember })
        .then(() => this.$router.push({ name: 'home' }))
        .catch(err => {
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: err.response.data.message
          })
          this.$router.push('/login')
        })
    },

    logout: function () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/')
      })
    },

    reset () {
      this.email = ''
      this.password = ''
      this.remember = false
    }
  },

}
</script>

<style>
</style>
