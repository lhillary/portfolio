<template>
    <section class="lh-content-section" :class="classes">
        <div class="lh-content">
            <p class="smallcaps">{{ smallcaps }}</p>
            <div class="lh-content-paragraphs" v-for="(paragraph, index) in paragraphs" :key="index">
                <p class="lh-text-content">{{ paragraph.text }}</p>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'lh-content',
        props: {
            smallcaps: String,
            paragraphs: Array,
            alignment: {
                type: String,
                default: 'left' //right
            }
        },
        computed: {
            classes() {
                return [
                    `lh-content-align-${this.alignment}`
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import "../assets/sass/mixins.scss";
    @import "../assets/sass/globals.scss";

    .lh-content-section {
        padding: 2em 4em;
        width: 100%;
        display: flex;

        @media (max-width: 1024px) {
            padding: 2em 2em;
        }

        &.lh-content-align-right {
            justify-content: flex-end;
        }

        .lh-content-align-left {
            justify-content: flex-start;
        }

        .lh-content {
            width: 60%;

            @media (max-width: 1024px) {
                width: 75%;
            }

            @media (max-width: 800px) {
                width: 100%;
            }

            .lh-text-content {
                color: var(--on-background-color);
            }
        }
    }

        

</style>