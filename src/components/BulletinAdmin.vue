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
            <q-editor v-model="bulletinBody" min-height="8rem" />
            <q-uploader
              url="" label="Choose appropriate image" hide-upload-btn
              style="max-width: 300px" accept="image/*" :max-file-size="800000"
              class="q-my-sm" ref="bulletin"
            />
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
            <div v-for="(bullet, idx) in bulletins" :key="bullet.id">
              <q-item active-class="text-white bg-primary">
                <q-item-section avatar>
                  <q-avatar rounded size="3rem">
                    <img :src="bullet.picture">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
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
                </q-item-section>
                <q-item-section>
                  <q-editor v-model="bullet.body" min-height="5rem" />
                </q-item-section>
                <q-item-section side class="q-gutter-y-sm">
                  <q-btn color="red" text-color="white" label="Delete" @click="remove(bullet.id)" size="xs" v-close-popup />
                  <q-btn color="green" class="full-width" text-color="white" label="Save" @click="save(idx)" size="sm" v-close-popup />
                </q-item-section>
              </q-item>
              <q-separator />
            </div>
          </q-list>
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
      bulletins: []
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
      this.$axios.get('api/bulletins')
        .then(response => {
          this.bulletins = response.data
        })
        .catch(error => {
          console.log(error)
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Problem fetching the bulletins!'
          })
        })
    },

    onBulletinReset () {
      this.bulletinTitle = ''
      this.bulletinBody = ''
      this.$refs.bulletin.reset()
    },

    onBulletinSubmit () {
      if (this.bulletinTitle.length && this.bulletinBody.length && this.$refs.bulletin.files[0]) {
        let formData = new FormData()
        formData.append('picture', this.$refs.bulletin.files[0])
        formData.append('title', this.bulletinTitle)
        formData.append('body', this.bulletinBody)
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
            console.log(error)
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
        .catch(err => {
          console.log(err)
        })
    },

    saveTitle (val, initValue) {

    },

    cancelTitle (initValue, bulletIdx) {
      this.bulletins[bulletIdx].title = initValue
    },

    save (idx) {
      let bullet = this.bulletins[idx]
      this.$axios({ url: 'api/bulletins/' + bullet.id, data: { title: bullet.title, body: bullet.body }, method: 'PUT' })
        .then(response => {
          this.fetchData()
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Bulletind updated!'
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
    }
  }
}
</script>

<style>
</style>
