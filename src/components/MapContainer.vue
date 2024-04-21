<!-- <script>
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoicnVzcG9zZXZraW4iLCJhIjoiY2x2OGRhYTM0MGhvczJtbjE2cW55bzF2NiJ9.dwcArz2atPL_veMcRw4zIg';

export default {
  mounted() {
    const map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: "mapbox://styles/mapbox/standard",
      center: [-3.188267, 55.953251],
      zoom: 5,
    });
    this.map = map;
  },

  unmounted() {
    this.map.remove();
    this.map = null;
  },
};
</script> -->
<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import mapboxgl from 'mapbox-gl';
import { useStore } from "vuex";

const store = useStore();

mapboxgl.accessToken = 'pk.eyJ1IjoicnVzcG9zZXZraW4iLCJhIjoiY2x2OGRhYTM0MGhvczJtbjE2cW55bzF2NiJ9.dwcArz2atPL_veMcRw4zIg';

let map;
const mapContainer = ref();

const earthquakes = computed(() => {
  return store.state.earthquakes;
});

const filteredEarthquakes = computed(() => {
  return store.getters.getFilteredEarthquakes;
});

onMounted(() => {
  map = new mapboxgl.Map({
    // container: this.$refs.mapContainer,
    container: mapContainer.value,
    style: "mapbox://styles/mapbox/standard",
    center: [121.9678, 12.3257],
    zoom: 2,
  });

  watch(filteredEarthquakes, () => {
    console.log('updated state of earthquakes: ', earthquakes);
    filteredEarthquakes.value.forEach(earthquake => {
      const el = document.createElement('div');
      el.className = 'marker marker-active';

      new mapboxgl.Marker(el)
        .setLngLat(earthquake.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(
              `<h3>${earthquake.place}</h3><p>magnitude: ${earthquake.magnitude}</p>`
            )
        )
        .addTo(map);
    });
  });
});

onUnmounted(() => {
  map.remove();
  map = null;
});
</script>

<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<style>
.map-container {
  flex: 1;
}
</style>
