<template>
  <main>
    <h1>Cinemas</h1>
    <h2>{{location}}</h2>
    <div>
      <google-map v-bind:cinemas="cinemas" v-bind:center="location" v-model="location"/>
    </div>
    <ul>
      <li v-bind:key="cinema.name" v-for="cinema in cinemas">{{cinema.name}}</li>
    </ul>
  </main>
</template>

<script>
import axios from 'axios'
import GoogleMap from './GoogleMap'

export default {
  name: 'Show',
  data () {
    return {
      area: {},
      cinemas: []
    }
  },
  computed: {
    location () {
      return this.$store.state.location
    }
  },
  watch: {
    location () {
      this.getCinemaLocations()
    }
  },
  created: function () {
    this.getCinemaLocations = this.getCinemaLocations
  },
  methods: {
    getCinemaLocations () {
      axios({
        url: (`https://api.internationalshowtimes.com/v4/cinemas/?location=${this.$store.state.location.lat},${this.$store.state.location.lng}&distance=3`),
        method: 'GET',
        headers: {
          'X-API-KEY': 'NrURvWtxpKuaAGpOKEynhvjKui6owiXk'
        }
      })
        .then(res => {
          this.cinemas = res.data.cinemas
          this.cinemas.forEach(cinema => {
            return Object.keys(cinema.location).forEach(key => {
              if (key === 'lon') {
                const newKey = 'lng'
                cinema.location[newKey] = cinema.location[key]
                delete cinema.location[key]
              }
            })
          })
        })
    }
  },
  components: {
    GoogleMap
  }
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>
