import localForage from 'localforage'
var access
export default {
  methods: {
    tokenLogin () {
      var obj = this
      localForage.getItem('user').then(function (value) {
        access = value.token
        // console.log(access)
        if (access) {
          obj.$router.push('/home')
        } else {
          obj.$router.push('/')
        }
      }).catch(function (err) {
        console.log(err)
        obj.$router.push('/')
      })
    },
    token () {
      var obj = this
      localForage.getItem('user').then(function (value) {
        access = value.token
        // console.log(access['access-token'])
        if (access) {} else {
          obj.$router.push('/')
        }
      }).catch(function (err) {
        console.log(err)
        obj.$router.push('/')
      })
    }
  }
}
