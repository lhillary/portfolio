<template>
  <div class="projects">
    <lh-main-lead :text="text" :header="header"></lh-main-lead>
    <lh-projects></lh-projects>
  </div>
</template>

<script>

  import LhMainLead from '../components/MainLead'
  import LhProjects from '../components/Projects'

export default {
  name: 'Projects',
  data() {
    return {
      text: 'I Believe In Clean And Functional Code And Design. Check Out My Work And Hit Me Up!',
      header: 'My Projects'
    }
  },
  components: {
    LhMainLead,
    LhProjects
  }
}
</script>
