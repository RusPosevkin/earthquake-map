<script>
import MapContainer from './components/MapContainer.vue';
import ListItems from './components/ListItems.vue';
import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
// import { ref, onMounted, computed } from "vue";
// import { useStore } from "vuex";

// const store = useStore();

// const getEarthquakes = computed(() => {
//   return store.getters.getEarthquakes;
// });

// const earthquakes = computed(() => {
//   return store.state.earthquakes;
// });

// onMounted(() => {
//   // store.dispatch("fetchEarthquakes");
//   store.fetchEarthquakes();
// });

export default {
  components: {
    MapContainer,
    ListItems,
  },
};
</script>

<template>
  <div id="layout">
    <ListItems />
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
