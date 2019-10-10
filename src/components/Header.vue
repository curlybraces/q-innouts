<template>
  <div class="row inlin no-wrap shadow-1">
    <q-toolbar class="q-gutter-x-sm">

    <q-avatar clickable link to="/">
      <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
    </q-avatar>

      <q-toolbar-title>
        <router-link to="/" class="no-decor text-white">
          Innouts
        </router-link>
      </q-toolbar-title>

      <q-btn to="/editorials" no-caps class="glossy" color="blue-grey-7" label="Editorials" />

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
              <q-item clickable dense v-close-popup to="/leagues/1" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/league_logos/premier-league.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Premier League</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable dense v-close-popup to="/leagues/2" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/league_logos/la-liga.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>La Liga</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable dense v-close-popup to="/leagues/3" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/league_logos/serie-a.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Serie A</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <q-separator vertical inset class="q-mx-sm" />

          <div class="column">
            <q-list class="bg-secondary">
              <q-item clickable dense v-close-popup to="/leagues/4" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/league_logos/bundesliga.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Bundesliga</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable dense v-close-popup to="/leagues/5" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/league_logos/ligue-1.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Ligue 1</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable dense v-close-popup to="/leagues/4" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/club_logos/barcelona.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Eredivisie</q-item-label>
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
              <q-item clickable dense v-close-popup to="/teams/22" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/club_logos/real-madrid.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Real Madrid</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable dense v-close-popup to="/teams/21" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/club_logos/barcelona.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Barcelona</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable dense v-close-popup to="/teams/14" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/club_logos/manchester-united.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Man. United</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable dense v-close-popup to="/teams/62" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/club_logos/bayern-munchen.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Bayern</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <q-separator vertical inset class="q-mx-sm" />

          <div class="column items-center">
            <q-list class="bg-secondary">
              <q-item clickable dense v-close-popup to="/teams/6" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/club_logos/chelsea.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Chelsea</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable dense v-close-popup to="/teams/12" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/club_logos/liverpool.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Liverpool</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable dense v-close-popup to="/teams/41" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/club_logos/juventus.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Juventus</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable dense v-close-popup to="/teams/13" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/club_logos/manchester-city.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Man. City</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <q-separator vertical inset class="q-mx-sm" />

          <div class="column items-center">
            <q-list class="bg-secondary">
              <q-item clickable dense v-close-popup to="/teams/79" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/club_logos/psg.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>PSG</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable dense v-close-popup to="/teams/1" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/club_logos/arsenal.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Arsenal</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable dense v-close-popup to="/teams/24" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/club_logos/atletico-madrid.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Atletico</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable dense v-close-popup to="/teams/61" active-class="text-accent">
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/club_logos/borussia-dortmund.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>BVB</q-item-label>
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
          <q-item>
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
      <q-btn-dropdown icon="perm_identity" class="gloss" rounde dense>
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
              <q-item v-if="user.team" clickable  v-close-popup :to="'/teams/'+user.team_id" active-class="text-accent">
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
  data () {
    return {
      // leagues: [],
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
          .catch(err => console.log(err))
      })
    },

    showUser (value) {
      this.$router.push({ name: 'profile', params: { user: value.id } })
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
