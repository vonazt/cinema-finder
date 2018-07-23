<template>
  <div class="map"></div>
</template>

<script>
/* global google */
export default {
  name: 'GoogleMap',
  props: ['center', 'cinemas'],
  mounted () {
    console.log('center', this.center)
    this.map = new google.maps.Map(this.$el, {
      center: this.center || { lat: 51.515, lng: -0.078 },
      zoom: 14
    })
  },
  watch: {
    cinemas () {
      this.bounds = new google.maps.LatLngBounds();

      this.markers = this.cinemas.map(cinema => {
        this.bounds.extend(cinema.location)

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
