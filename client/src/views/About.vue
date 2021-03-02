<template>
  <div class="about">
      <lh-secondary-lead :text="text"></lh-secondary-lead>
      <lh-content :smallcaps="smallcaps" :paragraphs="paragraphs"></lh-content>
  </div>
</template>

<script>

  import LhSecondaryLead from '../components/SecondaryLead'
  import LhContent from '../components/Content'

  export default {
    name: 'lh-about',
    data() {
      return {
        text: 'Design. Develop. Maintain. My Experience.',
        smallcaps: 'A Bit About Me And My Experience',
        paragraphs: [
          {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue, sem quis molestie maximus, sem odio varius nisl, vitae aliquam dolor orci quis orci. Curabitur malesuada, lacus eu placerat suscipit, ipsum felis faucibus est, pellentesque feugiat risus odio sit amet ex. Morbi mollis ipsum libero, eget ullamcorper mauris elementum malesuada. Vivamus ultrices, ex quis dictum finibus, tellus augue pharetra dolor, sit amet pretium tellus lectus a tellus.'
          },{
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue, sem quis molestie maximus, sem odio varius nisl, vitae aliquam dolor orci quis orci. Curabitur malesuada, lacus eu placerat suscipit, ipsum felis faucibus est, pellentesque feugiat risus odio sit amet ex.'
          }
        ] 
      }
    },
    components: {
      LhSecondaryLead,
      LhContent
    }
  }
</script>

<style lang="scss" scoped>

    @import "../assets/sass/mixins.scss";
    @import "../assets/sass/globals.scss";

</style>
