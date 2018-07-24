<template>
  <section class="section">
    <div class="container">
      <h1>Currently showing:</h1>
      <ul>
        <li v-bind:key="movie.id" v-for="movie in movies"><strong>{{movie.title}}</strong>
          <p v-if="time.movie_id === movie.id" v-bind:key="time.id" v-for="time in showtimes">{{formatDate(time.start_at)}}
            <button v-bind:href="time.booking_link">Book here</button>
          </p>
        </li>

      </ul>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
export default {
  name: 'Listings',
  data () {
    return {
      movies: [],
      showtimes: [],
      dates: []
    }
  },
  methods: {
    formatDate (startTime) {
      return moment(startTime).format('ddd, MMM Do, HH:mm')
    },
    findDay (startTime) {
      return moment(startTime).format('ddd, MMM Do')
    }
  },
  mounted () {
    axios({
      method: 'GET',
      url: `https://api.internationalshowtimes.com/v4/movies/?cinema_id=${this.$route.params.id}`,
      headers: {
        'X-API-KEY': 'NrURvWtxpKuaAGpOKEynhvjKui6owiXk'
      }
    })
      .then(res => {
        this.movies = res.data.movies
      })
      .then(() => {
        this.movies.forEach(movie => {
          axios({
            method: 'GET',
            url: `https://api.internationalshowtimes.com/v4/showtimes?movie_id=${movie.id}&cinema_id=${this.$route.params.id}`,
            headers: {
              'X-API-KEY': 'NrURvWtxpKuaAGpOKEynhvjKui6owiXk'
            }
          })
            .then(res => {
              this.showtimes = this.showtimes.concat(res.data.showtimes)
              this.showtimes = _.orderBy(this.showtimes, ['start_at'], ['asc'])
              this.dates = Array.from(new Set(this.showtimes.map(time => moment(time.start_at).format('ddd, MMM Do'))))
              console.log(this.showtimes)
              console.log(this.dates)
              console.log(this.movies)
            })
        })
      })
  }
}
</script>
