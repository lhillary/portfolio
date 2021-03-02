<template>
    <slide-menu :color-reverse="colorReverse" v-bind="this.$attrs" @openMenu="openMenu" @closeMenu="closeMenu">
        <slot></slot>
    </slide-menu>
</template>

<script>
    import SlideMenu from './SlideMenu';
    export default {
      name: 'lh-slide',
      props: {
        colorReverse: {
          type: Boolean,
          default: false
        }
      },
      components: {
        SlideMenu
      },
      methods: {
        openMenu() {
          this.$emit('openMenu');
        },
        closeMenu() {
          this.$emit('closeMenu');
        }
      }
    };
</script>