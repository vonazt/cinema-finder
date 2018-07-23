<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-1">{{msg}}</h1>
      <h2>{{location}}</h2>
      <form v-on:submit.prevent="handleSubmit()">
        <div class="field">
          <label class="label">Search an area for cinemas</label>
          <div class="control">
            <Autocomplete name="address" v-bind:handle-place-change="handlePlaceChange" />
          </div>
        </div>
        <button class="button">Submit</button>
      </form>
    </div>
  </section>
</template>

<script>

import Autocomplete from './Autocomplete'

export default {

  name: 'Home',
  data () {
    return {
      msg: 'Welcome to find a cinema',
      area: {}
    }
  },
  computed: {
    location () {
      return this.$store.state.location
    }
  },
  methods: {
    handlePlaceChange ({formatted_address: address, geometry: { location }}) {
      this.area.address = address
      this.area.location = location.toJSON()
      this.$store.commit('increment', location.toJSON())
    },
    handleSubmit () {
      this.$router.push('/show')
    }
  },
  components: {
    Autocomplete
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
