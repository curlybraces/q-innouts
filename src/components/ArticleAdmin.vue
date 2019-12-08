<template>
  <div>
    <q-tabs
      v-model="articleTab"
      class="text-primary bg-secondary shadow-2 rounded-borders"
      active-bg-color="accen"
      active-color="accent"
    >
      <q-tab name="create" label="create" />
      <q-tab name="edit"  label="edit" />
    </q-tabs>
      <q-tab-panels
        v-model="articleTab"
        animated
        transition-prev="jump-up"
        transition-next="jump-up"
        class="bordered"
      >
        <q-tab-panel name="create">
          <div class="text-h5 q-pa-sm bordered bg-secondary">Create new article</div>
          <q-form
            @submit="onArticleSubmit"
            @reset="onArticleReset"
            class="q-gutter-sm"
          >
            <q-input v-model="articleTitle" label="title" class="q-mb-sm" />
            <q-editor v-model="articleBody" min-height="8rem" />
            <div class="row q-gutter-x-sm">
              <div class="col">
                <!-- <q-uploader
                  url="" label="Choose appropriate image" hide-upload-btn
                  accept="image/*" :max-file-size="400000"
                  class="q-my-sm" ref="article"
                /> -->
              <input type="file" accept="image/*" required ref="article">
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
                  option-label="nickname"
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
            <div v-for="(article, idx) in articleBag" :key="article.id">
              <q-item active-class="text-white bg-primary">
                <q-item-section avatar>
                  <q-avatar rounded size="3rem">
                    <img :src="article.picture">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <div v-html="article.title"></div>
                  <q-popup-edit :value="article.title" @input="cancelTitle($event, idx)" buttons title="Update" persistent>
                    <q-input
                      filled
                      type="text"
                      v-model="article.title"
                      :placeholder="article.title"
                      label="Title"
                    />
                  </q-popup-edit>
                </q-item-section>
                <q-item-section>
                  <q-editor v-model="article.body" min-height="5rem" />
                </q-item-section>
                <q-item-section side class="q-gutter-y-sm">
                  <q-btn color="red" text-color="white" label="Delete" @click="remove(article.id)" size="xs" v-close-popup />
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
  name: 'articleAdmin',

  data () {
    return {
      articleTab: 'create',
      articleTitle: '',
      articleBody: '',
      articles: [],
      teams: [],
      teamOptions: [],
      taggedTeams: [],
      players: [],
      playerOptions: [],
      taggedPlayers: [],
      remains: true,
      managers: [],
      managerOptions: [],
      taggedManagers: [],
      taggedLeagues: [],
      leagues: []
      // articleChunks: [],
      // articleBag: []
    }
  },

  computed: {
    articleChunks () {
      return chunk(this.articles, 5)
    },

    articleBag () {
      return this.articleChunks[0]
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

  methods: {
    fetchData () {
      this.$axios.get('api/articles')
        .then(response => {
          this.articles = response.data
        })
        .catch(error => {
          this.$q.notify({ message: error.data.message })
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Problem fetching the articles!'
          })
        })
    },

    onArticleReset () {
      this.articleTitle = ''
      this.articleBody = ''
      this.taggedPlayers = []
      this.taggedTeams = []
      this.taggedManagers = []
      this.taggedLeagues = []
      // this.$refs.article.reset()
      this.$refs.article.value = null
    },

    onArticleSubmit () {
      if (this.articleTitle.length && this.articleBody.length && this.$refs.article.files[0]) {
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
        formData.append('picture', this.$refs.article.files[0])
        formData.append('title', this.articleTitle)
        formData.append('body', this.articleBody)
        formData.append('taggedTeams', JSON.stringify(taggedTeamsIDs))
        formData.append('taggedPlayers', JSON.stringify(taggedPlayersIDs))
        formData.append('taggedManagers', JSON.stringify(taggedManagersIDs))
        formData.append('taggedLeagues', JSON.stringify(taggedLeaguesIDs))
        formData.append('admin_id', this.admin.id)
        let headers = {
          'Content-Type': 'multipart/form-data'
        }
        this.$axios.post('api/articles', formData, headers)
          .then(response => {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'article created!'
            })
            this.onArticleReset()
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
      this.$axios.delete('api/articles/' + id)
        .then(response => {
          this.fetchData()
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'article deleted!'
          })
        })
        .catch(error => {
          this.$q.notify({ message: error.data.message })
        })
    },

    cancelTitle (initValue, articleIdx) {
      this.articleBag[articleIdx].title = initValue
    },

    save (idx) {
      let article = this.articleBag[idx]
      this.$axios({ url: 'api/articles/' + article.id, data: { title: article.title, body: article.body }, method: 'PUT' })
        .then(response => {
          this.fetchData()
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'articled updated!'
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

    onLoad (index, done) {
      setTimeout(() => {
        if (this.articleChunks[index]) {
          this.articleBag.push(...this.articleChunks[index])
          done()
        }
        if (this.articleBag.length === this.articles.length) {
          this.remains = false
        }
      }, 2500)
    },
  }
}
</script>

<style>
</style>
