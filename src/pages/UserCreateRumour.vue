<template>
  <q-page padding>
    <div class="text-h5 q-pa-sm bordered bg-secondary">Submit Your Rumour</div>
    <div class="q-my-sm text-caption">
      <ul>
        <li>Submitting a rumour will contrubute to your level.</li>
        <li>Please make it a concise title and brief, clear body.</li>
        <li>Please make sure the image you upload is of 16/9 ratio and the width no more than 300 pixel.</li>
        <li>The rumour will be reviewed and if approved, then published.</li>
        <li>If your selected image returns an error, your rumour has still been SAVED.</li>
        <li>Submitting non-relevant material could result in penalties and/or being banned.</li>
      </ul>
    </div>
    <q-form @submit="onRumourSubmit" @reset="onRumourReset" class="q-gutter-sm">
      <q-input v-model="rumourTitle" label="title" class="q-mb-sm" />
      <q-editor v-model="rumourBody" min-height="8rem" />
      <div class="row q-my-md">
        <div class="col">
          (Optional) image?<input type="file" accept="image/*" ref="rumour" class="q-mx-sm" />
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
            style="max-width: 400px"
          />
        </div>
      </div>
      <div class="q-mt-lg">
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>

export default {
  // name: 'PageName',
  data: () => {
    return {
      rumourTitle: '',
      rumourBody: '',
      teams: [],
      teamOptions: [],
      taggedTeams: [],
    }
  },

  computed: {
    user: function () {
      return this.$store.state.user
    }
  },

  meta () {
    return {
      title: 'Submit Rumours - Innouts',

      meta: {
        description: { name: 'description', content: 'submit your football rumours here.' },
        keywords: { name: 'keywords', content: ['football rumours', 'submit football rumour', 'your football rumours'] },
      },
    }
  },

  created () {
    this.$store.commit('setRightDrawer', false)
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
  },

  methods: {
    onRumourReset () {
      this.rumourTitle = ''
      this.rumourBody = ''
      this.taggedTeams = []
      this.$refs.rumour.value = null
    },

    onRumourSubmit () {
      if (this.rumourTitle.length > 10 && this.rumourBody.length > 40) {
        let taggedTeamsIDs = []
        this.taggedTeams.forEach(element => {
          taggedTeamsIDs.push(element.id)
        })
        let formData = new FormData()
        if (this.$refs.rumour.files[0]) {
          formData.append('picture', this.$refs.rumour.files[0])
        }
        formData.append('title', this.rumourTitle)
        formData.append('body', this.rumourBody)
        formData.append('taggedTeams', JSON.stringify(taggedTeamsIDs))
        formData.append('user_id', this.user.id)
        let headers = {
          'Content-Type': 'multipart/form-data'
        }
        this.$axios.post('api/rumours', formData, headers)
          .then(response => {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Rumour submitted, thanks!'
            })
            this.onRumourReset()
          })
          .catch(error => {
            this.$q.notify({
              color: 'negative',
              textColor: 'secondary',
              message: error.response.data.message
            })
          })
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Problem with title, body or picture!'
        })
      }
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
  }

}
</script>
