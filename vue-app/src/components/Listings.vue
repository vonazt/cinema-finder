<template>
  <section class="section">
    <div class="container">
<<<<<<< HEAD
      <h1 class="title is-1">Currently showing:</h1>
      <div class="columns is-multiline">
        <div class="column is-one-third" v-for="movie in movies">
          <ul>
            <img v-bind:src="movie.poster_image_thumbnail" v-bind:alt="movie.title" />
            <li v-bind:key="movie.id"><strong>{{movie.title}}</strong></li>
            <div v-for="date in dates">
               <li v-if="date.movie_id === movie.id">{{date.date}}</li>
               <li v-if="date.movie_id === movie.id" v-bind:key="date.movie_id">{{date.time}}</li>
            </div>
          </ul>
        </div>
      </div>
=======
      <h1>Currently showing:</h1>
      <ul>
        <li v-bind:key="movie.id" v-for="movie in movies"><strong>{{movie.title}}</strong>
          <p v-if="time.movie_id === movie.id" v-bind:key="time.id" v-for="time in showtimes">{{formatDate(time.start_at)}}
            <a class="button" v-bind:href="time.booking_link">Book here</a>
          </p>
        </li>

      </ul>
>>>>>>> development
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
<<<<<<< HEAD
    formatTime (startTime) {
      return moment(startTime).format('HH:mm')
=======
    formatDate (startTime) {
      return moment(startTime).format('ddd, MMM Do, HH:mm')
    },
    findDay (startTime) {
      return moment(startTime).format('ddd, MMM Do')
>>>>>>> development
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
<<<<<<< HEAD
              this.dates = Array.from(new Set(this.showtimes.map(time => {
                return {
                  date: moment(time.start_at).format('ddd, MMM Do'),
                  time: moment(time.start_at).format('HH:mm'),
                  movie_id: time.movie_id
                }
              })))
              this.dates = _.orderBy(this.dates, ['movie_id'], ['asc'])
              this.dates = _.uniqBy(this.dates, v => [v.date, v.movie_id].join())
              console.log(this.dates)
=======
              this.dates = Array.from(new Set(this.showtimes.map(time => moment(time.start_at).format('ddd, MMM Do'))))
              console.log(this.showtimes)
              console.log(this.dates)
              console.log(this.movies)
>>>>>>> development
            })
        })
      })
  }
}
</script>

<style scoped>
  .button {
    font-size: 10px;
  }
</style>
