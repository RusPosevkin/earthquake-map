<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const filteredEarthquakes = computed(() => {
  return store.getters.getFilteredEarthquakes;
});

const filterValue = computed({
  get: () => store.getters.getFilter,
  set: (value) => {
    store.commit("SET_FILTER", value);
  },
});

const activeEarthquake = computed({
  get: () => store.getters.getActiveEarthquake,
  set: (value) => {
    store.commit("SET_ACTIVE", value);
  },
});

const selectedEarthquake = computed({
  get: () => store.getters.getSelectedEarthquake,
  set: (value) => {
    store.commit("SET_SELECTED", value);
  },
});

const mouseEnterHandler = (evt) => {
  const id = evt.currentTarget.dataset.id;
  activeEarthquake.value = id;
};

const mouseLeaveHandler = () => {
  activeEarthquake.value = null;
};

const clickHandler = (evt) => {
  const id = evt.currentTarget.dataset.id;
  selectedEarthquake.value = id;
};

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
    <input
      v-model="filterValue"
      class="filter"
      placeholder="Filter earthquake by place name"
    />
    <ul v-if="filteredEarthquakes.length > 0" class="list">
      <li
        class="list-item"
        @mouseenter="mouseEnterHandler"
        @click="clickHandler"
        @mouseleave="mouseLeaveHandler"
        v-for="earthquake in filteredEarthquakes"
        :key="earthquake.id"
        :data-id="earthquake.id"
      >
        <h2 class="subtitle">{{ earthquake.place }}</h2>
        <p>
          Magnitude: <span class="magnitude">{{ earthquake.magnitude }}</span>
        </p>
      </li>
    </ul>
    <div v-else>There are no earthquakes found 🤷‍♂️</div>
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
  box-shadow: rgba(46, 94, 238, 0.4) 5px 5px, rgba(46, 101, 240, 0.3) 10px 10px,
    rgba(69, 46, 240, 0.2) 15px 15px, rgba(46, 91, 240, 0.1) 20px 20px,
    rgba(78, 46, 240, 0.05) 25px 25px;
}
</style>
