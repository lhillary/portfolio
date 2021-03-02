<template>
    <div class="lh-secondary-lead">
        <div class="lh-about-words">
            <p class="smallcaps">About Me</p>
            <h1 class="display">{{ text }}</h1>
        </div>
        <div class="lh-about-img">
            <img src="../assets/img/about-me.jpg" alt="Lydia Hillary Image" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'lh-secondary-lead',
        props: {
            text: String
        }
    }
</script>

<style lang="scss" scoped>

    @import "../assets/sass/mixins.scss";
    @import "../assets/sass/globals.scss";

    .lh-secondary-lead {
        display: flex;
        align-items: flex-start;
        padding: 4em 4em;

        @media (max-width: 800px) {
            flex-direction: column;

            .lh-about-words {
                width: 100%;
            }

            .lh-about-img {
                width: 100%;
            }
        }

        @media (max-width: 1024px) {
            padding: 2em 2em;
        }

        > * {

            &:first-child {
                margin-right: 1em;

                @media (max-width: 800px) {
                    margin-right: 0 !important;
                }

                @media (max-width: 1024px) {
                    margin-right: 0.5em;
                }
            }

            &:last-child {
                margin-left: 1em;

                @media (max-width: 800px) {
                    margin-left: 0 !important;
                }

                @media (max-width: 1024px) {
                    margin-left: 0.5em;
                }
            }
        }

        .lh-about-words {
            width: 40%;

            @media (max-width: 800px) {
                width: 100%;
                max-width: 500px;
            }

            h1 {
                color: var(--on-background-color);

                @media (max-width: 1024px) {
                    font-size: 2.125rem;
                }
            }
        }

        .lh-about-img {
            width: 60%;

            @media (max-width: 800px) {
                width: 100%;
            }

            img {
                width: 100%;
            }
        }
    }
</style>