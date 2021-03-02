<template>
  <component class="lh-focus-container" :is="tag">
    <span
      class="lh-focus-redirector"
      tabindex="0"

      @focus="redirectFocus($event, { isTabbingForward: false })"
      v-if="renderRedirector"
    ></span>
    <div class="lh-focus-content" ref="content" tabindex="-1">
      <slot></slot>
    </div>

    <span
      class="lh-focus-last"
      ref="lastFocusable"
      tabindex="-1"

      v-if="!disabled && containFocus"
    ></span>

    <span
      class="lh-focus-redirector"
      tabindex="0"

      @focus="redirectFocus($event, { isTabbingForward: true })"
      v-if="renderRedirector"
    ></span>
  </component>
</template>

<script>
  export default {
    name: 'lh-focus-container',
    props: {
      containFocus: {
        type: Boolean,
        default: true
      },
      focusRedirector: Function,
      disabled: {
        type: Boolean,
        default: false
      },
      tag: {
        type: String,
        default: 'div'
      },
      lazy: {
        type: Boolean,
        default: false
        }
    },
    computed: {
      renderRedirector() {
        if (this.disabled) {
          return false;
        }

        return this.lazy ? this.containFocus : true;
      }
    },
    methods: {
      focus() {
        this.$refs.content.focus();
      },
      redirectFocus(e, options) {
        if (!this.containFocus) {
          this.$emit('focus-overflow', e, options);
        }

        e.stopPropagation();

        if (this.focusRedirector) {
          this.focusRedirector(e, options);
          return;
        }

        if (options.isTabbingForward) {
          this.$refs.content.focus();
        } else {
          this.$refs.lastFocusable.focus();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .lh-focus-redirector,
  .lh-focus-last {
    opacity: 0;
    position: absolute;
  }

  .lh-focus-content {
    outline: none;
  }

</style>
