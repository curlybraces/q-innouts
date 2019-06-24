<template>
  <div>
    <!-- <q-scroll-area class="fit q-pa-sm"> -->
      <q-list
        no-border
        link
        dense
        inset-delimiter
        class="bg-secondary"
      >
      <q-item-label header>Club Teammates</q-item-label>
        <!-- <q-list-header>Teammates</q-list-header> -->
        <div v-for="(mate, index) in teammates" :key="mate.id">
          <q-item :to="'/players/'+mate.id" @click="setPlayer(index)" active-class="text-primar bg-accent"  clickable v-ripple>
            <q-item-section avatar>
              <q-avatar rounded>
                <img :src="mate.picture">
              </q-avatar>
            </q-item-section>
            <q-item-section>{{mate.nickname}}</q-item-section>
            <q-item-section side>{{mate.specificPosition}}</q-item-section>
          </q-item>
          <q-separator />
        </div>
      </q-list>
    <!-- </q-scroll-area> -->
  </div>
</template>

<script>
export default {
  name: 'TeammatesColumn',

  data: () => ({
    // teammates: ['Joe', 'Jack']
  }),

  props: {
    teammates: Array
  },

  methods: {
    setPlayer (id) {
      this.$emit('newPlayer', id)
    }
  }
}
</script>

<style>
</style>
