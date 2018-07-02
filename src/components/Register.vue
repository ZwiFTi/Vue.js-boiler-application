<template> 
    <v-form v-model="valid" ref="form" lazy-validation> 
        <v-text-field 
                label="Name" 
                v-model="name" 
                required 
        ></v-text-field> 
        <v-text-field 
                label="Email" 
                v-model="email" 
                :rules="emailRules" 
                required 
        ></v-text-field> 
        <v-text-field 
                label="Password" 
                v-model="password" 
                required 
        ></v-text-field> 
        <v-text-field 
                name="input-7-1" 
                label="Confirm Password" 
                v-model="confirm_password" 
        ></v-text-field> 
        <v-btn 
                @click="submit" 
                :disabled="!valid" 
        > submit </v-btn>
        <v-btn 
                @click="clear"
        >clear</v-btn> 
    </v-form> 
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        e1: false,
        valid: true,
        fullname: '',
        email: '',
        password: '',
        confirm_password: '',
        fullnameRules: [
            (v) => !!v || 'Fullname is required'
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /\S+@\S+\.\S+/.text(v) || 'E-mail must be valid',
        ],
        passwordRules: [
            (v) => !!v || 'Password is required'
        ]
    }),
    methods: {
        async submit() {
            if (this.$refs.form.validate()) {
                // add process here
                return axios({
                    // the axios method takes important parameters, such as
                    method: 'post',     // the request method
                    data: {             // the data parameters (payloads)
                        fullname: this.name,
                        email: this.email,
                        password: this.password,
                    },
                    url: '/users/register', // url endpoint
                    headers: {
                        'Content-type': 'application/json',
                    },
                })
                // then it takes these parameters to then if server response is success
                .then((response) => {
                    this.$swal(
                        'Great!',
                        'You have been successfully registered!',
                        'success',
                    );
                    this.$router.push({
                        name: 'Home'
                    })
                })
                // or catch if failure (if user is not saved to database)
                .catch((error) => {
                    const message = error.response.data.message;  // this is connected to the message in users.js
                    this.$swal('Oh no!', `${message}`, 'error');
                });
            }
        },
        clear() {
            this.$refs.form.reset();
        },
    },
};
</script>