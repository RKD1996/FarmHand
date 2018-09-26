<template>
<v-container>
    <div>
      <h1>Welcome</h1>
      <img src='../assets/logo.png' alt='Farmhand'>
    </div>
<please-wait :progress='progress'></please-wait>
  <v-layout row v-show='invalidCredentials' class='mb-2'>
    <v-flex xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4>
      <v-alert color='error' :value='true' transition='scale-transition'>
        <v-icon>{{ errorIcon }}</v-icon>
        {{ errorMsg }}
      </v-alert>
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex>
      <v-form @submit.prevent='submit' v-model='valid' ref='form'>
            <v-text-field outline label='E-mail' v-model='user.email' :rules='emailRules' required type='email' ref='search'>
            </v-text-field>
            <v-text-field outline label='Password' v-model='user.password' :rules='passwordRules' type='password' required @keyup.enter='enterPress' @click='setFocus'
            :append-icon="show1 ? 'visibility_off' : 'visibility'"
            :type="show1 ? 'text' : 'password'"
            counter
            @click:append="show1 = !show1"
            >
            </v-text-field>
            <v-btn class='submitField' @click='submit' :disabled='!valid'>Sign In</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import PleaseWait from './useful/PleaseWait.vue'
import axios from 'axios'
import checkUser from '../mixins/checkUserMixin'
import localForage from 'localforage'

export default {
  name: 'Farm',
  components: {
    'please-wait': PleaseWait
  },
  data () {
    return {
      show1: false,
      password: 'Password',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match')
      },
      progress: false,
      invalidCredentials: false,
      errorMsg: '',
      errorIcon: '',
      user: {
        email: '',
        password: ''
      },
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be 8 characters'
      ],
      select: null
    }
  },
  methods: {
    enterPress () {
      var email = this.user.email
      var password = this.user.password
      var re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      if (email !== '' || re.test(email) || password !== '' || password.length >= 8) {
        this.submit()
      }
    },
    setFocus () {
      var email = this.user.email
      var re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      if (email === '' || !re.test(email)) {
        this.$refs.search.focus()
      }
    },
    submit () {
      var obj = this
      var email = this.user.email
      var password = this.user.password
      console.log(this.$hostname + '/users/sign_in')

      axios({
        method: 'post',
        url: this.$hostname + '/users/sign_in',
        data: {'email': email, 'password': password}
      }).then(response => {
        obj.progress = false
        if (response.data['success']) {
          localForage.setItem('user', response.data)
          obj.$router.go('/home')
        } else {
          obj.invalidCredentials = true
          obj.clear()
          obj.errorMsg = 'Invalid Login Credentials.'
          obj.errorIcon = 'error'
        }
      }).catch(error => {
        console.log(error)
        obj.invalidCredentials = true
        obj.clear()
        obj.progress = false
        obj.errorMsg = 'Invalid Login Credentials.'
        obj.errorIcon = 'error'
      })
    },
    clear () {
      this.$refs.form.reset()
    }
  },
  mixins: [checkUser],
  created () {
    // var obj = this
    this.tokenLogin()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
.textField {
  color: bfbfbf;
  border-radius: 15px;
  border: 2px solid #bfbfbf;
  width: 200px;
  height: 35px;
  margin-left: auto;
  margin-right: auto;
}
.submitField {
    color: white;
    border-radius: 15px;
    border: 2px solid #bfbfbf;
    width: 200px;
    background: #4d4d4d;
    margin-left: auto;
    margin-right: auto;
}

h1 {
text-align: center;
}
</style>
