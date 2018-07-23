<template>
  <div class="map"></div>
</template>

<script>
/* global google */
export default {
  name: 'GoogleMap',
  props: ['center', 'cinemas'],
  mounted () {
    this.map = new google.maps.Map(this.$el, {
      center: this.center,
      zoom: 14
    })
  },
  watch: {
    cinemas () {
      this.markers = this.cinemas.map(cinema => {
        const marker = new google.maps.Marker({
          position: cinema.location,
          map: this.map
        })
      })

    },
    center () {
      this.map.setCenter(this.center)
      this.marker = new google.maps.Marker({
        position: this.center,
        map: this.map
      })
    }
  }
}
</script>
