<script>
  // import countryData from "./data/map.geojson";
  import { onMount, onDestroy } from "svelte";
  import { accessToken, geoData } from "./const.js";
  import { activeListItem, activeMapItem } from "./states.js";
  import personIcon from "../assets/person.png";

  let map;

  function generateFeature({ name, coordinates }, index) {
    return {
      type: "Feature",
      properties: {
        description: `<p><b>${name}</b></p>`,
        id: index,
      },
      geometry: {
        type: "Point",
        coordinates,
      },
    };
  }

  onMount(async () => {
    mapboxgl.accessToken = accessToken;
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v11",
      center: [-87.204, 14.101],
      zoom: 7, // starting zoom level
      minZoom: 0,
      maxZoom: 15,
    });
    map.on("load", () => {
      map.loadImage(personIcon, (error, image) => {
        if (error) throw error;
        map.addImage("person", image);
        map.addSource("countries", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: geoData.map(generateFeature),
          },
        });
        map.addLayer({
          id: "countries",
          type: "symbol",
          source: "countries",
          layout: {
            "icon-image": "person",
            "icon-size": 0.15,
            "icon-allow-overlap": true,
          },
        });
      });
    });
  });

  const unsubscribeActiveMapItem = activeMapItem.subscribe(
    (newActiveMapItem) => {
      if (map) {
        map.flyTo({
          center: geoData[newActiveMapItem].coordinates,
        });
      }
    }
  );

  onDestroy(unsubscribeActiveMapItem);
</script>

<div id="map" />
