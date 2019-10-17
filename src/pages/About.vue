<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-grow col-lg-6 col-md-7 col-sm-8 text-body text-justify">
        <div class="text-h4 text-center q-my-lg q-py-sm bg-primary text-secondary">About Innouts</div>
        <p>
            Innouts is a football community,  bringing you top football transfers, important football rumours, latest football news and
            more. You can indicate the players you want your team to sign or sell in a transfer window, see how other people carry their bussiness, rate players, managers, transfers
            and much more. There is rankings section that reflect fans' opinions (which is the most important to us at Innouts).
            You can see and compare the popularity of your club against rivals, broken down stats about your club's fans, and more.
        </p>

        <h5 class="q-my-lg">Fan Driven</h5>
        <p>
            Built with the purpose of giving football fans the center stage they have always deserved but not received, we are very proud to contribute to
            this great cause. Football fans can register with their favorite team, rate players, managers and transfers.
            There are dedicated chat rooms for each football club's supporters to discuss their common love's affairs.
            Then comes the most amazing experience of having your say in the transfer market for your favorite club.
        </p>

        <h5 class="q-my-lg">Rankings</h5>
        <p>
            The ranking section provides a rather comprehensive ranking of teams, players, fans and managers all based on your valuable ratings.
            We believe no one is in a better position to rate the football world than those who make it exist and thrive in the first place. As such we are more than confident that
            our rankings are the most accurate one out of all there is.
        </p>

        <h5 class="q-my-lg">Community</h5>
        <p>
            Here at Innouts we very much fit the definition of a community and as such ask for values which bind a community together to be observed
            by all our valuable members.
        </p>

        <h5 class="q-my-lg">It's All About You</h5>
        <p>
            From the very beginning of this project the goal was to create a platform that will be fun and engaging for the football fans and one that can give
            them what they always have deserved; having a truly major role in football world. For us the fans always come first and hopefully you will
            like using this space.
        </p>

        <h5 class="q-my-lg">Contact</h5>
        <p>
            If you have any queries drop us a line at:
              info@innouts.com
        </p>
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
      title: 'About | Innouts',

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
