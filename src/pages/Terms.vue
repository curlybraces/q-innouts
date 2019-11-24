<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-grow col-lg-6 col-md-7 col-sm-8 text-body1 text-justify">
        <div class="text-h4 text-center q-my-lg q-py-sm bg-primary text-secondary">Terms of Service</div>
               <h5 class="q-my-md">Your Access</h5>
               <p>
                   Access to our site is permitted on a temporary basis, and we reserve the
               right to withdraw or amend the service we provide on our site without notice. We will not be liable if for any reason
               our site is unavailable at any time or for any period. If you choose, or you are provided with, a user identification
               code, password or any other piece of information as part of our security procedures, you must treat such information
               as confidential, and you must not disclose it to any third party. We have the right to disable any user identification
               code or password, whether chosen by you or allocated by us, at any time, if in our opinion you have failed to comply
               with any of the provisions of these terms of use. You are responsible for making all arrangements necessary for
               you to have access to our site. You are also responsible for ensuring that all persons who access our site through
               your internet connection are aware of these terms, and that they comply with them.
            </p>
               <h5 class="q-my-md">  Rights   </h5>
               <p>
               We are the owner or the licensee of all intellectual property rights in our site, and in the material published
               on it. Those works are protected by copyright laws and treaties around the world. All such rights are reserved.
               You must not use any part of the materials on our site for any commercial purposes without obtaining a licence to
               do so from us or our licensors. Our status (and that of any identified contributors) as the authors of material
               on our site must always be acknowledged. You may print off one copy, and may download extracts, of any page(s) from
               our site for your personal reference. You must not modify the paper or digital copies of any materials you have
               printed off or downloaded in any way, and you must not use any illustrations, photographs, video or audio sequences
               or any graphics separately from any accompanying text. If you print off, copy or download any part of our site in
               breach of these terms of use, your right to use our site will cease immediately and you must, at our option, return
               or destroy any copies of the materials you have made.
            </p>
            <h5 class="q-my-md">Changes</h5>
            <p>
               Our Site Changes Regularly We aim to update our site regularly,
               and may change the content at any time. If the need arises, we may suspend access to our site, or close it indefinitely.
               Any of the material on our site may be out of date at any given time, and we are under no obligation to update such
               material.
            </p>
            <h5 class="q-my-md">Reliance on Our Information</h5>
            <p>
               Materials posted on our site are not intended to amount
               to advice on which reliance should be placed. We therefore disclaim all liability and responsibility arising from
               any reliance placed on such materials by any visitor to our site, or by anyone who may be informed of any of its
               contents.
            </p>
            <h5 class="q-my-md">Our Liabilities</h5>
            <p>
               The material and information displayed on our site is provided without any guarantees, conditions
               or warranties as to its accuracy. Nothing in these terms of use affects our liability
               for death or personal injury arising from our negligence, nor our liability for fraudulent misrepresentation or
               misrepresentation as to a fundamental matter, nor any other liability which cannot be excluded or limited under
               applicable law.
            </p>
             <h5 class="q-my-md">Your Liabilities</h5>
            <p>
               You shall indemnify and hold harmless Innouts, from any claims, liabilities, costs and expenses that may arise as a result of your breach
               of these terms of use or a breach of any laws of any jurisdiction applicable to you.
            </p>
            <h5 class="q-my-md">Your Information</h5>
            <p>
                We process information about you in accordance with our <router-link to="/privacy-policy"> privacy policy</router-link>. By using our site, you
               consent to such processing and you warrant that all data provided by you is accurate.
            </p>

            <h5 class="q-my-md">Offences</h5>
            <p>
               You must not misuse our site by knowingly introducing viruses, trojans, worms, logic bombs or other material
               which is malicious or technologically harmful. You must not attempt to gain unauthorised access to our site, the
               server on which our site is stored or any server, computer or database connected to our site. You must not attack
               our site via a denial-of-service attack or a distributed denial-of service attack. By breaching this provision,
               you would commit a criminal offence under the Computer Misuse Act 1990. We will report any such breach to the relevant
               law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In
               the event of such a breach, your right to use our site will cease immediately. We will not be liable for any loss
               or damage caused by a distributed denial-of-service attack, viruses or other technologically harmful material that
               may infect your computer equipment, computer programs, data or other proprietary material due to your use of our
               site or to your downloading of any material posted on it, or on any website linked to it.
            </p>

            <h5 class="q-my-md">Links</h5>
            <p>
               Our site contains links to other sites and resources, which are provided for your
               information only. We have no control over the contents of those sites or resources, and accept no responsibility
               for them or for any loss or damage that may arise from your use of them.
            </p>

            <h5 class="q-my-md">Jurisdiction</h5>
            <p>
               The English courts will have exclusive jurisdiction over any claim arising from, or related to, a visit to our site. These terms
               of use and any dispute or claim arising out of or in connection with them or their subject matter or formation (including
               non-contractual disputes or claims) shall be governed by and construed in accordance with the law of England and
               Wales.
            </p>

            <h5 class="q-my-md">Trademark</h5>
            <p>
               “Innouts” is a trademark exclusively owned by us.
            </p>

            <h5 class="q-my-md">Variations</h5>
            <p>
               We may revise these terms at any time by amending this page. You are expected to check this page from time to time to take notice of
               any changes we made, as they are binding on you. Some of the provisions contained in these terms of use may also
               be superseded by provisions or notices published elsewhere on our site.
            </p>

            <h5 class="q-my-md">Concerns</h5>
            <p>
               If you have any concerns about material which appears on our site, please email:
               info@innouts.com.
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
      title: 'Terms | Innouts',

      meta: {
        description: { name: 'description', content: 'Innouts terms of service' },
        keywords: { name: 'keywords', content: ['Innouts', 'Innouts terms of service'] },
      },
    }
  },
}
</script>

<style>
</style>
