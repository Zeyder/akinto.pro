<template>
    <div class="page-contacts">
        <div class="page-contacts__container">
            <h2>Contacts</h2>

            <form @submit="onSubmit" autocomplete="off">
                <input type="text" class="input" placeholder="Name*" v-model="name" required>
                <input type="email" class="input" placeholder="Email*" v-model="email" required>
                <textarea placeholder="Message*" class="input" v-model="message" required></textarea>

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
        onSubmit() {

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
    }

    h2 {
        text-align: center;
        margin-bottom: 15px;
        font-size: 2.4rem;
        color: #fff;
        font-weight: 500;
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
