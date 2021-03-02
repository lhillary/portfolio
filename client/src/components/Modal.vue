<template>
  <transition :name="toggleTransition" @after-enter="onEnter" @after-leave="onLeave">
    <div
      class="lh-modal lh-modal-mask"
      :class="classes"
      :role="role"

      v-show="isOpen"
    >
      <div
        class="lh-modal-wrapper"

        :class="{ 'has-dummy-scrollbar': preventShift }"
        :style="alignTopStyle"
      >
        <lh-focus-container
          class="lh-modal-container"
          ref="focusContainer"
          tabindex="-1"

          @keydown.native.stop.esc="onEsc"
        >
          <div
            class="lh-modal-header"
            v-if="!removeHeader"
          >
            <slot name="header">
              <h1 class="lh-modal-header-text">{{ title }}</h1>
            </slot>
            <div class="lh-modal-close-button">
              <lh-close-button color-reverse @click="close" v-if="dismissOnCloseButton && !removeCloseButton && dismissible"></lh-close-button>
            </div>
          </div>
          <div class="lh-modal-body">
            <slot></slot>
          </div>
          <div class="lh-modal-footer" v-if="!removeFooter">
            <slot name="footer"></slot>
          </div>
        </lh-focus-container>
      </div>
    </div>
  </transition>
</template>

<script>

  import LhCloseButton from './CloseButton.vue';
  import LhFocusContainer from './FocusContainer.vue';
  import classlist from '../helpers/ClassList';

  export default {
    name: 'lh-modal',
    props: {
      title: {
        type: String,
        default: 'lh Modal Title'
      },
      size: {
        type: String,
        default: 'normal' // normal, large, fullscreen
      },
      role: {
        type: String,
        default: 'dialog'
      },
      alignTop: {
        type: Boolean,
        default: false
      },
      alignTopMargin: {
        type: Number,
        default: 0
      },
      preventShift: {
        type: Boolean,
        default: false
      },
      transition: {
        type: String,
        default: 'scale-down' // could potentially add more here, but keeping this as default right now
      },
      noEase: {
        type: Boolean,
        default: false
      },
      removeHeader: {
        type: Boolean,
        default: false
      },
      removeFooter: {
        type: Boolean,
        default: false
      },
      removeCloseButton: {
        type: Boolean,
        default: false
      },
      dismissible: {
        type: Boolean,
        default: true
      },
      dismissOn: {
        type: String,
        default: 'esc close-button'
      }
    },
    data() {
      return {
        isOpen: false,
        lastFocusedElement: null
      }
    },
    computed: {
      classes() {
        return [
          `lh-modal-size-${this.size}`,
          { 'has-footer': !this.removeFooter },
          { 'has-header': !this.removeHeader },
          { 'is-open': this.isOpen },
          { 'is-aligned-top': this.alignTop },
          { 'no-ease': this.noEase }
        ];
      },
      toggleTransition() {
        return `lh-modal-transition-${this.transition}`;
      },
      alignTopStyle() {
        if (this.alignTop) {
          return { 'padding-top': this.alignTopMargin + 'px' };
        }

        return null;
      },
      dismissOnCloseButton() {
        return this.dismissOn.indexOf('close-button') > -1;
      },
      dismissOnEsc() {
        return this.dismissOn.indexOf('esc') > -1;
      }
    },
    watch: {
      isOpen() {
        this.$nextTick(() => {
          this[this.isOpen ? 'onOpen' : 'onClose']();
        });
      }
    },
    beforeDestroy() {
      if (this.isOpen) {
        this.returnFocus();
      }
    },
    methods: {
      open() {
        this.isOpen = true;
      },
      close() {
        if (!this.dismissible) {
          return;
        }

        this.isOpen = false;
      },
      redirectFocus() {
        this.$refs.focusContainer.focus();
      },
      returnFocus() {
        if (this.lastFocusedElement) {
          this.lastFocusedElement.focus();
        }
      },
      onEsc() {
        if (this.dismissOnEsc) {
          this.close();
        }
      },
      onOpen() {
        this.lastFocusedElement = document.activeElement;
        this.$refs.focusContainer.focus();

        classlist.add(document.body, 'lh-modal-is-open');
        this.incrementOpenModalCount();

        this.$emit('open');
      },
      onClose() {
        this.returnFocus();
        this.$emit('close');
      },
      onEnter() {
        this.$emit('reveal');
      },
      onLeave() {
        this.$emit('hide');

        const newCount = this.decrementOpenModalCount();

        if (newCount === 0) {
          classlist.remove(document.body, 'lh-modal-is-open');
        }
      },
      getOpenModalCount() {
        const count = document.body.getAttribute('data-lh-open-modals');
        return count === undefined ? 0 : Number(count);
      },
      setOpenModalCount(count) {
        const normalizedCount = Math.max(0, count);

        if (normalizedCount === 0) {
          document.body.removeAttribute('data-lh-open-modals');
        } else {
          document.body.setAttribute('data-lh-open-modals', normalizedCount);
        }

        return normalizedCount;
      },
      incrementOpenModalCount() {
        return this.setOpenModalCount(this.getOpenModalCount() + 1);
      },
      decrementOpenModalCount() {
        return this.setOpenModalCount(this.getOpenModalCount() -1);
      }
    },
    components: {
      LhCloseButton,
      LhFocusContainer
    }
  }
</script>

<style lang="scss" scoped>

  @import "../assets/sass/mixins.scss";
  @import "../assets/sass/globals.scss";

  .lh-modal {
    font-size: $lh-modal-font-size;
    font-family: $lh-modal-font-family;

    &.is-aligned-top {

      .lh-modal-wrapper {
        vertical-align: initial;
      }

      &.has-footer .lh-modal-body {
        max-height: calc(100vh - #{$lh-modal-header-height + $lh-modal-footer-height + 32px});
      }
    }

    &.has-footer {

      .lh-modal-body {
        max-height: calc(100vh - #{$lh-modal-header-height + $lh-modal-footer-height + 32px});
      }

      &:not(.has-header) {

        .lh-modal-body {
          max-height: calc(100vh - #{$lh-modal-footer-height + 32px});
        }
      }
    }

    &:not(.has-footer) {

      .lh-modal-body {
        padding: 16px 24px 24px;
      }
    }

    &.no-ease {

      .lh-modal-mask {
        transition: none;
      }

      .lh-modal-container {
        transition: none;
      }
    }
  }

  .lh-modal-is-open {
    overflow: hidden;
  }

  .lh-modal-mask {
    background-color: $lh-modal-mask-background;
    display: table;
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    transition: opacity $lh-modal-transition-duration ease;
    width: 100%;
    z-index: $z-index-modal;
    margin: 0 !important;
  }

  .lh-modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    overflow-x: hidden;
    text-align: center;

    &.has-dummy-scrollbar {
      overflow-y: scroll;
    }
  }

  .lh-modal-container {
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    display: inline-block;
    margin: 0 auto;
    max-height: 100vh;
    max-width: 100vw;
    outline: none;
    overflow: hidden;
    padding: 0;
    text-align: initial;
    transition: all $lh-modal-transition-duration ease;
    width: 600px;
  }

  .lh-modal-header {
    align-items: center;
    background-color: var(--color_fill);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.16);
    display: flex;
    justify-content: center;
    height: $lh-modal-header-height;
    padding: 0 24px;
    position: relative;
    z-index: 1;
  }

  .lh-modal-header-text {
    color: var(--button-text-color);
    align-items: center;
    display: flex;
    justify-content: center;
    flex-grow: 1;
    font-size: $lh-modal-header-font-size;
    font-weight: 600;
    margin: 0;
  }

  .lh-modal-close-button {
    margin-left: auto;
    margin-right: -8px;
  }

  .lh-modal-body {
    max-height: calc(100vh - #{$lh-modal-header-height});
    overflow-y: auto;
    padding: 16px 24px;
    font-size: 16px;
  }

  .lh-modal-footer {
    align-items: center;
    display: flex;
    height: $lh-modal-footer-height;
    justify-content: center;
    padding: 0 24px;

    .lh-button {
      margin-left: 8px;

      &:first-child {
        margin-left: 0;
      }
    }
  }

  .lh-modal-transition-scale-down-enter,
  .lh-modal-transition-scale-down-leave-active {
    opacity: 0;

    .lh-modal-container {
      transform: scale(1.1);
    }
  }

  .lh-modal-size-normal {

    & > .lh-modal-wrapper > .lh-modal-container {
      width: 600px;
    }
  }

  .lh-modal-size-large {

    & > .lh-modal-wrapper > .lh-modal-container {
      width: 1000px;
    }
  }

  .lh-modal-size-fullscreen {

    &.has-header {
      & > .lh-modal-wrapper > .lh-modal-container {
        width: 100vw;

        .lh-modal-body {
          height: calc(100vh - #{$lh-modal-header-height});
        }
      }
    }

    &.has-footer {

      & > .lh-modal-wrapper > .lh-modal-container {
        width: 100vw;

        .lh-modal-body {
          height: calc(100vh - #{$lh-modal-footer-height + 32px});
        }
      }
    }

    &.has-footer.has-header {

      & > .lh-modal-wrapper > .lh-modal-container {
        width: 100vw;

        .lh-modal-body {
          height: calc(100vh - #{$lh-modal-header-height + $lh-modal-footer-height + 32px});
        }
      }
    }
  }

</style>
