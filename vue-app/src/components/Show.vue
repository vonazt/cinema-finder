<template>
  <section class='section'>
    <div class='container'>
      <h1>Cinemas</h1>
      <h2>{{location}}</h2>
      <div>
        <google-map v-bind:cinemas='cinemas' v-bind:center='location' />
      </div>
      <ul>
        <li v-for="cinema in cinemas">{{cinema.name}}</li>
      </ul>
    </div>
  </section>
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
  mounted () {
    axios({
      method: 'GET',
      url: `https://api.internationalshowtimes.com/v4/cinemas/?location=${this.$store.state.location.lat},${this.$store.state.location.lng}&distance=2`,
      headers: {
        'x-api-key': 'NrURvWtxpKuaAGpOKEynhvjKui6owiXk'
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
  },
  components: {
    GoogleMap
  }
}
</script>

<style scoped>
  .map {
    height: 400px
  }
</style>
