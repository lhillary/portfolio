<template>
  <component
    class="lh-icon-button"
    :aria-label="ariaLabel || tooltip"
    :class="classes"
    :disabled="disabled"
    :href="isAnchor ? (disabled ? null : href) : null"
    :is="isAnchor ? 'a' : 'button'"
    :type="isAnchor ? null : buttonType"

    @click="onClick"
  >
    <div class="lh-icon-button-icon" v-if="icon || $slots.default">
      <slot>
        <lh-icon :color-reverse="colorReverse" :icon="icon"></lh-icon>
      </slot>
    </div>
    <div class="lh-icon-button-focus"></div>
    <lh-popover
      :class="popoverClasses"
      contain-focus
      ref="dropdown"
      standard-popover
      :append-to-body="appendDropdownToBody"
      :constrain-to-scroll-parent="constrainDropdownToScrollParent"
      :position="dropdownPosition"
      :open-on="openDropdownOn"

      @close="onDropdownClose"
      @open="onDropdownOpen"

      v-if="hasDropdown"
    >
      <slot name="dropdown"></slot>
    </lh-popover>
    <lh-tooltip
      :open-on="openTooltipOn"
      :position="tooltipPosition"

      v-if="tooltip"
    >
      {{ tooltip }}
    </lh-tooltip>
  </component>
</template>

<script>

  import LhIcon from './Icon.vue';
  import LhPopover from './Popover.vue';
  import LhTooltip from './Tooltip.vue';

  export default {
    name: 'lh-icon-button',
    props: {
      buttonType: String,
      href: String,
      colorReverse: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'standard' // or small or large
      },
      icon: String,
      ariaLabel: String,
      hasDropdown: {
        type: Boolean,
        default: false
      },
      hasMenu: {
        type: Boolean,
        default: false
      },
      dropdownPosition: {
        type: String,
        default: 'bottom-start'
      },
      appendDropdownToBody: {
        type: Boolean,
        default: true
      },
      constrainDropdownToScrollParent: {
        type: Boolean,
        default: true
      },
      openDropdownOn: {
        type: String,
        default: 'click' // or hover or focus
      },
      tooltip: String,
      openTooltipOn: String,
      tooltipPosition: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes() {
        return [
          `lh-icon-button-size-${this.size}`,
          { 'is-anchor': this.isAnchor },
          { 'is-disabled': this.disabled || this.loading },
          { 'color-reverse': this.colorReverse },
          { 'has-dropdown': this.hasDropdown }
        ];
      },
      popoverClasses() {
        return {
          'has-menu': this.hasMenu
        };
      },
      isAnchor() {
        return this.href !== undefined;
      }
    },
    methods: {
      onClick(e) {
        this.$emit('click', e);
      },
      onDropdownOpen() {
        this.$emit('dropdown-open');
      },
      onDropdownClose() {
        this.$emit('dropdown-close');
      },
      openDropdown() {
        if (this.$refs.dropdown) {
          this.$refs.dropdown.open();
        }
      },
      closeDropdown() {
        if (this.$refs.dropdown) {
          this.$refs.dropdown.close();
        }
      },
      toggleDropdown() {
        if (this.$refs.dropdown) {
          this.$refs.dropdown.toggle();
        }
      }
    },
    components: {
      LhIcon,
      LhPopover,
      LhTooltip
    }
  }
</script>

<style lang="scss" scoped>

  @import "../assets/sass/mixins.scss";

  .lh-icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border-radius: 50%;
    border: none;
    cursor: default;
    margin: 0;
    outline: none;
    overflow: hidden;
    padding: 0;
    position: relative;

    &,
    .lh-icon-button-focus {
      height: $lh-icon-button-size;
      width: $lh-icon-button-size;
    }

    body[modality="keyboard"] &:focus {

      .lh-icon-button-focus {
        opacity: 1;
        transform: scale(1);
      }
    }

    &::-moz-focus-inner {
      border: 0;
    }


    &.is-anchor {
      cursor: pointer;
      text-decoration: none;

      &.is-disabled {
        cursor: default;
      }
    }

    &.is-disabled {
      opacity: 0.6;
    }
  }

  .lh-icon-button-icon {
    align-items: center;
    color: var(--on-background-color);
    display: flex;
    height: initial;
    justify-content: center;
    opacity: 1;
    position: relative;
    transition-delay: 0.1s;
    transition: opacity 0.2s ease;
    width: 100%;
    z-index: 1;

    .lh-icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .lh-icon-button-focus {
    border-radius: 50%;
    height: $lh-icon-button-size;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transform-origin: center;
    transform: scale(0);
    transition: transform 0.3s ease, opacity 0.3s ease;
    width: $lh-icon-button-size;
  }

  .lh-icon-button-size-small {

    &,
    .lh-icon-button-focus {
      height: $lh-icon-button-size-small;
      width: $lh-icon-button-size-small;
    }

    .lh-icon {
      font-size: 18px;
    }
  }

  .lh-icon-button-size-standard {

    &,
    .lh-icon-button-focus {
      height: $lh-icon-button-size;
      width: $lh-icon-button-size;
    }
  }

  .lh-icon-button-size-large {

    &,
    .lh-icon-button-focus {
      height: $lh-icon-button-size-large;
      width: $lh-icon-button-size-large;
    }

    .lh-icon {
      font-size: 32px;
    }
  }

  .lh-icon-button {
    color: var(--on-background-color);
    fill: var(--on-background-color);

    &:hover:not(.is-disabled),
    &.has-dropdown-open,
    &.has-focus-ring:focus,
    body[modality="keyboard"] &:focus {
      color: var(--on-background-color);
    }

    &:hover:not(.is-disabled),
    &.has-dropdown-open {
      background-color: var(--light-button-hover-color);
    }

    .lh-icon-button-focus {
      background-color: var(--light-button-hover-color);
    }

    &.color-reverse {
      color: var(--main-reverse-color);
      fill: var(--main-reverse-color);

      &:hover:not(.is-disabled),
      &.has-dropdown-open,
      &.has-focus-ring:focus,
      body[modality="keyboard"] &:focus {
        color: var(--main-reverse-color);
      }

      &:hover:not(.is-disabled),
      &.has-dropdown-open {
        background-color: var(--main-reverse-background-color);
      }

      .lh-icon-button-focus {
        background-color: var(--main-reverse-background-color);
      }
    }
  }

  .has-menu {
    padding: 0px;
  }
</style>
