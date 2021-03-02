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
            text: 'Front-End web developer previously in web UI/UX design. Attended Detroit Grand Circus bootcamp in 2018 to bridge my design and development skills and have been working in web development professionally since. Focused on combining my development knowledge with my passion for design to deliver beautiful and well-designed web experiences.'
          },{
            text: 'One of the things I enjoy most about web development is the limitless opportunities for learning; being able to tool around with something new and shiny (so frequently) is something that I consider to be a professional privilege. I am currently working on learning more about the AWS environment, and also finally diving into React after getting a decent grasp on Vue.js.'
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
