<template>
  <div class="lh-tooltip">
    <slot></slot>
  </div>
</template>

<script>
  import tippy from 'tippy.js';
  import 'tippy.js/dist/svg-arrow.css';
  import elementRef from '../helpers/ElementRef';

  export default {
    name: 'lh-tooltip',
    props: {
      appendToBody: {
        type: Boolean,
        default: true
      },
      openOn: {
        type: String,
        default: 'mouseenter focus'
      },
      position: {
        type: String,
        default: 'bottom'
      },
      trigger: {
        validator(value) {
          return elementRef.validate(
            value, '[LhTooltip]: Invalid prop: "trigger". Expected Element, VueComponent or CSS selector string'
          );
        }
      },
      zIndex: Number
    },
    mounted() {
      this.triggerEl = elementRef.resolve(this.trigger, this.$el.parentElement);

      if (!this.triggerEl) {
        console.error('[LhTooltip]: Trigger element not found.');
        return;
      }

      const options = {
        animation: 'fade',
        arrow: false,
        content: this.$el,
        delay: [0, 0],
        offset: [0, 6],
        duration: 0,
        ignoreAttributes: true,
        placement: this.position,
        theme: 'lh-tooltip',
        trigger: this.openOn.replace('hover', 'mouseenter'),
        zIndex: this.zIndex,
        popperOptions: {
          modifiers: {
            computeStyle: {
              gpuAcceleration: !(window.devicePixelRatio < 1.5 && /Win/.test(navigator.platform))
            }
          }
        }
      };

      if (!this.appendToBody) {
        options.appendTo = this.triggerEl.parentElement;
      }

      this.tip = tippy(this.triggerEl, options);
    },
    beforeDestroy() {
      if (this.tip) {
        this.tip.destroy();
        this.tip = null;
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/sass/tippy.scss";
</style>
