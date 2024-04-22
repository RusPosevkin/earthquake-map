<script>
import MapContainer from "./components/MapContainer.vue";
import ListItems from "./components/ListItems.vue";
import "../node_modules/mapbox-gl/dist/mapbox-gl.css";

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
