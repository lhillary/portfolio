<template>
  <span
    class="lh-icon"
    :class="classes"
    :aria-label="ariaLabel"
  >
    <svg class="lh-icon-svg" v-if="useSvg">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#' + icon"></use>
    </svg>
    <slot v-else></slot>
  </span>
</template>

<script>
  export default {
    name: 'lh-icon',
    props: {
      icon: String,
      iconSet: {
        type: String,
        default: 'mu' // for icon fonts
      },
      colorReverse: {
        type: Boolean,
        default: false
      },
      ariaLabel: String,
      useSvg: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes() {
        return [
          `${this.iconSet}`,
          `${this.icon}`,
          { 'color-reverse': this.colorReverse }
        ]
      }
    }
  };
</script>

<style lang="scss" scoped>

  @import "../assets/sass/mixins.scss";

  .lh-icon {
    cursor: inherit;
    display: inline-block;
    font-size: 24px;
    height: 24px;
    user-select: none;
    vertical-align: middle;
    width: 24px;
    color: var(--color_fill);

    svg {
      display: block;
      fill: var(--color_fill);
      height: 24px;
      width: 24px;
      margin: 0;
      padding: 0;
    }

    &.color-reverse {
      color: var(--background-color);

      svg {
        fill: var(--background-color);
      }
    }
  }

</style>
