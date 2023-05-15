<script>
  // import countryData from "./data/map.geojson";
  import { onMount, onDestroy } from "svelte";
  import { accessToken, geoData } from "./const.js";
  import { activeListItem, activeMapItem } from "./states.js";
  import personIcon from "../assets/person.png";

  let map;
  let unsubscribeActiveMapItem;

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
      center: [29.31, 47.48],
      zoom: 1, // starting zoom level
      minZoom: 0,
      maxZoom: 15,
      pan: {
        animate: true,
        duration: 5,
      },
    });
    map.on("load", () => {
      map.addLayer(
        {
          id: "country-boundaries",
          source: {
            type: "vector",
            url: "mapbox://mapbox.country-boundaries-v1",
          },
          "source-layer": "country_boundaries",
          type: "fill",
          paint: {
            "fill-color": "#F4AD6A",
            "fill-opacity": 0.4,
          },
          filter: ["in", "iso_3166_1_alpha_3", "HND", "GTM", "MEX", "USA"],
        },
        "country-label"
      );
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

      unsubscribeActiveMapItem = activeMapItem.subscribe((newActiveMapItem) => {
        if (map) {
          if (newActiveMapItem == -1) {
            map.flyTo({
              center: [29.31, 47.48],
              zoom: 1,
              speed: 2,
            });
            map.setFilter("country-boundaries", [
              "in",
              "iso_3166_1_alpha_3",
              "HND",
            ]);
          } else if (newActiveMapItem == 0) {
            map.flyTo({
              center: geoData[newActiveMapItem].coordinates,
              speed: 1,
              zoom: 8,
            });
          } else if (newActiveMapItem == 1) {
            map.flyTo({
              center: geoData[newActiveMapItem].coordinates,
              speed: 0.5,
              zoom: 8,
            });
            setTimeout(function () {
              map.setFilter("country-boundaries", [
                "in",
                "iso_3166_1_alpha_3",
                "HND",
                "GTM",
              ]);
            }, 1500);
          } else if (newActiveMapItem == 2) {
            map.flyTo({
              center: geoData[newActiveMapItem].coordinates,
              speed: 0.5,
              zoom: 8,
            });
            setTimeout(function () {
              map.setFilter("country-boundaries", [
                "in",
                "iso_3166_1_alpha_3",
                "HND",
                "GTM",
                "MEX",
              ]);
            }, 2000);
          } else {
            map.flyTo({
              center: geoData[newActiveMapItem].coordinates,
              speed: 0.5,
              zoom: 8,
            });
            setTimeout(function () {
              map.setFilter("country-boundaries", [
                "in",
                "iso_3166_1_alpha_3",
                "HND",
                "GTM",
                "MEX",
                "USA",
              ]);
            }, 2000);
          }
        }
      });
    });
  });

  onDestroy(unsubscribeActiveMapItem);
</script>

<div id="map" />
