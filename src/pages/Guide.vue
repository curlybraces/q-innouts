<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-grow col-lg-6 col-md-7 col-sm-8 text-body1 text-justify">
        <div class="text-h4 text-center q-my-md q-py-sm bg-primary text-secondary">Innouts Guide</div>
           <p>
             This page is to help you know what is what in Innouts and provide general help.
           </p>
            <h5 class="q-my-md">In and Out Cards</h5>
            <div>
               In each transfer window, a fan of a team, will receive a certain number of In and Out cards, which they can use to add players to their In or Out
               lists respectively. The formula by which your cards are calculated is as follows: <br>
               <div class="text-weight-medium q-my-md"> # of In/Out cards = 4 + user level (rounded down) + purchased In/Out cards (optional) </div>
               Each card can be allocated to a different player or more than 1 card to a single player should you see fit.
               You can edit your choices from your home page by editing the respective list and view the players most in demand or wanted out by a team's fans
               in that team's page, under the innouts tab.
               The card bars show percentage out of all the respective cards issued (In or Out).
            </div>
            <h5 class="q-my-md">User Level</h5>
            <p>
               The user level is a measure of a users activity which goes up by your acitivity, like registering your favorite team, rating, etc. .
               It starts as 0 for all new members and increases overtime as described. For each level upgrade, you will receive an extra In and Out cards.
               You can see your level and how far you are from the next level on your home page.
               Changing your team after the first time, will lower your level by one.
            </p>
            <h5 class="q-my-md">Account</h5>
            <p>
               You can change personal or account settings, favorite team, etc. from the settings page which you'll find by logging in and clicking on the
               profile button at the top right corner of the navigation bar and going to settings.
            </p>
            <h5 class="q-my-md">Ratings</h5>
            <p>
              You don't need to be a fan of any team to rate players, managers, transfers and rumours, but need be registered. You can rate players and managers
              out of 10 with the minimum being 1, where a half star would translate into 1 and 10 being 5 stars. But the rumours are either up or down voted and transfers are rated out of 5.
              To change your previous rating, just cast another vote, and your rating is updated. To the next of a rating you can see a counter
              which shows number of people who have cast a vote.
              Have in mind that transfers are only rateable during the time their respective window is open except for the biggest transfers of latest window which
              are available on the homepage.
            </p>

            <h5 class="q-my-md">Rankings</h5>
            <p>
               The rankings section offers a comprehensive rankings of teams, players, managers and fans based on different self-explanatory criteria.
               Players and managers rankings are all based on YOUR OPINION. We believe no one is in a better position to rate the football world than those
               who make it exist and thrive in the first place. As such we are more than confident that
              our rankings are the most accurate out of competition!
            </p>
            <h5 class="q-my-md">Stats</h5>
              <div class="q-ml-md">
                <div class="text-weight-medium">Leagues</div>
                <p>
                  For each league there are some interesting stats displayed like the level of internationalization of its players, average player ratings,
                  average player value, age, etc. which makes comparison of the Europe's top five leagues bit easier and consistent.
                </p>
              </div>
              <div class="q-ml-md">
                <div class="text-weight-medium">Teams</div>
                <p>
                  Mostly the same as leagues stats along with a trophy cabinet (if any) are also displayed on each team's page that serve as a brief intro to that team!
                  In addition there is the fanbase section that provides the total number of fans a team has got on Innouts and breaks them down by
                  country, gender and age.
                </p>
              </div>
            <h5 class="q-my-md">Trophies</h5>
            <p>
              We have only considered Uefa Champions League, Uefa Europa League, and each country's league and main cup competitions as major trophies.
              This was to make comparison between teams across the continent more consistent and fair.
            </p>
            <h5 class="q-my-md">Coverage</h5>
            <p>
              Right now we only cover top five European leagues along with some of the bigger teams across Europe. This could well change in future but
              our limited resources impose this at this time.
            </p>
            <h5 class="q-my-md">Contact</h5>
            <div>
              You can reach out to us with any ideas, suggestions, complaints or if you need any help through: <br>
              <div class="q-mt-sm">&#128231;support@innouts.com</div>
            </div>
            <h5>From your profiles, to the brilliant quotes (if ever noticed!), there is a lot more to Innouts which don't need
               much explanation and we hope you will enjoy them!
            </h5>
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
