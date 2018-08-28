<template>
    <div class="page-contacts">
        <div class="page-contacts__container">
            <h2>Contacts</h2>

            <p v-if="errors.has('name')" class="error" v-text="errors.first('name')"></p>
            <p v-if="errors.has('_replyto')" class="error" v-text="errors.first('_replyto')"></p>
            <p v-if="errors.has('message')" class="error" v-text="errors.first('message')"></p>

            <form ref="form" autocomplete="off" @submit="onSubmit($event)">
                <input v-validate="'required|min:2'" type="text" class="input" placeholder="Name*" name="name" v-model="name" required>
                <input v-validate="'required|email'" type="email" class="input" placeholder="Email*" name="_replyto" data-vv-as="email" v-model="email" required>
                <textarea v-validate="'required|min:2'" placeholder="Message*" class="input" name="message" v-model="message" required></textarea>
                
                <input type="hidden" name="_next" value="//akinto.pro" />
                
                <button class="btn-violet" type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Contacts',
    data() {
        return {
            name: '',
            email: '',
            message: ''
        }
    },

    methods: {
        async onSubmit(e) {
            const EMAIL = (this.$appContent.settings && this.$appContent.settings.email) 
                || 'nikadim04b63@gmail.com';
            
            const form = this.$refs.form;

            if (await this.$validator.validateAll()) {
                form.setAttribute('action', `https://formspree.io/${EMAIL}`);
                form.setAttribute('method', 'POST');
            } else {
                e.preventDefault();
            }
            
            return false;
        }    
    }
}
</script>
<style lang="stylus">
@import '../css/_variables.styl';

.page-contacts {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;

    &__container {
        max-width: 350px;
        width: 100%;

        form {
            margin-top: 15px;
        }    
    }

    h2 {
        text-align: center;
        margin-bottom: 15px;
        font-size: 2.4rem;
        color: #fff;
        font-weight: 500;
    }

    .error {
        font-size: 1.4rem;
        color: red;
    }

    .input {
        width: 100%;
        background: transparent;
        color: #fff;
        border: 1px solid rgba(#fff, .1);
        margin-bottom: 5px;
        -webkit-appearance: none;

        &::placeholder {
            color: rgba(#fff, .1);    
        }
    }

    .btn-violet {
        width: 175px;
        height: 45px;
        background-color: $violet;
        color: #fff;
        border-radius: 50px;
        display: block;
        margin: 15px auto 0;
        transition: background-color 450ms ease;

        @media screen and (min-width: 1024px) {
            &:hover {
                background-color: darken($violet, 25%);    
            }    
        }
    }

    input.input {
        height: 45px;
        padding-left: 15px;
    }

    textarea.input {
        max-width: 100%;
        min-width: 100%;
        min-height: 90px;
        max-height: 180px;
        padding: 15px;
        resize: none;
    }
}
</style>
