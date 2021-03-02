<template>
  <component
    class="lh-btn"
    ref="button"

    :value="value"
    :disabled="disabled"
    :class="classes"
    :href="isAnchor ? (disabled ? null : href) : null"
    :is="isAnchor ? 'a' : 'button'"
    :type="isAnchor ? null : buttonType"

    @click="onClick">
    <div class="lh-btn-content">
      <div class="lh-btn-icon" v-if="icon || $slots.icon">
        <slot name="icon">
          <lh-icon :icon="icon"></lh-icon>
        </slot>
      </div>
      <slot>Submit</slot>
    </div>
  </component>
</template>

<script>
  import LhIcon from './Icon.vue';

  export default {
    name: 'lh-button',
    props: {
      size: {
        default: "auto",
        type: String,
        validator(prop) {
          return ["auto", "full", "small"].indexOf(prop) > -1;
        }
      },
      buttonType: String,
      value: {
        type: [String, Number],
        default: ''
      },
      href: String,
      icon: String,
      iconPosition: {
        type: String,
        default: 'left' // 'left' or 'right'
      },
      active: {
        type: Boolean,
        default: false
      },
      type: {
        default: "standard", // or inline
        type: String
      },
      colorReverse: {
        type: Boolean,
        default: false
      },
      colorSame: {
        type: Boolean,
        default: false
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
        default: 'click' // 'click', 'hover', 'focus', or 'always'
      },
      disabled: {
        default: false,
        type: Boolean
      }
    },
    computed: {
      classes() {
        return [
          `${this.type}`,
          `${this.size}`,
          { 'is-anchor': this.isAnchor },
          { 'color-reverse': this.colorReverse },
          { 'color-same': this.colorSame },
          { 'is-disabled': this.disabled },
          { 'active-state': this.active }
        ]
      },
      isAnchor() {
        return this.href !== undefined;
      }
    },
    methods: {
      onClick(e) {
        this.$emit('click', e);
      }
    },
    components: {
     LhIcon
    }
  };
</script>

<style lang="scss" scoped>

  @import "../assets/sass/mixins.scss";

  .lh-btn {
    @include border-radius();
    color: var(--button-text-color);
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    border: none;
    padding: 0.725rem 1rem;
    text-align: center;
    text-transform: capitalize;
    transition: color 0.25s ease-in-out;
    transition: background-color 0.25s ease-in-out;
    background: var(--button-background-color);
    outline: none;
    font-family: 'Raleway', sans-serif;

    &.color-reverse {
      color: var(--main-reverse-color);
      background: var(--main-reverse-background-color);
    }

    &.color-same {
      color: var(--projects-background-color);
      background-color: var(--projects-color);
    }

    &.active-state {
      background: transparent;
      border: 2px solid var(--button-background-color);

      color: var(--button-background-color);
    }

    &.is-anchor {
      display: inline-flex;
      cursor: pointer;
      text-decoration: none;

      &.disabled {
        cursor: none;
      }
    }

    &.full {
      width: 100%;
    }

    &.small {
      font-size: 12px;
      padding: 0.25rem 0.75rem;

      .lh-btn-icon {
        margin-right: 6px;
      }

      .lh-icon {
        font-size: 18px;
        margin-bottom: -6px;
      }
    }

    &.standard {

      &:active {
        background: $lightGray;
      }

      &:hover {
        background-color: var(--button-hover-color);
      }
    }

    &.inline {
      border: none;
      text-decoration: none;
      padding: 0;
      text-align: left;
      background-color: transparent;
      color: var(--inline-button-text-color);

      &:active {
        color: $lightGray;
      }

      &:hover {
        color: var(--inline-button-hover-color);
      }
    }

    &:disabled {
      @include disabled();
    }
  }

  .lh-btn-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lh-btn-icon {
    margin-top: -1px;
  }
</style>
