<template>
    <header class="lh-header">
        <div class="lh-logo">
            <router-link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" style="fill: var(--color_fill)">
                    <use xlink:href="../assets/img/logo.svg#Layer_1"></use>
                </svg>
            </router-link>
        </div>
        <div class="lh-header-container">
            <nav class="lh-nav">
                <lh-switch v-model="dark" @change="toggleMode">{{ mode }}</lh-switch>
                <div class="lh-links">
                    <div v-for="(route, index) in routes" :key="index">
                        <lh-button v-if="route.name !== 'Home'" type="inline">
                            <router-link :to="route.path">{{ route.name }}</router-link>
                        </lh-button>
                    </div>
                </div>
                <div class="lh-contact">
                    <lh-button color @click="openModal('modal')">Contact</lh-button>
                </div>
            </nav>
            <nav class="lh-mobile-nav">
                <lh-slide no-overlay close-on-navigation>
                    <div v-for="(route, index) in routes" :key="index">
                        <router-link :to="route.path">{{ route.name }}</router-link>
                    </div>
                    <div class="mobile-contact">
                        <lh-button color-reverse @click="openModal('modal')">Contact</lh-button>
                    </div>
                </lh-slide>
            </nav>
        </div>
        <lh-modal ref="modal" title="Get In Touch" remove-footer>
            <lh-contact></lh-contact>
        </lh-modal>
    </header>
</template>
<script>

    import LhButton from './Button';
    import LhSlide from './Slide';
    import LhModal from './Modal';
    import LhSwitch from './Switch';
    import LhContact from './ContactForm';

    export default {
        name: 'lh-navigation',
        data() {
            return {
                routes: this.$router.options.routes,
                verticalOffset: 10,
                dark: false,
                mode: 'Dark'
            }
        },
        methods: {
            openModal(ref) {
                this.$refs[ref].open();
            },
            closeModal(ref) {
                this.$refs[ref].close();
            },
            toggleMode() {
                if (this.dark) {
                    this.mode = 'Light';
                    document.body.classList.remove('light');
                    document.body.classList.add('dark');
                } else {
                    this.mode = 'Dark';
                    document.body.classList.add('light');
                    document.body.classList.remove('dark');
                }
            }
        },
        components: {
            LhButton,
            LhSlide,
            LhModal,
            LhSwitch,
            LhContact
        }
    }
</script>

<style scoped lang="scss">

    @import "../assets/sass/mixins.scss";
    @import "../assets/sass/globals.scss";

    .lh-header {
        display: flex;
        align-items: center;
        position: relative;
        padding: 1em 1rem;

        @media (max-width: 1024px) {
            padding: 1em;
        }

        &.scroll-bg {
            background-color: $white;
        }
    }

    .lh-logo {
        width: 100%;
        max-width: 200px;
        min-width: 200px;
        padding: 1em;
        position: absolute;

        @media (max-width: 1024px) {
            max-width: 180px;
            min-width: 180px;
        }

        a {
            display: block;
        }

        img {
            width: 100%;
            height: 100%;
        }
    }

    .lh-header-container {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;

        .lh-nav {
            display: flex;
            width: 100%;
            justify-content: flex-end;
            padding-right: 1em;
            align-items: center;

            .lh-links {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                padding: 1em 3em;
                margin-right: 1em;
                @include border-radius();

                @media (max-width: 1024px) {
                    padding-right: 1em;
                    padding-left: 1em;
                }

                @media (max-width: 800px) {
                    display: none;
                }

                & > * {
                    margin: 0px 10px;
                }

                a {
                    color: var(--inline-button-text-color);

                    &:hover {
                        color: var(--inline-button-hover-color);
                    }

                    @media (max-width: 1024px) {
                        font-size: 14px;
                    }
                }
            }

            .lh-contact {

                @media (max-width: 800px) {
                    display: none;
                }
            }
        }

        .lh-mobile-nav {
            display: none;

            a {
                color: var(--background-color);
                padding: 0.7em;
                display: block;
                width: 100%;
            }

            .lh-header-accordion {
                padding: 0.7em;
            }

            @media(max-width: 800px) {
                display: block;
            }

            .mobile-contact {
                margin-top: 1em;
            }
        }
    }
</style>