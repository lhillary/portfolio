<template>
    <div class="lh-form-container">
        <form v-if="sent === false" id="primary-contact" @submit.prevent="onSubmit" novalidate="true">
            <lh-input 
                label="Name" 
                name="name"
                placeholder="Enter your name" 
                v-model="name" 
                autocomplete="off" 
                error="This field is required" 
                required 
                
                :invalid="nameTouched && name.length === 0" 
                @touch="nameTouched = true"></lh-input>
            <lh-input 
                label="Email" 
                name="email"
                placeholder="Enter your email address" 
                v-model="email" 
                autocomplete="off" 
                error="This field is required" 
                required 
                
                :invalid="emailTouched && email.length === 0" 
                @touch="emailTouched = true"></lh-input>
            <lh-input 
                label="Phone Number" 
                name="phone"
                placeholder="Enter your phone number" 
                type="tel"
                autocomplete="off"
                v-model="phone"
            ></lh-input>
            <lh-input
                label="Message"
                name="message"
                placeholder="Enter your message"
                enforce-maxlength
                help="Max 256 characters"
                :rows="rows"

                :multi-line="true"
                :maxlength="256"
                v-model="message"
            ></lh-input>
            <div v-if="errors.length" class="lh-contact-error">
                <p v-for="error in errors" :key="error">{{ error }}</p>
            </div>
            <div class="lh-contact-submit">
                <lh-button color-same size="full">Submit</lh-button>
            </div>
        </form>
        <div class="lh-contact-sent-message" v-if="sent === true">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" style="fill: var(--projects-color)">
                <use xlink:href="../assets/img/logo.svg#Layer_1"></use>
            </svg>
            <h1>Thanks for contacting me!</h1>
            <p>I will be in touch with you as soon as possible.</p>
        </div>
    </div>
</template>

<script>

    import LhInput from '../components/Input'
    import LhButton from '../components/Button'
    import emailjs from 'emailjs-com';
    import ContactService from '../services/ContactService.js';

    export default {
        name: 'lh-contact-form',
        props: {
            clearForm: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                name: '',
                email: '',
                phone: '',
                message: '',
                rows: 5,
                nameTouched: false,
                emailTouched: false,
                messageTouched: false,
                errors: [],
                errorMessage: 'Please fill out all required fields',
                sent: false,
                serviceid: process.env.VUE_APP_EMAILJS_SERVICE_ID,
                templateid: process.env.VUE_APP_EMAILJS_TEMPLATE_ID,
                userid: process.env.VUE_APP_EMAILJS_USER_ID
            }
        },
        methods: {
            onSubmit(e) {

                this.errors = [];

                if (!this.name) {
                    this.errors.push('Name required');
                }

                if (!this.email) {
                    this.errors.push('Email required')
                } else if (!this.validEmail(this.email)) {
                    this.errors.push('Valid email required');
                }

                if (!this.errors.length) {

                    let contact = {
                        name: this.name,
                        email: this.email,
                        phone: this.phone,
                        message: this.message
                    }; 

                    this.errors = [];
                    this.sendEmail(e);
                    this.createContact(contact);
                }
            },
            sendEmail(e) {

                emailjs.sendForm(this.serviceid, this.templateid, e.target, this.userid)
                    .then((result) => {
                        
                        console.log('SUCCESS!', result.status, result.text);
                        this.sent = true;

                    }, (error) => {
                        console.log('FAILED...', error);
                    });

                this.resetForm();
            },
            validEmail(email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            async createContact(contact) {
                console.log(contact);
                ContactService.createContact(contact);
            },
            resetForm() {
                this.name = '';
                this.email = '',
                this.phone = '';
                this.message = '';
            }
        },
        components: {
            LhInput,
            LhButton
        }
    }
</script>

<style lang="scss" scoped>

    @import "../assets/sass/mixins.scss";
    @import "../assets/sass/globals.scss";

    .lh-form-container {
        margin: 1em;

        .lh-contact-error {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: $blue;

            p {
                margin: 0;
            }
        }

        .lh-contact-submit {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1em;
        }

        .lh-contact-sent-message {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            h1 {
                color: $blue;
            }
        }
    }

</style>