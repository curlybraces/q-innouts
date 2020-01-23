<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-grow col-lg-6 col-md-7 col-sm-8 text-body1 text-justify ">
        <div class="text-h4 text-center q-my-lg q-py-sm bg-primary text-secondary">About</div>
        <p>
            Innouts is a football hub, bringing you latest top football transfers, rumours, stories and
            more. You can take on an active role in the transfer activity of your team, by indicating which players you want your team to sign
            or sell in a transfer window, and also rate players, managers and transfers. There is the rankings section that reflects fans' opinions (most important here).
            Furthermore can see and compare the popularity of your team against rivals, broken down stats of a team's fans and players among many other things
            you can explore for yourself.
        </p>
        <h5 class="q-my-md">Fan-Centered</h5>
        <p>
            From the very beginning of this project the goal was to create a platform that will be fun and engaging for the football fans and one that gives
            you what you deserve; having a truly major role in football world. For us the fans always come first and hopefully you will
            see its manifestation throughout!
        </p>
        <h5 class="q-my-md">Community</h5>
        <p>
            At Innouts we very much fit the definition of a community and as such ask for values that bind a community together to be observed
            by all our valuable members.
        </p>

        <h5 class="q-my-md">Contact</h5>
        <p>
            If you have any queries drop us a line at: <br>
              &#128231; info@innouts.com
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
