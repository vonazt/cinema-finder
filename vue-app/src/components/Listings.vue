<template>
  <section class="section">
    <div class="container is-centered">

      <h1 class="title is-1">Currently showing:</h1>
      <div class="columns is-multiline">
        <div class="column is-full-width" v-bind:key="movie.id" v-for="movie in movies">
          <ul>
            <img v-bind:src="movie.poster_image_thumbnail" v-bind:alt="movie.title" />

            <li v-bind:key="movie.id" class="subtitle is-3"><strong>{{movie.title}}</strong></li>

            <div v-for="date in dates" v-bind:key="date.id">
               <li v-if="date.movie_id === movie.id"><strong>{{date.date}}</strong></li>
               <table class="table">
               <tr>
                 <td v-if="date.movie_id === movie.id && formatDate(time.start_at) === date.date" v-bind:key="time.id" v-for="time in showtimes"><a v-bind:href="time.booking_link">{{formatTime(time.start_at)}}</a></td>
               </tr>
             </table>

            </div>
          </ul>
        </div>
      </div>

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
      return moment(startTime).format('ddd, MMM Do')
    },
    formatTime (startTime) {
      return moment(startTime).format('HH:mm')
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
              this.dates = Array.from(new Set(this.showtimes.map((time, index) => {
                return {
                  id: index,
                  date: moment(time.start_at).format('ddd, MMM Do'),
                  time: moment(time.start_at).format('HH:mm'),
                  movie_id: time.movie_id
                }
              })))
              this.dates = _.orderBy(this.dates, ['movie_id'], ['asc'])
              this.dates = _.uniqBy(this.dates, v => [v.date, v.movie_id].join())
            })
        })
      })
  }
}
</script>
<style scoped>
h1 {
  text-align: center;
}
.table {
  display: flex;
  justify-content: center;
}
a {
  font-weight: 700;
}

ul {
  text-align: center;
  justify-content: center;
}

li {
  margin-top: 10px;
}
</style>
