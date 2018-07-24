<template>
  <div class='map'></div>
</template>

<script>
/* global google */
export default {
  name: 'GoogleMap',
  props: ['center', 'cinemas'],
  mounted () {
    this.map = new google.maps.Map(this.$el, {
      center: this.center,
      zoom: 14,
      styles: [
        {
          'featureType': 'administrative.land_parcel',
          'elementType': 'all',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'landscape.man_made',
          'elementType': 'all',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'poi',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'simplified'
            },
            {
              'lightness': 20
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry',
          'stylers': [
            {
              'hue': '#f49935'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'simplified'
            }
          ]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'geometry',
          'stylers': [
            {
              'hue': '#fad959'
            }
          ]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road.local',
          'elementType': 'geometry',
          'stylers': [
            {
              'visibility': 'simplified'
            }
          ]
        },
        {
          'featureType': 'road.local',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'simplified'
            }
          ]
        },
        {
          'featureType': 'transit',
          'elementType': 'all',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'all',
          'stylers': [
            {
              'hue': '#a1cdfc'
            },
            {
              'saturation': 30
            },
            {
              'lightness': 49
            }
          ]
        }
      ]
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
          map: this.map,
          icon: {
            url: 'https://cdn2.iconfinder.com/data/icons/photo-and-video/500/Camera_cinema_consume_entertainment_film_media_movie_photo_play_record_video_television_theater-512.png',
            scaledSize: new google.maps.Size(35, 35)
          }
        })
        marker.addListener('click', () => {
          this.infoWindow.setContent(`
            <a href='/#/listings/${cinema.id}'
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
