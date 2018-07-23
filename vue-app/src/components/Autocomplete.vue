<template>
  <div class="field">
    <input ref="autocomplete" class="input" placeholder="Search an area" />
  </div>
</template>

<script>
/* global google */
export default {
  name: 'Autocomplete',
  props: ['handlePlaceChange'],
  mounted () {
    this.autocomplete = new google.maps.places.Autocomplete(
      (this.$refs.autocomplete),
      { types: ['establishment', 'geocode'] }
    )

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace()

      this.handlePlaceChange(place)
    })
  }
}
</script>

<style>
</style>
