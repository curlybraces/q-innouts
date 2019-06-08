<template>
  <div>
    <div id="fans" class="q-mb-lg q-mb-md-none rounded-borders bg-t-darker">

      <div id="fans-line" class="row heading m-auto">
          <div class="col text-center text-h6 text-md-left">Fanbase</div>
          <div class="col text-center text-md-right">{{fansTotal}}</div>
      </div>

      <hr id="fan-border">

      <div class="text-center text-md-left">
        <q-btn-group push>
          <q-btn size="sm" push @click="first = !first" :style="{backgroundColor: team.color}" label="Country" icon="timeline" />
          <q-btn size="sm" push :style="{backgroundColor: team.color}" label="Gender" icon="visibility" />
          <q-btn size="sm" push :style="{backgroundColor: team.color}" label="Age" icon="update" />
        </q-btn-group>

        <div v-if="first">
          hehey
        </div>
            <!-- <q-expansion-item
              group="somegroup"
              icon="explore"
              label="First"
              default-opened
              header-class="text-primary"
            >
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                  commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                  eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item group="somegroup" icon="perm_identity" label="Second" header-class="text-teal">
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                  commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                  eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item> -->
        <!-- <a class="btn btn-sm  fans-btns mx-1" :style="{backgroundColor: team.color}" data-toggle="collapse" href="#country" role="button" aria-expanded="false" aria-controls="country">
          Country
        </a>
        <a class="btn btn-sm  fans-btns mr-1" :style="{backgroundColor: team.color}" data-toggle="collapse" href="#gender" role="button" aria-expanded="false" aria-controls="gender">
          Gender
        </a>
        <a class="btn btn-sm  fans-btns" :style="{backgroundColor: team.color}" data-toggle="collapse" href="#age" role="button" aria-expanded="false" aria-controls="age">
          Age
        </a> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FansStats',

  props: {
    team: Object
  },

  data () {
    return {
      first: false,
    }
  }
}
</script>

<style lang="stylus">

#fan-border
  border: 2px solid #f1f1f1;

</style>
