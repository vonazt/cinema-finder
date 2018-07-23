<template>
  <main>
    <h1>{{msg}}</h1>
    <h2>{{ location }}</h2>
    <form v-on:submit.prevent="handleSubmit()">
      <div class="field">
        <label class="label">Search an Area</label>
        <div class="control">
          <Autocomplete name="address" v-bind:handle-place-change="handlePlaceChange"/>
        </div>
      </div>
      <button class="button is-link">Submit</button>
    </form>
  </main>
</template>

<script>
import Autocomplete from './Autocomplete'

export default {
  name: 'HelloWorld',
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
    handleSubmit () {
      this.$router.push('/cinemas')
    },
    handlePlaceChange ({ geometry: { location } }) {
      this.area.location = location.toJSON()
      this.$store.commit('set', this.area.location)
      console.log(this.area.location)
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
