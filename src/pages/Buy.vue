<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-grow col-lg-6 col-md-7 col-sm-8">
        <q-form
          @submit="onContinue"
          @reset="onReset"
          class="q-gutter-sm"
        >
          <div class="text-h5 bg-primary text-secondary q-my-md q-pa-md rounded-borders">Purchase Innouts Cards</div>
          <div class="row q-gutter-sm">
            <div class="col-grow col-sm">
              <q-card>
                <q-card-section class="bg-green-2">&#128525; In</q-card-section>
                <q-card-section>
                  <q-markup-table dense class="q-my-sm">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Price</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <q-badge color="" align="middle" class="float-rigt" title="these cards are valid until the end of the active transfer window, i.e. current window (if inside a window) or next.">
                            <q-icon name="info" color="white" />
                          </q-badge>
                          Temporary Card
                        </td>
                        <td>£1</td>
                        <td>
                          <q-input filled  type="number" v-model="tempIn" :rules="[ val => val >= 0 || 'Wrong number' ]" lazy-rules dense autofocus />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <q-badge color="" align="top" class="" title="these cards are timeless, i.e. you will have them forever!">
                            <q-icon name="info" color="white" />
                          </q-badge>
                          Permanent Card
                        </td>
                        <td>£7</td>
                        <td>
                          <q-input filled type="number" v-model="permIn" :rules="[ val => val >= 0 || 'Wrong number' ]" dense autofocus />
                        </td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-grow col-sm">
              <q-card>
                <q-card-section class="bg-red-2">&#128548; Out</q-card-section>
                <q-card-section>
                  <q-markup-table dense class="q-my-sm">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Price</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <q-badge color="" align="middle" class="float-rigt" title="these cards are valid until the end of the active transfer window, i.e. current window (if inside a window) or next.">
                            <q-icon name="info" color="white" />
                          </q-badge>
                          Temporary Card
                        </td>
                        <td>£2</td>
                        <td>
                          <q-input filled type="number" v-model="tempOut" :rules="[ val => val >= 0 || 'Wrong number' ]" dense autofocus />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <q-badge color="" align="top" class="" title="these cards are timeless, i.e. you will have them forever!">
                            <q-icon name="info" color="white" />
                          </q-badge>
                          Permanent Card
                        </td>
                        <td>£10</td>
                        <td>
                          <q-input filled type="number" v-model="permOut" :rules="[ val => val >= 0 || 'Wrong number' ]" dense />
                        </td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <div class="row justify-center q-my-md">
            <q-item class="q-pa-md">
              <q-item-section side>Total</q-item-section>
              £{{total}}
            </q-item>
          </div>
          <div class="row justify-center q-mb-md">
            <q-btn label="Continue" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
        <!-- <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick">
        <input type="hidden" name="hosted_button_id" value="FY2GH2DYQGE2Q">
        <input type="image" src="https://www.paypalobjects.com/en_US/GB/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online!">
        <img alt="" border="0" src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif" width="1" height="1">
        </form> -->
        <div v-show="payForm" ref="card" class="q-my-lg bg-secondary q-pa-lg rounded-borders bordered">
          <div id="card-element">
            <!-- Elements will create input elements here -->
          </div>

          <!-- We'll put the error messages in this element -->
          <div id="card-errors" role="alert"></div>

          <div class="row justify-cente">
            <q-btn label="Buy" id="submit" color="positive" size="sm" class="q-mx-auto q-mt-md" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'Buy',

  // components: { Card },

  data () {
    return {
      tempIn: 0,
      permIn: 0,
      tempOut: 0,
      permOut: 0,
      clientSecret: null,
      payForm: false,
    }
  },

  computed: {
    user () {
      return this.$store.state.user
    },

    total: function () {
      return (this.tempIn * 1) + (this.tempOut * 2) + (this.permIn * 7) + (this.permOut * 10)
    }
  },

  meta () {
    return {
      title: 'Purchase Cards - Innouts',

      // JS tags
      script: {
        stripe: { src: 'https://js.stripe.com/v3/' },
      },
    }
  },

  beforeUpdate () {
    /* eslint-disable */
    // Set your publishable key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    var stripe = Stripe('pk_test_8CzJJAUKTTpZlI9e71y9gLac00bkyma7F2');
    var elements = stripe.elements();

    // Set up Stripe.js and Elements to use in checkout form
    var style = {
      base: {
        // color: "#32325d",
        border: '1px solid #D8D8D8',
        borderRadius: '4px',
        color: "#000",
      }
    };

    var card = elements.create("card", { style: style });
    card.mount("#card-element");
    /* eslint-disable */
  },

  methods: {
    onContinue () {
      if (this.total > 0) {
        this.$q.loading.show()
        this.$axios({ url: 'api/buy', data: { user_id: this.user.id, tempIn: parseInt(this.tempIn), tempOut: parseInt(this.tempOut), permIn: parseInt(this.permIn), permOut: parseInt(this.permOut), total: parseInt(this.total) }, method: 'POST' })
          .then(response => {
            this.clientSecret = response.data.message
            this.payForm = true
            // console.log(response.data.message)
            // makeReady()
            // let card = elements.create('card')
            // card.mount(this.$refs.card)
            this.$q.loading.hide()
          })
          .catch(error => {
            console.log(error)
            this.$q.loading.hide()
          })
      }
    },

    onReset () {
      this.tempIn = 0
      this.permIn = 0
      this.tempOut = 0
      this.permOut = 0
      this.clientSecret = null
      this.payForm = false
    }
  }
}
</script>

<style lang="stylus" >
.stripe-card
  width: 300px
  border: 1px solid grey

.stripe-card.complete
  border-color: green
</style>
