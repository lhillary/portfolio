<template>
    <div class="lh-login">
        <lh-main-lead :text="text" :header="header">
            <div class="lh-login-container" v-if="!$auth.loading">
                <lh-button v-if="!$auth.isAuthenticated" @click="login">Log In To View Projects</lh-button>
                <lh-button v-if="$auth.isAuthenticated" @click="logout">Log Out</lh-button>
            </div>
        </lh-main-lead>
    </div>
</template>

<script>
    import LhMainLead from '../components/MainLead';
    import LhButton from '../components/Button';

    export default {
        name: 'lh-home',
        data() {
            return {
                text: 'Welcome To The Portfolio Of Lydia Hillary. Find Out More About Me And Log In To Peruse A Selection Of My Projects',
                header: 'Welcome To My Portfolio'
            }
        },
        methods: {
            login() {
                this.$auth.loginWithRedirect();
            },
            logout() {
                this.$auth.logout({
                    returnTo: window.location.origin
                })
            }
        },
        components: {
            LhMainLead,
            LhButton
        }
    }
</script>

<style lang="scss" scoped>

    .lh-login-container {
        padding: 2em 0em;
    }

</style>