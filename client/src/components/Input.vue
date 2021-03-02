<template>
  <div class="lh-input" :class="classes">
    <div class="lh-input-content">
      <label class="lh-input-label">
        <input
          class="lh-input-box"
          ref="input"

          :autocomplete="autocomplete ? autocomplete : null"
          :disabled="disabled"
          :max="maxValue"
          :maxlength="enforceMaxlength ? maxlength : null"
          :minlength="minlength"
          :min="minValue"
          :name="name"
          :number="type === 'number' ? true : null"
          :placeholder="placeholder"
          :readonly="readonly"
          :required="required"
          :type="type"
          :value="value"
          :step="stepValue"
          :tabindex="tabindex"

          @blur="onBlur"
          @change="updateValue($event.target.value)"
          @focus="onFocus"
          @input="updateValue($event.target.value)"
          @keydown.enter="onKeydownEnter"
          @keydown="onKeydown"

          v-if="!multiLine"
        />
        <textarea
          class="lh-input-textarea"
          ref="textarea"

          :autocomplete="autocomplete ? autocomplete : null"
          :disabled="disabled"
          :maxlength="enforceMaxlength ? maxlength : null"
          :minlength="minlength"
          :name="name"
          :placeholder="placeholder"
          :readonly="readonly"
          :required="required"
          :rows="rows"
          :tabindex="tabindex"
          :value="value"

          @blur="onBlur"
          @change="updateValue($event.target.value)"
          @focus="onFocus"
          @input="updateValue($event.target.value)"
          @keydown.enter="onKeydownEnter"
          @keydown="onKeydown"

          v-else
        ></textarea>
        <div class="lh-input-label-text" v-if="label || $slots.default">
          <slot>{{ label }}</slot>
        </div>
      </label>
      <div class="lh-feedback" v-if="hasFeedback || maxlength">
        <div class="lh-textbox-feedback-text" v-if="showError">
          <slot name="error">{{ error }}</slot>
        </div>
        <div class="lh-textbox-feedback-text help" v-else-if="showHelp">
          <slot name="help">{{ help }}</slot>
        </div>
        <div class="lh-textbox-counter" v-if="maxlength">
          {{ valueLength + '/' + maxlength }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'lh-input',
    props: {
      name: String,
      placeholder: String,
      tabindex: [String, Number],
      value: {
        type: [String, Number],
        default: ''
      },
      label: String,
      type: {
        type: String,
        default: 'text'
      },
      autocomplete: String,
      autofocus: {
        type: Boolean,
        default: false
      },
      min: Number,
      max: Number,
      step: {
        type: [String, Number],
        default: 'any'
      },
      maxlength: Number,
      minlength: Number,
      enforceMaxlength: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      multiLine: {
        type: Boolean,
        default: false
      },
      rows: {
        type: Number,
        default: 2
      },
      trim: {
        type: Boolean,
        default: true
      },
      help: String,
      error: String,
      invalid: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    data() {
      return {
        isActive: false,
        isTouched: false,
        initialValue: this.value
      }
    },
    computed: {
      classes() {
        return [
          { 'active': this.isActive },
          { 'is-invalid': this.invalid },
          { 'is-touched': this.isTouched },
          { 'is-multi-line': this.multiLine },
          { 'has-counter': this.maxlength },
          { 'disabled': this.disabled },
          { 'has-label': this.hasLabel }
        ];
      },
      hasLabel() {
        return Boolean(this.label);
      },
      minValue() {
        if (this.type === 'number' && this.min !== undefined) {
          return this.min;
        }
        return null;
      },
      maxValue() {
        if (this.type === 'number' && this.max !== undefined) {
          return this.max;
        }
        return null;
      },
      stepValue() {
        return this.type === 'number' ? this.step : null;
      },
      valueLength() {
        return this.value ? this.value.length : 0;
      },
      hasFeedback() {
        return this.showError || this.showHelp;
      },
      showError() {
        return this.invalid && (Boolean(this.error) || Boolean(this.$slots.error));
      },
      showHelp() {
        return Boolean(this.help) || Boolean(this.$slots.help);
      }
    },
    created() {
      if (this.value === null) {
        this.initialValue = '';
        this.updateValue('');
      }
    },
    methods: {
      updateValue(value) {
        this.$emit('change', this.trim ? value.trim() : value);
      },
      onChange(e) {
        this.$emit('change', this.value, e);
      },
      onFocus(e) {
        this.isActive = true;
        this.$emit('focus', e);
      },
      onBlur(e) {
        this.isActive = false;
        this.$emit('blur', e);

        if (!this.isTouched) {
          this.isTouched = true;
          this.$emit('touch');
        }
      },
      onKeydown(e) {
        this.$emit('keydown', e);
      },
      onKeydownEnter(e) {
        this.$emit('keydown-enter', e);
      },
      reset() {
        if (
          document.activeElement === this.$refs.input
        ) {
          document.activeElement.blur();
        }
        this.updateValue(this.initialValue);
      },
      resetTouched(options = { touched: false }) {
        this.isTouched = options.touched;
      },
      focus() {
        (this.$refs.input || this.$refs.textarea).focus();
      }
    }
  }
</script>

<style lang="scss" scoped>

@import "../assets/sass/mixins.scss";

.lh-input {
  display: flex;
  align-items: flex-start;
  font-size: 16px;
  margin-bottom: 15px;

  &.disabled {
    @include disabled();
  }
}

.lh-input-content {
  flex-grow: 1;
}

.lh-input-label {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
    margin: 0;
    padding: 0;
    width: 100%;
}

.lh-input-box,
.lh-input-textarea {
    font-family: 'Open Sans', sans-serif;
    width: 100%;
    vertical-align: middle;
    border: 0 none;
    @include input-border-radius();
    padding: 0 10px;
    background: #fff;
    color: $formGray;
    border: 1px solid $formGray;
    transition: 0.2s ease-in-out;
    transition-property: color, background-color, border;
    box-sizing: border-box;

    &:focus {
      outline: none;
      background-color: #fff;
      border-color: $blue;
    }
    &.lh-input-box {
      height: 40px;
    }

    &.lh-input-textarea {
      padding: 10px;
    }
}

.lh-input-label-text {
  color: $black;
  cursor: default;
  font-weight: 600;
  transform-origin: left;
  transition: color 0.1s ease, transform 0.2s ease;
  margin-bottom: 5px;
  text-transform: uppercase;
  font-size: 14px;
}

.lh-feedback {
  color: $blue;
  font-size: 14px;
  line-height: 24px;
  margin: 0;
  padding-top: 0;
  position: relative;

  .help {
    color: $formGray;
    text-align: initial;
  }
}

.lh-textbox-counter {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
