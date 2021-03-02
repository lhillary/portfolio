<template>
    <div class="lh-footer">
        <div class="lh-footer-logo">
            <router-link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" style="fill: var(--main-reverse-color)">
                    <use xlink:href="../assets/img/logo.svg#Layer_1"></use>
                </svg>
            </router-link>
            <div class="lh-footer-copyright">
                <p>&copy; 2021 Lydia Hillary</p>
            </div>
        </div>
        <div class="lh-footer-content">
            <div class="lh-footer-social">
                <lh-icon-button href="https://www.linkedin.com/in/lydiahillary/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <use xlink:href="../assets/img/li.svg#Layer_1"></use>
                    </svg>
                </lh-icon-button>
                <lh-icon-button href="https://github.com/lhillary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <use xlink:href="../assets/img/git.svg#Layer_1"></use>
                    </svg>
                </lh-icon-button>
                <lh-icon-button href="https://www.facebook.com/lydhil">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <use xlink:href="../assets/img/fb.svg#Layer_1"></use>
                    </svg>
                </lh-icon-button>
                <lh-icon-button href="https://twitter.com/Lydskia">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <use xlink:href="../assets/img/tw.svg#Layer_1"></use>
                    </svg>
                </lh-icon-button>
            </div>
        </div>
    </div>
</template>

<script>

    import LhIconButton from '../components/IconButton'

    export default {
        name: 'lh-footer',
        components: {
            LhIconButton
        }
    }
</script>

<style lang="scss" scoped>

    @import "../assets/sass/mixins.scss";
    @import "../assets/sass/globals.scss";

    .lh-footer {
        background-color: transparent;
        padding: 1em 1rem;
        display: flex;
        align-items: center;
        border-top: 1px solid var(--main-reverse-color);
        margin-top: 3em;

        @media (max-width: 420px) {
            flex-direction: column;
        }

        .lh-footer-logo {
            width: 60%;
            padding: 0em 1em;
            display: flex;
            align-items: center;

            @media (max-width: 420px) {
                justify-content: center;
                width: 100%;
            }


            a {
                display: block;
            }

            img {
                width: 100%;
                height: 100%;
            }

            .lh-footer-copyright {
                margin-left: 2em;

                p {
                    color: var(--main-reverse-color);
                    margin: 0;
                }
            }
        }

        .lh-footer-content {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 40%;

            @media (max-width: 420px) {
                justify-content: center;
                width: 100%;
            }

            .lh-footer-social {
                display: flex;
                justify-content: flex-end;

                > * {
                    margin: 0.25em 0.25em;

                    &:first-child {
                        margin-left: 0;
                    }

                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
    }

</style>