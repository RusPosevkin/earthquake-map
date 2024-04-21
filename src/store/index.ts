import { createStore } from "vuex";
// Import axios to make HTTP requests
import axios from "axios";

export default createStore({
  state: {
    earthquakes: [],
  },
  getters: {
    getEarthquakes: (state) => state.earthquakes,
  },
  actions: {
    async fetchEarthquakes({ commit }) {
      try {
        console.log('fetchEarthquakes was called');
        const data = await axios.get(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
        );

        const transformedData = data.data.features.map(item => {
          return {
            id: item.properties.ids,
            place: item.properties.place,
            magnitude: item.properties.mag,
            coordinates: item.geometry.coordinates.slice(0, 2),
          };
        });

        commit("SET_EARTHQUAKES", transformedData);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_EARTHQUAKES(state, earthquakes) {
      state.earthquakes = earthquakes;
    },
  },
});
