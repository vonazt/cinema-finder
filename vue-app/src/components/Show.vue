<template>
  <section class="section">
    <div class="container">
      <h1>Cinemas</h1>
      <h2>{{location}}</h2>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Show',
  data () {
    return {
      area: {}
    }
  },
  computed: {
    location () {
      return this.$store.state.location
    }
  }
}
</script>
