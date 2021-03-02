<template>
  <button
    aria-label="Close"
    class="lh-close-button"
    type="button"

    :class="classes"
    :disabled="disabled"

    @click="onClick"
  >
    <div class="lh-close-button-icon">
      <lh-icon :color-reverse="colorReverse">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M18.984 6.422L13.406 12l5.578 5.578-1.406 1.406L12 13.406l-5.578 5.578-1.406-1.406L10.594 12 5.016 6.422l1.406-1.406L12 10.594l5.578-5.578z"/>
        </svg>
      </lh-icon>
    </div>
    <span class="lh-close-button-focus"></span>
  </button>
</template>

<script>
  import LhIcon from './Icon.vue';

  export default {
    name: 'lh-close-button',
    props: {
      size: {
        type: String,
        default: 'normal' //small, normal, or large
      },
      colorReverse: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes() {
        return [
          `lh-close-button-size-${this.size}`,
          { 'color-reverse': this.colorReverse },
          { 'is-disabled': this.disabled }
        ]
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
  }
</script>

<style lang="scss" scoped>

  @import "../assets/sass/mixins.scss";

  .lh-close-button {
    display: inline-flex;
    align-items: center;
    background-color: transparent;
    background: none;
    border-radius: 50%;
    border: none;
    cursor: default;
    justify-content: center;
    margin: 0;
    outline: none;
    overflow: hidden;
    padding: 0;
    position: relative;

    &::-moz-focus-inner {
        border: 0;
    }

    &:hover:not(.is-disabled) {
        background-color: var(--button-hover-color);
    }

    &.color-reverse {

      &:hover:not(.is-disabled) {
        background-color: var(--main-reverse-hover-color);
      }

      .lh-close-button-icon {
        color: var(--main-reverse-color);
      }
    }

    body[modality="keyboard"] &:focus {

      .lh-close-button-focus {
        opacity: 1;
        transform: scale(1);
      }
    }

    &.is-disabled {
      @include disabled();
    }
  }

  .lh-close-button-icon {
    color: var(--fill_color);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    z-index: 1;
  }

  .lh-close-button-focus {
    background-color: rgba(0,0,0,0.15);
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    transform-origin: center;
    transform: scale(0);
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .lh-close-button-size-small {

    &,
    .lh-close-button-focus {
      height: 24px;
      width: 24px;
    }

    .lh-icon {
      font-size: 18px;
    }
  }

  .lh-close-button-size-normal {

    &,
    .lh-close-button-focus {
      height: 36px;
      width: 36px;
    }

    .lh-icon {
      font-size: 20px;
    }
  }

  .lh-close-button-size-large {

    &,
    .lh-close-button-focus {
      height: 48px;
      width: 48px;
    }

    .lh-icon {
      font-size: 24px;
    }
  }

</style>
