<template>
  <main>
    <h1>area: {{ location }}</h1>
    <google-map v-bind:center="location" v-bind:cinemas="this.cinemas" />
    <ul>
      <li v-for="cinema in cinemas">{{cinema.name}}</li>
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
      cinemas: []
    }
  },
  computed: {
    location () {
      return this.$store.state.location
    }
  },
  mounted () {
    axios({
      url: (`https://api.internationalshowtimes.com/v4/cinemas/?location=${this.$store.state.location.lat},${this.$store.state.location.lng}&distance=2`),
      method: 'GET',
      headers: {
        'X-API-KEY': 'NrURvWtxpKuaAGpOKEynhvjKui6owiXk'
      }
    })
      .then(res => {
        this.cinemas = res.data.cinemas
        console.log(this.cinemas)
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
  },
  watch: {
    location () {
      return this.$store.state.location
    }
  },
  components: {
    GoogleMap
  }
}
</script>

<style scoped>
.map {
  height: 500px;
}
</style>
