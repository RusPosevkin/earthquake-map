<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const getFilteredEarthquakes = computed(() => {
  return store.getters.getFilteredEarthquakes;
});

const earthquakes = computed(() => {
  return store.state.earthquakes;
});

onMounted(() => {
  store.dispatch("fetchEarthquakes");
});
</script>

<template>
  <div class="list-items-wrapper">
    <h1 class="title">Last month earthquakes</h1>
    <ul class="list" v-if="getFilteredEarthquakes.length > 0">
      <li class="list-item" v-for="earthquake in getFilteredEarthquakes" :key="earthquake.id">
        <h2 class="subtitle">{{ earthquake.place }}</h2>
        <p>Magnitude: <span class="magnitude">{{ earthquake.magnitude }}</span></p>
      </li>
    </ul>
    <!-- <h1>Made By Actions</h1>
    <div v-for="earthquake in earthquakes" :key="earthquake.id">
      {{ earthquake.place }} {{ earthquake.magnitude }} {{ earthquake.coordinates }}
    </div> -->
  </div>
</template>

<style>
.list-items-wrapper {
  background-color: #94a9b3;
  color: black;
  min-width: 300px;
  max-width: 35%;
  overflow-y: scroll;
}

.title {
  text-align: center;
  margin-bottom: 10px;
  font-size: 20px;
}

.subtitle {
  font-size: 14px;
  font-weight: bold;
}

.magnitude {
  font-weight: bold;
  color: rgb(210, 25, 25);
}

.list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.list-item {
  background-color: #a3ccff;
  padding: 5px;
  cursor: pointer;
  margin: 0 10px 10px;
  border-radius: 5px;
}
</style>
