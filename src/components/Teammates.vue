<template>
  <div>
      <q-list
        no-border
        link
        dense
        inset-delimiter
        class="bg-secondary"
      >
      <q-item-label header> <q-img class="team-thumbnail q-mr-md" contain :src="team.logo" /> {{team.name}} Squad</q-item-label>
        <div v-for="(mate) in teammates" :key="mate.id">
          <q-item :to="'/players/'+mate.id+'/'+mate.slug" active-class="text-white bg-primary"  clickable v-ripple>
            <q-item-section avatar>
              <q-avatar rounded>
                <q-img :src="mate.picture" placeholder-src="statics/images/picSoon.jpg" />
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

  props: {
    teammates: Array,
    team: Object,
  },

}
</script>

<style>
</style>
