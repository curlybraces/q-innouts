<template>
  <div>
    <q-tabs
      v-model="rumourTab"
      class="text-primary bg-secondary shadow-2 rounded-borders"
      active-bg-color="accen"
      active-color="accent"
    >
      <q-tab name="create" label="create" />
      <q-tab name="edit"  label="edit" />
    </q-tabs>
      <q-tab-panels
        v-model="rumourTab"
        animated
        transition-prev="jump-up"
        transition-next="jump-up"
        class="bordered"
      >
        <q-tab-panel name="create">
          <div class="text-h5 q-pa-sm bordered bg-secondary">Create new rumour</div>
          <q-form
            @submit="onRumourSubmit"
            @reset="onRumourReset"
            class="q-gutter-sm"
          >
            <q-input v-model="rumourTitle" label="title" class="q-mb-sm" />
            <q-editor v-model="rumourBody" min-height="8rem" />
            <div class="row q-gutter-x-sm">
              <div class="col">
                <!-- <q-uploader
                  url="" label="Choose appropriate image" hide-upload-btn
                  accept="image/*" :max-file-size="400000"
                  class="q-my-sm" ref="rumour"
                /> -->
              <input type="file" accept="image/*" ref="rumour">
              </div>
            </div>
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
              <!-- <th>Img</th> -->
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          </q-markup-table>
          <q-list
            no-border
            inset-delimiter
            class=""
          >
          <q-infinite-scroll @load="onLoad" :offset="100">
            <div v-for="(rumour, idx) in rumourBag" :key="rumour.id">
              <q-item active-class="text-white bg-primary">
                <q-item-section avatar>
                  <q-avatar rounded size="3rem">
                    <img :src="rumour.picture">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <div v-html="rumour.title"></div>
                  <q-popup-edit :value="rumour.title" @input="cancelTitle($event, idx)" buttons title="Update" persistent>
                    <q-input
                      filled
                      type="text"
                      v-model="rumour.title"
                      :placeholder="rumour.title"
                      label="Title"
                    />
                  </q-popup-edit>
                </q-item-section>
                <q-item-section>
                  <q-editor v-model="rumour.body" min-height="5rem" />
                </q-item-section>
                <q-item-section side class="q-gutter-y-sm">
                  <q-btn color="red" text-color="white" label="Delete" @click="remove(rumour.id)" size="xs" v-close-popup />
                  <q-btn color="green" class="full-width" text-color="white" label="Save" @click="save(idx)" size="sm" v-close-popup />
                </q-item-section>
              </q-item>
              <q-separator />
            </div>
            <template v-if="remains" v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
  </div>
</template>

<script>

const chunk = function (array, size) {
  if (!array.length) {
    return []
  }
  const head = array.slice(0, size)
  const tail = array.slice(size)

  return [head, ...chunk(tail, size)]
}

export default {
  name: 'RumourAdmin',

  data () {
    return {
      rumourTab: 'create',
      rumourTitle: '',
      rumourBody: '',
      rumours: [],
      teams: [],
      teamOptions: [],
      taggedTeams: [],
      players: [],
      playerOptions: [],
      taggedPlayers: [],
      managers: [],
      managerOptions: [],
      taggedManagers: [],
      remains: true,
    }
  },

  computed: {
    rumourChunks () {
      return chunk(this.rumours, 5)
    },

    rumourBag () {
      return this.rumourChunks[0]
    },

    admin: function () {
      return this.$store.getters.admin
    }
  },

  created () {
    this.fetchData()
    this.$axios.get('api/teams')
      .then(response => {
        this.teams = response.data
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
  },

  methods: {
    fetchData () {
      this.$axios.get('api/rumours')
        .then(response => {
          this.rumours = response.data
        })
        .catch(error => {
          this.$q.notify({ message: error.data.message })
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Problem fetching the rumours!'
          })
        })
    },

    onRumourReset () {
      this.rumourTitle = ''
      this.rumourBody = ''
      this.taggedPlayers = []
      this.taggedTeams = []
      // this.$refs.rumour.reset()
      this.$refs.rumour.value = null
    },

    onRumourSubmit () {
      if (this.rumourTitle.length && this.rumourBody.length) {
        let taggedPlayersIDs = []
        let taggedTeamsIDs = []
        let taggedManagersIDs = []
        this.taggedTeams.forEach(element => {
          taggedTeamsIDs.push(element.id)
        })
        this.taggedPlayers.forEach(element => {
          taggedPlayersIDs.push(element.id)
        })
        this.taggedManagers.forEach(element => {
          taggedManagersIDs.push(element.id)
        })
        let formData = new FormData()
        if (this.$refs.rumour.files[0]) {
          formData.append('picture', this.$refs.rumour.files[0])
        }
        formData.append('title', this.rumourTitle)
        formData.append('body', this.rumourBody)
        formData.append('taggedTeams', JSON.stringify(taggedTeamsIDs))
        formData.append('taggedPlayers', JSON.stringify(taggedPlayersIDs))
        formData.append('taggedManagers', JSON.stringify(taggedManagersIDs))
        formData.append('admin_id', this.admin.id)
        let headers = {
          'Content-Type': 'multipart/form-data'
        }
        this.$axios.post('api/rumours', formData, headers)
          .then(response => {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'rumour created!'
            })
            this.onRumourReset()
          })
          .catch(error => {
            this.$q.notify({ message: error.data.message })
          })
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Title, body and picture are not filled!'
        })
      }
    },

    remove (id) {
      this.$axios.delete('api/rumours/' + id)
        .then(response => {
          this.fetchData()
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'rumour deleted!'
          })
        })
        .catch(error => {
          this.$q.notify({ message: error.data.message })
        })
    },

    cancelTitle (initValue, rumourIdx) {
      this.rumourBag[rumourIdx].title = initValue
    },

    save (idx) {
      let rumour = this.rumourBag[idx]
      this.$axios({ url: 'api/rumours/' + rumour.id, data: { title: rumour.title, body: rumour.body }, method: 'PUT' })
        .then(response => {
          this.fetchData()
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'rumourd updated!'
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
        this.playerOptions = this.players.filter(v => v.slug.indexOf(needle) > -1)
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

    onLoad (index, done) {
      setTimeout(() => {
        if (this.rumourChunks[index]) {
          this.rumourBag.push(...this.rumourChunks[index])
          done()
        }
        if (this.rumourBag.length === this.rumours.length) {
          this.remains = false
        }
      }, 2500)
    },
  }
}
</script>

<style>
</style>
