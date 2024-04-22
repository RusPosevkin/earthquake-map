<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const filteredEarthquakes = computed(() => {
  return store.getters.getFilteredEarthquakes;
});

const filterValue = computed({
  get: () => store.getters.getFilter,
  set: (value) => {
    store.commit('SET_FILTER', value);
  },
});

const earthquakes = computed(() => {
  return store.state.earthquakes;
});

onMounted(() => {
  store.dispatch("fetchEarthquakes");
});
</script>

<template>
  <div v-if="earthquakes.length > 0" class="list-items-wrapper">
    <h1 class="title">Last month earthquakes</h1>
    <input v-model="filterValue" class="filter" placeholder="Filter earthquake by name" />
    <ul v-if="filteredEarthquakes.length > 0" class="list">
      <li class="list-item" v-for="earthquake in filteredEarthquakes" :key="earthquake.id">
        <h2 class="subtitle">{{ earthquake.place }}</h2>
        <p>Magnitude: <span class="magnitude">{{ earthquake.magnitude }}</span></p>
      </li>
    </ul>
    <div v-else>There are no earthquakes found 🤷‍♂️</div>
    <!-- <h1>Made By Actions</h1>
    <div v-for="earthquake in earthquakes" :key="earthquake.id">
      {{ earthquake.place }} {{ earthquake.magnitude }} {{ earthquake.coordinates }}
    </div> -->
  </div>
  <div v-else class="list-items-wrapper">Loading ...</div>
</template>

<style>
.list-items-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cde0e9;
  color: black;
  min-width: 400px;
  max-width: 35%;
  overflow-y: scroll;
}

.filter {
  width: 250px;
  font-size: 16px;
  margin-bottom: 20px;
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
  background-color: #a7b5c5;
  padding: 5px;
  cursor: pointer;
  margin: 0 10px 10px;
  border-radius: 5px;
}

.list-item:hover {
  background-color: #89b1e2;
}
</style>
