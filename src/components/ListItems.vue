<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const getEarthquakes = computed(() => {
  return store.getters.getEarthquakes;
});

const earthquakes = computed(() => {
  return store.state.earthquakes;
});

onMounted(() => {
  store.dispatch("fetchEarthquakes");
  // store.fetchEarthquakes();
});
</script>

<template>
  <div class="list-items">
    <h1>Made By Getters</h1>
    <div v-for="earthquake in getEarthquakes" :key="earthquake.id">
      {{ earthquake.place }} {{ earthquake.magnitude }} {{ earthquake.coordinates }}
    </div>
    <h1>Made By Actions</h1>
    <div v-for="earthquake in earthquakes" :key="earthquake.id">
      {{ earthquake.place }} {{ earthquake.magnitude }} {{ earthquake.coordinates }}
    </div>
  </div>
</template>

<style>
.list-items {
  flex: 1;
  display: flex;
  /* position: relative; */
  width: 50px;
  overflow: hidden;
}
</style>
