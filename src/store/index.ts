import { createStore } from "vuex";
import axios from "axios";

export type EarthquakeDataItem = {
  id: String;
  place: String;
  magnitude: Number;
  coordinates: Array<Number>;
};

export interface State {
  earthquakes: [] | EarthquakeDataItem[];
  filter: String | null;
  activeEarthquake: String | null;
  selectedEarthquake: EarthquakeDataItem | null;
}

export default createStore<State>({
  state: {
    earthquakes: [],
    filter: null,
    // filter: 'ug',
    activeEarthquake: null,
    // activeEarthquake: ',ew1713467960,ci40549375,us7000mczm,',
    selectedEarthquake: null,
  },
  getters: {
    getEarthquakes: (state) => state.earthquakes,
    getFilter: (state) => state.filter,
    getActiveEarthquake: (state) => state.activeEarthquake,
    getFilteredEarthquakes: (state) => {
      if (!state.earthquakes.length) {
        return [];
      }

      return state.earthquakes.filter((earthquake) => {
        if (typeof state.filter !== 'string') {
          return true;
        }
        const filteredValue = state.filter.trim().toLowerCase();

        return earthquake.place
          .toLowerCase()
          .includes(filteredValue);
      });
    },
  },
  actions: {
    async fetchEarthquakes({ commit }) {
      try {
        console.log('fetchEarthquakes was called');
        const dataset = await axios.get(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
        );

        const transformedData = dataset.data.features.map(item => {
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
    SET_FILTER(state, filter) {
      if (filter.length === 0) {
        filter = null;
      }

      state.filter = filter;
    },
    SET_ACTIVE(state, active) {
      state.activeEarthquake = active;
    },
  },
});
