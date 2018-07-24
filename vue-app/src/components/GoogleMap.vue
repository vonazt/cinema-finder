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

    this.infoWindow = new google.maps.InfoWindow()
  },
  watch: {
    cinemas () {
      this.bounds = new google.maps.LatLngBounds()

      this.markers = this.cinemas.map(cinema => {
        this.bounds.extend(cinema.location)

        const marker = new google.maps.Marker({
          position: cinema.location,
          map: this.map
        })
        marker.addListener('click', () => {
          this.infoWindow.setContent(`
            <a href="/#/listings/${cinema.id}"
            <h2>${cinema.name}</h2>
            <h2>${cinema.location.address.display_text}</h2>
          `)
          this.infoWindow.open(this.map, marker)
        })
      })
    },
    center () {
      this.map.setCenter(this.center)
      this.marker = new google.maps.Marker({
        map: this.map
      })
    }
  }
}
</script>
