<template>
  <main class="container">
    <lh-navigation></lh-navigation>
    <router-view/>
    <lh-footer></lh-footer>
  </main>
</template>

<script>

  import LhNavigation from './components/Navigation'
  import LhFooter from './components/Footer'

  export default {
    name: 'portfolio',
    mounted() {
      document.body.classList.add('light');
    },
    components: {
      LhNavigation,
      LhFooter
    }
  }
</script>

<style lang="scss">
  @import './assets/sass/mixins.scss';
  @import './assets/sass/globals.scss';

  .container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0;
    transition: 0.5s ease-in background-color;
    background-color: var(--background-color);
  }

</style>
