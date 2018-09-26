<template>
  <div>
    <v-layout>
      <v-flex class="text-xs-right">Electricity Phase
      </v-flex>
      <v-flex class="text-xs-right" xs2>
        <font-awesome-icon :color="green" icon="lightbulb" />
        <font-awesome-icon :color="red" icon="lightbulb" />
        <font-awesome-icon :color="yellow" icon="lightbulb" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import axios from 'axios'
// // Create WebSocket connection.
// const socket = new WebSocket('ws://localhost:3000/phase')
//
// // Connection opened
// socket.addEventListener('open', function (event) {
//   socket.send('Hello Server!')
// })
//
// // Listen for messages
// socket.addEventListener('message', function (event) {
//   console.log('Message from server ', event.data)
// })

/*
var ws = new WebSocket('ws://192.168.43.41:3000/phase')

ws.onmessage = function (e) {
  print(e.data)
}

ws.onopen = function (e) {
  console.log(e)
}

ws.onclose = function (e) {
  console.log(e)
} */
export default {
  components: {
    FontAwesomeIcon
  },
  data () {
    return {
      allPhase: '',
      green: '',
      red: '',
      yellow: ''
    }
  },
  methods: {
    color (phase) {
      if (phase[0].status === 'true') {
        this.green = 'green'
      } else {
        this.green = ''
      }
      if (phase[1].status === 'true') {
        this.red = 'red'
      } else {
        this.red = ''
      }
      if (phase[2].status === 'true') {
        this.yellow = 'yellow'
      } else {
        this.yellow = ''
      }
    },
    fetchPhaseDetails: function () {
      setInterval(() => {
        axios({
          method: 'get',
          url: this.$hostname + '/phase'
        }).then(response => {
          this.allPhase = response.data.data
          localStorage.setItem('phasedetail', JSON.stringify(this.allPhase))
          this.color(this.allPhase)
        }).catch(error => {
          console.log(error.response)
          this.green = ''
          this.red = ''
          this.yellow = ''
        })
      }, 6000)
    }
  },
  created () {
    this.fetchPhaseDetails()
  }
}
</script>
