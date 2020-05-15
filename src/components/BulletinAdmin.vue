<template>
  <div>
    <q-tabs
      v-model="bullTab"
      class="text-primary bg-secondary shadow-2 rounded-borders"
      active-bg-color="accen"
      active-color="accent"
    >
      <q-tab name="create" label="create" />
      <q-tab name="edit"  label="edit" />
    </q-tabs>
      <q-tab-panels
        v-model="bullTab"
        animated
        transition-prev="jump-up"
        transition-next="jump-up"
        class="bordered"
      >
        <q-tab-panel name="create">
          <div class="text-h5 q-pa-sm bordered bg-secondary">Create new bulletin</div>
          <q-form
            @submit="onBulletinSubmit"
            @reset="onBulletinReset"
            class="q-gutter-sm"
          >
            <q-input v-model="bulletinTitle" label="title" class="q-mb-sm" />
            <div class="q-mt-lg text-bold">Short body</div>
            <q-editor v-model="bulletinBody" min-height="8rem" />
            <input type="file" accept="image/*" required ref="bulletin">
            <div class="q-mt-lg text-bold">Extended Body (optional)</div>
            <q-editor v-model="bulletinExtended" min-height="8rem" />
            <div class="row q-gutter-x-sm">
              <div class="col">
                <q-select
                  filled
                  v-model="taggedTeams"
                  multiple
                  :options="teamOptions"
                  option-label="name"
                  option-value="id"
                  use-input
                  input-debounce="100"
                  @filter="filterTeams"
                  use-chips
                  stack-label
                  label="Tagged teams"
                />
              </div>
              <div class="col">
                <q-select
                  filled
                  v-model="taggedPlayers"
                  multiple
                  :options="playerOptions"
                  option-label="slug"
                  option-value="id"
                  use-input
                  input-debounce="100"
                  @filter="filterFn"
                  use-chips
                  stack-label
                  label="Tagged players"
                />
              </div>
              <div class="col">
                <q-select
                  filled
                  v-model="taggedManagers"
                  multiple
                  :options="managerOptions"
                  option-label="nickname"
                  option-value="id"
                  use-input
                  input-debounce="100"
                  @filter="filterManagers"
                  use-chips
                  stack-label
                  label="Tagged managers"
                />
              </div>
              <div class="col">
                <q-select
                  filled
                  v-model="taggedLeagues"
                  multiple
                  :options="leagues"
                  option-label="name"
                  option-value="id"
                  use-chips
                  stack-label
                  label="Tagged leagues"
                />
              </div>
            </div>
          <div class="q-mt-lg">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
          </q-form>
        </q-tab-panel>
        <q-tab-panel name="edit">
          <q-markup-table dense >
          <thead>
            <tr class="text-left">
              <th>Img</th>
              <th>Title</th>
              <th>Body</th>
              <th>Extended Body?</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(bullet, idx) in bulletins" :key="bullet.id">
                <td avatar>
                  <q-avatar rounded size="3rem">
                    <img :src="bullet.picture">
                  </q-avatar>
                </td>
                <td>
                  <div v-html="bullet.title"></div>
                  <q-popup-edit :value="bullet.title" @save="saveTitle" @input="cancelTitle($event, idx)" buttons title="Update" persistent>
                    <q-input
                      filled
                      type="text"
                      v-model="bullet.title"
                      :placeholder="bullet.title"
                      label="Title"
                    />
                  </q-popup-edit>
                </td>
                <td>
                  <q-editor v-model="bullet.body" min-height="5rem" />
                </td>
                <td v-if="bullet.extended">
                  <q-editor v-model="bullet.extended" min-height="5rem" />
                </td>
                <td v-else></td>
                <td class="q-gutter-y-sm">
                  <q-btn color="green" class="q-mr-xs" text-color="white" label="Save" @click="save(idx)" size="sm" v-close-popup />
                  <q-btn color="red" text-color="white" label="Delete" @click="remove(bullet.id)" size="xs" v-close-popup />
                </td>
            </tr>
            </tbody>
          </q-markup-table>
        </q-tab-panel>
      </q-tab-panels>
  </div>
</template>

<script>
export default {
  name: 'BulletAdmin',

  data () {
    return {
      bullTab: 'create',
      bulletinTitle: '',
      bulletinBody: '',
      bulletinExtended: '',
      bulletins: [],
      teams: [],
      teamOptions: [],
      taggedTeams: [],
      players: [],
      playerOptions: [],
      taggedPlayers: [],
      managers: [],
      managerOptions: [],
      taggedManagers: [],
      taggedLeagues: [],
      leagues: []
    }
  },

  computed: {
    admin: function () {
      return this.$store.getters.admin
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      this.$axios.get('api/bulletins', { params: { amount: 10 } })
        .then(response => {
          this.bulletins = response.data
        })
        .catch(error => {
          this.$q.notify({ message: error.data.message })
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Problem fetching the bulletins!'
          })
        })
      this.$axios.get('api/teams')
        .then(response => {
          this.teams = response.data
          this.teamOptions = this.teams
        })
        .catch(error => {
          this.$q.notify({ message: error.data.message })
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Problem fetching teams!'
          })
        })
      this.$axios.get('api/players')
        .then(response => {
          this.players = response.data
          this.playerOptions = this.players
        })
        .catch(error => {
          this.$q.notify({ message: error.data.message })
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Problem fetching players!'
          })
        })
      this.$axios.get('api/managers')
        .then(response => {
          this.managers = response.data
          this.managerOptions = this.managers
        })
        .catch(error => {
          this.$q.notify({ message: error.data.message })
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Problem fetching managers!'
          })
        })
      this.$axios.get('api/leagues')
        .then(response => {
          this.leagues = response.data
        })
        .catch(error => {
          this.$q.notify({ message: error.data.message })
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Problem fetching managers!'
          })
        })
    },

    onBulletinReset () {
      this.bulletinTitle = ''
      this.bulletinBody = ''
      this.bulletinExtended = ''
      this.taggedPlayers = []
      this.taggedTeams = []
      this.taggedManagers = []
      this.taggedLeagues = []
      this.$refs.bulletin.value = null
    },

    onBulletinSubmit () {
      if (this.bulletinTitle.length && this.bulletinBody.length && this.$refs.bulletin.files[0]) {
        let taggedPlayersIDs = []
        let taggedTeamsIDs = []
        let taggedManagersIDs = []
        let taggedLeaguesIDs = []
        this.taggedTeams.forEach(element => {
          taggedTeamsIDs.push(element.id)
        })
        this.taggedPlayers.forEach(element => {
          taggedPlayersIDs.push(element.id)
        })
        this.taggedManagers.forEach(element => {
          taggedManagersIDs.push(element.id)
        })
        this.taggedLeagues.forEach(element => {
          taggedLeaguesIDs.push(element.id)
        })
        let formData = new FormData()
        formData.append('picture', this.$refs.bulletin.files[0])
        formData.append('title', this.bulletinTitle)
        formData.append('body', this.bulletinBody)
        if (this.bulletinExtended.length > 20) {
          formData.append('extended', this.bulletinExtended)
        }
        formData.append('taggedTeams', JSON.stringify(taggedTeamsIDs))
        formData.append('taggedPlayers', JSON.stringify(taggedPlayersIDs))
        formData.append('taggedManagers', JSON.stringify(taggedManagersIDs))
        formData.append('taggedLeagues', JSON.stringify(taggedLeaguesIDs))
        formData.append('admin_id', this.admin.id)
        let headers = {
          'Content-Type': 'multipart/form-data'
        }
        this.$axios.post('api/bulletins', formData, headers)
          .then(response => {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Bulletin created!'
            })
            this.onBulletinReset()
          })
          .catch(error => {
            this.$q.notify({ message: error.data.message })
          })
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Title, body and picure are not filled!'
        })
      }
    },

    remove (id) {
      this.$axios.delete('api/bulletins/' + id)
        .then(response => {
          this.fetchData()
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Bulletin deleted!'
          })
        })
        .catch(error => {
          this.$q.notify({ message: error.data.message })
        })
    },

    saveTitle (val, initValue) {

    },

    cancelTitle (initValue, bulletIdx) {
      this.bulletins[bulletIdx].title = initValue
    },

    save (idx) {
      let bullet = this.bulletins[idx]
      this.$axios({ url: 'api/bulletins/' + bullet.id, data: { title: bullet.title, body: bullet.body, extended: bullet.extended }, method: 'PUT' })
        .then(response => {
          this.fetchData()
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Bulletin updated!'
          })
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

    filterTeams (val, update) {
      if (val === '') {
        update(() => {
          this.teamOptions = this.teams
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.teamOptions = this.teams.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },

    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.playerOptions = this.players
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.playerOptions = this.players.filter(v => v.slug.toLowerCase().indexOf(needle) > -1)
      })
    },

    filterManagers (val, update) {
      if (val === '') {
        update(() => {
          this.managerOptions = this.managers
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.managerOptions = this.managers.filter(v => v.slug.toLowerCase().indexOf(needle) > -1)
      })
    },
  }
}
</script>

<style>
</style>
