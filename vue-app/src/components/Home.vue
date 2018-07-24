<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-1 is-centered">{{msg}}</h1>
      <form v-on:submit.prevent="handleSubmit()">
        <div class="field">
          <label class="label">Search an area</label>
          <div class="control">
            <Autocomplete name="address" class="autocomplete" v-bind:handle-place-change="handlePlaceChange" />
          </div>
        </div>
        <button class="button">Find a cinema</button>
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
      msg: 'Find a cinema near you',
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
  section {
    background-image: url('https://experienceluxury.co/wp-content/uploads/2016/08/private-cinema.jpg');
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .title {
    text-align: center;
    color: #fff;
    font-family: 'Limelight';
    font-weight: lighter;
    font-size: 60px;
  }

  .field {
    width: 500px;
    display: block;
    margin: 0 auto;
  }

  .label {
    color: #fff;
    font-family: 'Lato';
    font-size: 20px;
    text-transform: uppercase;
    margin-top: 60px;
    text-align: center;
  }

  .button {
    font-family: 'Lato';
    font-size: 20px;
    font-weight: 600;
    display: block;
    margin: 0 auto;
    margin-top: 30px;
  }
</style>
