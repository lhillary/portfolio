<template>
    <div class="lh-main-lead">
        <div class="lh-main-lead-content">
            <p class="smallcaps">{{ header }}</p>
            <h1 class="display">{{ text }}</h1>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'lh-main-lead',
        props: {
            text: String,
            header: String
        }
    }
</script>

<style lang="scss" scoped>

    @import "../assets/sass/mixins.scss";
    @import "../assets/sass/globals.scss";

    .lh-main-lead {
        width: 100%;
        padding: 4em 6em;

        @media (max-width: 800px) {
            padding: 2em 2em;
        }

        .lh-main-lead-content {
            max-width: 700px;

            h1 {
                color: var(--on-background-color);

                @media (max-width: 800px) {
                    font-size: 2.125rem;
                }
            }
        }
    }
</style>