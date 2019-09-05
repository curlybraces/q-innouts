<template>
  <div>
      <q-list
        no-border
        link
        dense
        inset-delimiter
        class="bg-secondary"
      >
      <q-item-label header>{{team}} Squad</q-item-label>
        <div v-for="(mate) in teammates" :key="mate.id">
          <q-item :to="'/players/'+mate.id" active-class="text-white bg-primary"  clickable v-ripple>
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

  </div>
</template>

<script>
export default {
  name: 'TeammatesColumn',

  data: () => ({
    // teammates: ['Joe', 'Jack']
  }),

  props: {
    teammates: Array,
    team: String,
  },

  methods: {
    // setPlayer (id) {
    //   this.$emit('newPlayer', id)
    // }
  }
}
</script>

<style>
</style>
