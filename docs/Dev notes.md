# Development process notes

## Implementation choices

* Pinia is now the new default
This project uses Vuex as a state management library as explicitly stated in the assignment.
Although [Vuex site](https://vuex.vuejs.org/) stated that the official state management library for Vue has changed to [Pinia](https://pinia.vuejs.org/).

* Current approach for rendering markers with removing existing markers and rendering again from scratch isn’t optimal.
Ideas how it could be fixed and improved:
1. Store earthquake `id` as marker’s `data-id` attribute in the DOM and during rerender phase after update of the filtered value just check if we already have `id` from DOM in the list of the filtered earthquakes from the store.
2. ~~Use debouncing for the search input for reduce count of rerenders~~. - implemented
3. Use [mapbox layers for filtering markers](https://docs.mapbox.com/mapbox-gl-js/example/filter-markers-by-input/)

* I tried to add debouncing to the user’s input handling (commit `SET_FILTER`), but it caused delays with updating the value in the input. So I moved debouncing to the process of rendering markers on the map.

* I didn’t figure out how to move out to separate folder and file some utils function like `debouncing` function that could be potentially reused by other components. Tried to use different approaches including [mixins approach](https://praveenpuglia.com/blog/managing-mixins-and-utils-in-vue/) but it didn’t work in my case.



## Ideas how to improve current implementation

* Cover code with unit tests. And happy path of the whole page with E2E cypress test.

* Handling error state of loading data from API. Possible solution – prepare local data, and use it as an input source for the app state and rendering. And show the message to the user that an error occurred and we’re showing data that could be outdated.

* UI: Show skeleton while we load the data from the API. [Example](https://markus.oberlehner.net/blog/skeleton-loading-animation-with-vue/), but it should be aligned with the current UI of earthquakes list.

* Improvement: limit the count of items that are shown in the list. Add pagination if there are too many of the items in the list.

* Optimize search complexity in `getSelectedEarthquakeCoordinates` from linear to constant by changing the structure of `state.earthquakes`.

It's a lower-hanging fruit, although not too much sense to do it right away while we have compact input data and don’t have other cases for searching by id.

From this one:

```js
[
  {
    id: 'test-1',
    place: "...",
    magnitude: "...",
    coordinates: [..., ...],
  },
  {
    id: 'test-2',
    ...
  },
];
```

To that one:

```js
{
  'test-1': {
    id: 'test-1',
    place: "...",
    magnitude: "...",
    coordinates: [..., ...],
  },
  'test-2': {
    id: 'test-2',
    ...
  },
}
```
