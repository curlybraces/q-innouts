<template>
  <div>
    <div class="row justify-center">
      <div class="col-sm-9 bg-secondary border-primary rounded-borders">
        <div class="row q-pa-md">
          <div class="col-sm-9">
            <q-chat-message
              name="me"
              avatar="https://cdn.quasar.dev/img/avatar3.jpg"
              :text="['hey, how are you?']"
              stamp="7 minutes ago"
              sent
              bg-color="amber-7"
            />
            <q-chat-message
              name="Jane"
              avatar="https://cdn.quasar.dev/img/avatar5.jpg"
              :text="[
                'doing fine, how r you?',
                'I just feel like typing a really, really, REALY long message to annoy you...'
              ]"
              size="6"
              stamp="4 minutes ago"
              text-color="white"
              bg-color="primary"
            />
            <q-chat-message
              name="Jane"
              avatar="https://cdn.quasar.dev/img/avatar5.jpg"
              :text="['Did it work?']"
              stamp="1 minutes ago"
              size="6"
              text-color="white"
              bg-color="primary"
            />
            <q-chat-message
              name="Jane"
              avatar="https://cdn.quasar.dev/img/avatar5.jpg"
              text-color="white"
              bg-color="primary"
            >
              <q-spinner-dots size="2rem" />
            </q-chat-message>
          </div>
          <div class="col-sm-3 bg-primary text-white">
            <div class="q-pa-sm" style="max-width: 350px">
              <q-list bordered separator>
                <q-item clickable v-ripple>
                  <q-item-section>Single line item</q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section>
                    <q-item-label>Item with caption</q-item-label>
                    <q-item-label caption>Caption</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>Image avatar</q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section>
                    <q-item-label overline>OVERLINE</q-item-label>
                    <q-item-label>Item with caption</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chatroom',

  data () {
    return {}
  },

  created () {

  },
}
</script>

<style>
</style>
