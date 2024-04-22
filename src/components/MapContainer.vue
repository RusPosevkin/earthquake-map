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

const activeEarthquake = computed(() => {
  return store.getters.getActiveEarthquake;
});

const selectedEarthquake = computed(() => {
  return store.getters.getSelectedEarthquake;
});

const selectedEarthquakeCoordinates = computed(() => {
  return store.getters.getSelectedEarthquakeCoordinates;
});

const debounce = (cb, wait = 250) => {
  let h = 0;
  let callable = (...args) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };

  return callable;
};

onMounted(() => {
  map = new mapboxgl.Map({
    // container: this.$refs.mapContainer,
    container: mapContainer.value,
    style: "mapbox://styles/mapbox/standard",
    center: [121.9678, 12.3257],
    zoom: 2,
  });

  const handleUpdatefilteredEarthquakes = () => {
    const existedMarkers = document.querySelectorAll('.marker')
    existedMarkers.forEach((marker) => {
      marker.remove();
    });

    filteredEarthquakes.value.forEach((earthquake) => {
      const el = document.createElement('div');
      el.className = 'marker hidden';
      el.setAttribute('data-id', earthquake.id);

      new mapboxgl.Marker(el)
        .setLngLat(earthquake.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(
              `<h3>${earthquake.place}</h3><p>magnitude: ${earthquake.magnitude}</p>`
            )
        )
        .addTo(map);

      // show the marker only after it is correctly positioned and rendered at the map
      setTimeout(() => {
        el.classList.remove('hidden')
      }, 100);
    });
  };

  // reduce amount of rerendering iterations during user typing with debouncing
  watch(filteredEarthquakes, () => debounce(handleUpdatefilteredEarthquakes)());

  watch(selectedEarthquake, () => {
    map.flyTo({
      center: selectedEarthquakeCoordinates.value,
      essential: true,
    });
  });

  watch(activeEarthquake, () => {
    if (activeEarthquake.value) {
      const markerId = document.querySelector(`.marker[data-id="${activeEarthquake.value}"]`);
      markerId.classList.add('marker-active');
    } else {
      const activeMarkerId = document.querySelector('.marker-active');
      activeMarkerId.classList.remove('marker-active');
    }
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

.hidden {
  display: none;
}
</style>
