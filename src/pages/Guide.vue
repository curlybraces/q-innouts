<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-grow col-lg-6 col-md-7 col-sm-8 text-body text-justify">
        <div class="text-h4 text-center q-my-md q-py-sm bg-primary text-secondary">Innouts Guide</div>
           <p>
             This page is to help you know what is what in Innouts and provide general help.
           </p>
            <h5 class="q-my-md">Sign and Sell Cards</h5>
            <p>
               In each transfer window, <b>a fan</b> of a team, will receive a certain number of sign and sell cards, which they can use to add players to their sign or sell
               lists respectively. The formula by which your cards are calculated is as follows:
               number of sign/sell cards = 4 + user level + purchased sign/sell cards <br>
               You can allocate each card to a different player or more than 1 card to a single player should you see fit.
               You can edit your choices from your home page by editing the respective list.
               You will be able to see the 4 players most in demand or on selling list by fans of a club in the page of a team, under the innouts tab.
               The values will be percentage out of all the respective cards issued (sign or sell).
            </p>

            <h5 class="q-my-md">Ratings</h5>
            <p>
               You don't need to be a fan of any team to rate players, managers, transfers and rumours, but need be registered. You can rate any of the aforementioned
               entities out of 10 with the minimum being 1 except the rumours which are either up or down voted. A half star would translate into 1 with 10 being 5 stars.
               To change your previous rating, just refresh the page and rate again, and your rating is updated. To the next of a rating you can see a counter
               which shows number of people who have cast a vote.
               Have in mind that transfers are only rateable during their own windows.
            </p>

            <h5 class="q-my-md">Rankings</h5>
            <p>
               The rankings section offers rankings of teams, players, managers and fans based on different self-explanatory criteria. Players and managers rankings are all based on YOUR OPINION.
            </p>
            <h5 class="q-my-md">User Level</h5>
            <p>
               The user level is a measure of a users activity which goes up by your acitivity, like registering your favorite team, rating, etc. .
               It starts as 0 for all new members and increases overtime as described. You can see how far you are from the next level on your home page.
               Changing your team after the first time, will lower your level by one.
            </p>

            <h5 class="q-my-md">Trophies</h5>
            <p>
              We have only considered Uefa Champions League, Uefa Europa League, and each country's league and main cup competitions as major trophies.
              This was to make comparison between teams across the continent more consistent and fair.
            </p>

            <h5 class="q-my-md">Account</h5>
            <p>
               You can change personal, or account settings and favorite team from the settings link which you'll find by logging in and clicking on your
               name at the top right corner of the navigation bar.
            </p>

            <h6>from a team's fans broken down stats, to friend's profiles, there are a lot more to Innouts which we don't think need
               much explanation and hope you will enjoy them as much as we do!
             </h6>
      </div>
    </div>
    <div class="text-body text-center">
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'About',

  created () {
    this.$store.commit('setView', {
      view: 'hhh lpR fff'
    })
    this.$store.commit('setRightDrawer', false)
  },

  meta () {
    return {
      title: 'Guide | Innouts',

      meta: {
        description: { name: 'description', content: 'Innouts is a football community' },
        keywords: { name: 'keywords', content: ['Innouts', 'about Innouts'] },
      },
    }
  },
}
</script>

<style>
</style>
