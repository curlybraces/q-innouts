<template>
  <div class="row inlin no-wrap shadow-1">
    <q-toolbar class="q-gutter-x-sm">

    <q-avatar clickable link to="/">
      <img class="bordered" src="~assets/innouts.png">
    </q-avatar>

      <q-toolbar-title>
        <router-link to="/" class="no-decor text-white text-h6">
          Innouts
        </router-link>
      </q-toolbar-title>

      <q-btn to="/editorials" no-caps  label="Editorials" />

      <q-btn-dropdown no-caps label="Transfers">
        <q-list dark dense class="bg-primary">
          <q-item clickable v-close-popup to="/transfers" active-class="text-accent">
            <q-item-section>
              <q-item-label>Finalised</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup to="/rumours" active-class="text-accent">
            <q-item-section>
              <q-item-label>Rumours</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-btn-dropdown no-caps label="Leagues" menu-self="top middle" menu-anchor="bottom middle">
        <div class="row bg-primary no-wrap q-pa-md">
          <div class="column">
            <q-list class="bg-secondary">
              <q-item v-for="league in leagues.slice(0,3)" :key="league.id" clickable dense v-close-popup :to="'/leagues/'+league.slug" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar :icon="'img:'+league.logo" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{league.name}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <q-separator vertical inset class="q-mx-sm" />
          <div class="column">
            <q-list class="bg-secondary">
              <q-item v-for="league in leagues.slice(3,5)" :key="league.id" clickable dense v-close-popup :to="'/leagues/'+league.slug" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar :icon="'img:'+league.logo" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{league.name}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item dense to="/leagues/others">
                <q-item-section avatar>
                  <q-avatar icon="star" color="secondary" size="2.1rem" text-color="whte" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Others</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-btn-dropdown>

      <q-btn-dropdown
        dark size="md" no-caps label="Teams" type="a"
        class="q-mx-s" menu-self="top middle" menu-ancho="bottom middle"
      >
        <div class="row bg-primary no-wrap q-pa-md">
          <div class="column">
            <q-list class="bg-secondary">
              <q-item v-for="team in teams.slice(0,4)" :key="team.id" clickable dense v-close-popup :to="'/teams/'+team.slug" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar :icon="'img:'+team.logo" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{team.name}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <q-separator vertical inset class="q-mx-sm" />
          <div class="column items-center">
            <q-list class="bg-secondary">
              <q-item v-for="team in teams.slice(4,8)" :key="team.id" clickable dense v-close-popup :to="'/teams/'+team.slug" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar :icon="'img:'+team.logo" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{team.name}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <q-separator vertical inset class="q-mx-sm" />

          <div class="column items-center">
            <q-list class="bg-secondary">
              <q-item v-for="team in teams.slice(8,12)" :key="team.id" clickable dense v-close-popup :to="'/teams/'+team.slug" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar :icon="'img:'+team.logo" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{team.name}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

        </div>
      </q-btn-dropdown>

      <q-btn to="/rankings" no-caps class="" color="" label="Rankings"  />

      <q-space />
      <q-space />
      <q-select
        dark
        filled
        dense
        v-model="selectedFriend"
        placeholder="Find friends"
        use-input
        hide-selected
        fill-input
        :input-debounce="600"
        :options="users"
        @filter="filterFn"
        @input="showUser"
        option-label="name"
        option-value="id"
        hide-dropdown-icon
      >
        <template v-slot:option="scope">
          <q-item
            dense
            v-if="scope.opt.picture"
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section>
              <q-avatar size="28px">
                <img :src="scope.opt.picture">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.name" />
            </q-item-section>
          </q-item>
          <q-item v-else :to="'/find/'+search" class="bg-secondary">
            <q-item-section class="text-center">View All</q-item-section>
          </q-item>
        </template>
        <template v-slot:no-option>
          <q-item dense>
            <q-item-section class="text-grey">
              Not a soul &#128128;
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-select>
      <!-- <q-space /> -->
      <q-btn-dropdown icon="perm_identity" class="gloss" rounde dens>
        <div v-if="loggedIn" class="row no-wrap q-pa-sm">
          <div class="column">
            <q-list class="bg-primar">
              <q-item clickable  v-close-popup to="/home" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="home" color="secondar" size="2.1rem" text-color="" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Home</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="user.team" clickable  v-close-popup :to="'/teams/'+user.team.slug" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar :icon="'img:'+user.team.logo" size="2.1rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{user.team.name}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable  v-close-popup to="/settings" active-class="text-accent">
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
              <img :src="user.picture">
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
                type="password"
                v-model="password"
                label="Password *"
                lazy-rules
                :rules="[
                  val => val.length >= 6 || 'Please use minimum 6 characters'
                ]"
                class="q-pb-sm"
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
  name: 'Header',

  props: {
    leagues: Array,
    teams: Array,
  },

  data () {
    return {
      email: '',
      password: '',
      remember: false,
      search: '',
      selectedFriend: null,
      users: [],
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

  watch: {
    $route () {
      this.reset()
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
            color: 'red-5',
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

    filterFn (val, update, abort) {
      if (val.length < 2) {
        abort()
        return
      }

      update(() => {
        this.$axios.get('api/friends', { params: { name: val } })
          .then(response => {
            let users = response.data.users
            if (users.length > 3) {
              this.search = val
              this.users = users.slice(0, 4)
              this.users.push({ name: 'View all', id: 'friends' })
            } else {
              this.users = users
            }
          })
          .catch(err => this.$q.notify({ message: err.data.message }))
      })
    },

    showUser (value) {
      this.$router.push({ name: 'profile', params: { user: value.id, slug: value.slug } })
    },

    reset () {
      this.email = ''
      this.password = ''
      this.remember = false
      this.search = ''
      this.selectedFriend = null
      this.users = []
    }

  },

}
</script>
<style>
</style>
