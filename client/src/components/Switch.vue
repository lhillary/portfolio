<template>
 <label class="lh-switch" :class="classes">
        <div class="lh-switch-wrapper">
            <input
                class="lh-switch-input"
                ref="input"
                type="checkbox"

                :checked.prop="isChecked"
                :disabled="disabled"
                :name="name"
                :tabindex="tabindex"
                :value="submittedValue"

                @blur="onBlur"
                @click="onClick"
                @focus="onFocus"
            >

            <div class="lh-switch-thumb">
                <div class="lh-switch-focus-ring"></div>
            </div>

            <div class="lh-switch-track"></div>
        </div>

        <div class="lh-switch-label-text" v-if="label || $slots.default">
            <slot>{{ label }}</slot>
        </div>
    </label>
</template>

<script>
    import { looseEqual } from '../helpers/Utils';

    export default {
        name: 'lh-switch',
        props: {
            name: String,
            label: String,
            tabindex: [String, Number],
            value: {
                required: true
            },
            trueValue: {
                default: true
            },
            falseValue: {
                default: false
            },
            submittedValue: {
                type: String,
                default: 'on' // HTML default
            },
            checked: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                isActive: false,
                isChecked: looseEqual(this.value, this.trueValue) || this.checked,
                initialValue: this.value
            };
        },
        computed: {
            classes() {
                return [
                    {'is-active': this.isActive},
                    {'is-checked': this.isChecked},
                    {'is-disabled': this.disabled}
                ]
            }
        },
        watch: {
            value() {
                this.isChecked = looseEqual(this.value, this.trueValue);
            }
        },
        created() {
            this.$emit('input', this.isChecked ? this.trueValue : this.falseValue);
        },
        methods: {
            focus() {
                this.$refs.input.focus();
            },
            onClick(e) {
                const isCheckedPrevious = this.isChecked;
                const isChecked = e.target.checked;

                this.$emit('input', isChecked ? this.trueValue : this.falseValue, e);

                if (isCheckedPrevious != isChecked) {
                    this.$emit('change', isChecked ? this.trueValue : this.falseValue, e);
                }
            },
            onFocus(e) {
                this.isActive = true;
                this.$emit('focus', e);
            },
            onBlur(e) {
                this.isActive = false;
                this.$emit('blur', e);
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import "../assets/sass/mixins.scss";
    @import "../assets/sass/globals.scss";

    .lh-switch {
        align-items: center;
        display: flex;
        font-family: 'Raleway', sans-serif;
        height: $lh-switch-height;
        position: relative;

        &.is-checked {

            .lh-switch-thumb {
                transform: translateX($lh-switch-track-width - $lh-switch-thumb-size);
                background-color: --button-background-color;
            }

            .lh-switch-track {
                background-color: $lh-switch-track-color;
            }

            .lh-switch-focus-ring {
                background-color: $lh-switch-track-color;
            }
        }

        &.is-disabled {

            .lh-switch-thumb {
                box-shadow: none;
            }

            .lh-switch-wrapper,
            .lh-switch-label-text {
                @include disabled();
            }
        }
    }

    .lh-switch-wrapper {
        cursor: pointer;
        height: $lh-switch-thumb-size;
        position: relative;
        width: $lh-switch-track-width;
    }

    .lh-switch-input {
        opacity: 0;
        position: absolute;
        body[modality="keyboard"] &:focus + .lh-switch-thumb {
            .lh-switch-focus-ring {
                opacity: 1;
                transform: scale(1);
            }
        }
    }

    .lh-switch-track {
        background-color: $lh-switch-track-color;
        border-radius: 12px;
        height: $lh-switch-track-height;
        position: absolute;
        top: (($lh-switch-thumb-size - $lh-switch-track-height) / 2);
        transition: background-color 0.1s linear;
        width: $lh-switch-track-width;
    }

    .lh-switch-thumb {
        background-color: $lh-switch-thumb-color;
        border-radius: 50%;
        box-shadow: 0 1px 3px rgba(black, 0.4);
        height: $lh-switch-thumb-size;
        position: absolute;
        transition-duration: 0.2s;
        transition-property: background-color, transform;
        transition-timing-function: ease;
        width: $lh-switch-thumb-size;
        z-index: 1;
    }

    .lh-switch-focus-ring {
        background-color: rgba(black, 0.1);
        border-radius: 50%;
        height: $lh-switch-focus-ring-size;
        left: -(($lh-switch-focus-ring-size - $lh-switch-thumb-size) / 2);
        opacity: 0;
        position: absolute;
        top: -(($lh-switch-focus-ring-size - $lh-switch-thumb-size) / 2);
        transform: scale(0);
        transition: background-color 0.2s ease, transform 0.15s ease, opacity 0.15s ease;
        width: $lh-switch-focus-ring-size;
        z-index: -1;
    }

    .lh-switch-label-text {
        cursor: pointer;
        font-size: 14px;
        margin-left: 12px;
        font-weight: 600;
        color: var(--on-background-color);
    }

    .lh-switch--switch-position-right {

        .lh-switch-label-text {
            margin-left: 0;
            margin-right: auto;
            order: -1;
        }
    }

</style>