<template>
  <lh-focus-container
    class="lh-popover"
    :class="classes"
    ref="focusContainer"
    role="dialog"

    :contain-focus="containFocus"
    :focus-redirector="focusRedirector"

    @focus-overflow="close()">
      <slot></slot>
    </lh-focus-container>
</template>

<script>
  import LhFocusContainer from './FocusContainer.vue';
  import tippy, {animateFill, roundArrow} from 'tippy.js';
  import 'tippy.js/dist/svg-arrow.css';
  import classlist from '../helpers/ClassList';
  import elementRef from '../helpers/ElementRef';
  import events from '../helpers/Events';

  export default {
    name: 'lh-popover',
    props: {
      appendToBody: {
        type: Boolean,
        default: true
      },
      closeOnScroll: {
        type: Boolean,
        default: true
      },
      constrainToScrollParent: {
        type: Boolean,
        default: true
      },
      containFocus: {
        type: Boolean,
        default: false
      },
      verticalOffset: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      },
      focusRedirector: Function,
      openOn: {
        type: String,
        default: 'click' // 'click', 'mouseenter', 'focus', or 'manual', plus 'hover'
      },
      position: {
        type: String,
        default: 'bottom-start'
      },
      trigger: {
          validator(value) {
              return elementRef.validate(
                value,
                '[UiPopover]: Invalid prop: "trigger". Expected Element, VueComponent or CSS selector string which matches an existing element.'
              );
          }
      },
      zIndex: Number,
      standardPopover: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        returnFocus: true
      }
    },
    computed: {
      classes() {
        return [
          { 'standard-lh-popover': this.standardPopover }
        ];
      },
    },
    watch: {
      disabled(value) {
        if (this.tip) {
          if (value === true) {
            this.tip.disable();
          } else {
            this.tip.enable();
          }
        }
      }
    },
    created() {
      this.tip = null;
    },
    mounted() {
      this.setupPopover();
    },
    beforeDestroy() {
      this.destroyPopover();
    },
    methods: {
      setupPopover() {
        this.triggerEl = elementRef.resolve(this.trigger, this.$el.parentElement);

        if (!this.triggerEl) {
          console.error('[UiPopover]: Trigger element not found.');
          return;
        }

        const options = {
          animateFill: false,
          animation: 'fade',
          appendTo: this.appendToBody ? document.body : this.triggerEl.parentElement,
          arrow: roundArrow,
          content: this.$el,
          delay: [0, 0],
          duration: 0,
          hideOnClick: true,
          ignoreAttributes: true,
          interactive: true,
          maxWidth: '100%',
          offset: [0,this.verticalOffset],
          onHidden: this.onHidden,
          onHide: this.onClose,
          onShow: this.onOpen,
          onShown: this.onShown,
          placement: this.position,
          plugins: [animateFill],
          role: 'dialog',
          theme: 'lh-popover',
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

        if (!this.constrainToScrollParent) {
          options.popperOptions.modifiers.preventOverflow = { enabled: false };
          options.popperOptions.modifiers.hide = { enabled: false };
        }

        this.tip = tippy(this.triggerEl, options);

        if (this.disabled) {
          this.tip.disable();
        }
      },
      destroyPopover() {
        if (this.tip) {
          this.removeCloseEventListeners();
          this.tip.destroy();
          this.tip = null;
        }
      },
      isOpen() {
        return this.tip && this.tip.state.isVisible;
      },
      open() {
        if (this.tip) {
          this.tip.show();
        }
      },
      close(options = { returnFocus: true }) {
        if (this.tip) {
          this.returnFocus = options.returnFocus;
          this.tip.hide();
        }
      },
      toggle(options = { returnFocus: true }) {
        if (this.tip) {
          this.returnFocus = options.returnFocus;
          this.tip[this.isOpen() ? 'hide' : 'show']();
        }
      },
      scheduleUpdate() {
        if (this.tip) {
          this.tip.popperInstance.scheduleUpdate();
        }
      },
      onOpen() {
        this.addCloseEventListeners();
        classlist.add(this.triggerEl, 'has-dropdown-open');
        this.$emit('open');
      },
      onClose() {
        if (this.returnFocus && this.lastFocusedElement) {
          this.lastFocusedElement.focus();
        }
        this.removeCloseEventListeners();
        classlist.remove(this.triggerEl, 'has-dropdown-open');
        this.$emit('close');

        this.returnFocus = true;
      },
      onShown() {
        this.lastFocusedElement = document.activeElement;
        this.$refs.focusContainer.focus();
        this.$emit('reveal');
      },
      onHidden() {
        this.$emit('hide');
      },
      closeOnExternal(event, closeOptions) {
        if (!this.$el.contains(event.target)) {
          this.close(closeOptions);
        }
      },
      addCloseEventListeners() {
        this.removeCloseEventListeners();

        setTimeout(() => {
          this.removeExternalClickListener = events.on('click', document, e => {
            this.closeOnExternal(e, { returnFocus: false });
          });
          this.removeEscListener = events.onKeydown(27, document, () => {
            this.close({ returnFocus: true });
          });
          if (this.closeOnScroll) {
            this.removeScrollListener = events.on('scroll', document, e => {
              this.closeOnExternal(e, { returnFocus: true });
            });
          }
        }, 0);
      },
      removeCloseEventListeners() {
        if (this.removeExternalClickListener) {
          this.removeExternalClickListener();
          this.removeExternalClickListener = null;
        }
        if (this.removeEscListener) {
          this.removeEscListener();
          this.removeEscListener = null;
        }
        if (this.removeScrollListener) {
          this.removeScrollListener();
          this.removeScrollListener = null;
        }
      }
    },
    components: {
      LhFocusContainer
    }
  }
</script>

<style lang="scss">
  @import "../assets/sass/tippy.scss";

  .standard-lh-popover {
    padding: 16px;
  }
</style>
