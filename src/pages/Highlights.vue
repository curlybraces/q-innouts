<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-grow col-sm-10 col-md-8 col-lg-6">
        <div id="title" class="text-center text-h4 q-my-md bg-primary q-pa-md text-white rounded-borders relative-position">
          Game Highlights
        </div>
        <iframe src="https://www.scorebat.com/embed/" frameborder="0" height="700" allowfullscreen  allow="autoplay; fullscreen" style="overflow:hidden;display:block;" class="_scorebatEmbeddedPlayer_ full-width"></iframe>
      </div>
    </div>
  </q-page>
</template>

<script>
/*eslint-disable */
export default {
  name: 'Highlights',

  meta () {
    return {
      title: 'Highlights - Innouts',

      meta: {
        description: { name: 'description', content: 'Watch football highlights here.' },
        keywords: { name: 'keywords', content: ['football goals', 'football highlights', 'match highlights', 'game highlights', 'premier league highlights'] },
      },
    }
  },
}


// (function (d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0]
//   if (d.getElementById(id)) return
//   js = d.createElement(s)
//   js.id = id
//   js.src = 'https://www.scorebat.com/embed/embed.js?v=mto'
//   fjs.parentNode.insertBefore(js, fjs)
// }(document, 'script', 'scorebat-jssdk'))

</script>
