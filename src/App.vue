<script>
import MapContainer from "./components/MapContainer.vue";
import EarthquakeList from "./components/EarthquakeList.vue";
import "../node_modules/mapbox-gl/dist/mapbox-gl.css";

export default {
  components: {
    MapContainer,
    EarthquakeList,
  },
};
</script>

<template>
  <div id="layout">
    <EarthquakeList />
    <MapContainer />
  </div>
</template>

<style>
#layout {
  flex: 1;
  display: flex;
  position: relative;
}
</style>
