<template>
    <div>
        <div class="login">
            <a class="btn facebook" href="/login/facebook">LOGIN WITH FACEBOOK</a>
            <a class="btn google" href="/login/google"> LOGIN WITH GOOGLE</a>
        </div>
        
        <v-form v-model="valid" ref="form" lazy-validation>
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
            <v-btn 
                @click="submit" 
                :disabled="!valid" 
            > submit 
            </v-btn> 
            <v-btn @click="clear">clear</v-btn> 
        </v-form> 
    </div>
</template>


<script> 
import axios from 'axios';
import bus from "./../bus.js";

export default { 
    data: () => ({
        valid: true,
        email: '', 
        password: '', 
        emailRules: [ 
            v => !!v || 'E-mail is required', 
            v => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid', 
        ],
        passwordRules: [
            (v) => !!v || 'Password is required',
        ] 
    }), 
    methods: { 
        async submit() {
            // hits API endpoint, taking hte parameter from form,
            // and responds with the correct message, which is
            // displayed in the UI
            // success -> redirect user to home page
            if (this.$refs.form.validate()) {
                return axios({ 
                    method: 'post', 
                    data: { 
                        email: this.email, 
                        password: this.password, 
                    }, 
                    url: '/users/login', 
                    headers: { 
                        'Content-Type': 'application/json', 
                    }, 
                })
                .then((response) => { 
                    localStorage.setItem('jwtToken', response.data.token); 
                    this.$swal('Good job!', 'You are ready to start!', 'success');
                    bus.$emit("refreshUser"); 
                    this.$router.push({ name: 'Home' }); 
                })
                .catch((error) => { 
                    const message = error.response.data.message;
                    this.$swal('Oh oo!', `${message}`, 'error'); 
                });
            }
 
        }, 
        clear() { 
            this.$refs.form.reset(); 
        }
    }
}
</script>

