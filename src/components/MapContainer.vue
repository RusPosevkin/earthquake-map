<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import mapboxgl from "mapbox-gl";
import { useStore } from "vuex";

const store = useStore();

mapboxgl.accessToken =
  "pk.eyJ1IjoicnVzcG9zZXZraW4iLCJhIjoiY2x2OGRhYTM0MGhvczJtbjE2cW55bzF2NiJ9.dwcArz2atPL_veMcRw4zIg";

let map;
const mapContainer = ref();

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
    container: mapContainer.value,
    style: "mapbox://styles/mapbox/standard",
    // Asia and Oceania usually have a lot of earthquake cases
    center: [121.9678, 12.3257],
    zoom: 2,
  });

  // rendering markers and popups for filtered earthquakes
  const handleUpdatefilteredEarthquakes = () => {
    const existedMarkers = document.querySelectorAll(".marker");
    existedMarkers.forEach((marker) => {
      marker.remove();
    });

    filteredEarthquakes.value.forEach((earthquake) => {
      const el = document.createElement("div");
      el.className = "marker hidden";
      el.setAttribute("data-id", earthquake.id);

      new mapboxgl.Marker(el)
        .setLngLat(earthquake.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${earthquake.place}</h3><p>magnitude: ${earthquake.magnitude}</p>`
          )
        )
        .addTo(map);

      // show the marker only after it is correctly positioned and rendered at the map
      setTimeout(() => {
        el.classList.remove("hidden");
      }, 100);
    });
  };

  // reduce amount of rerendering iterations during user typing with debouncing
  watch(filteredEarthquakes, () => debounce(handleUpdatefilteredEarthquakes)());

  // handling selecting by click to earthquake item in the list
  watch(selectedEarthquake, () => {
    map.flyTo({
      center: selectedEarthquakeCoordinates.value,
      essential: true,
    });
  });

  // handling active earthquake – hovering earthquake item in the list
  watch(activeEarthquake, () => {
    // if we have active earthquake id in state – make map marker active
    if (activeEarthquake.value) {
      const markerElement = document.querySelector(
        `.marker[data-id="${activeEarthquake.value}"]`
      );
      markerElement.classList.add("marker-active");
    } else {
      const activeMarkerElement = document.querySelector(".marker-active");
      activeMarkerElement.classList.remove("marker-active");
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
