<script>
  import { onMount, onDestroy } from "svelte";
  import inView from "in-view";
  import { geoData } from "./const.js";
  import { activeListItem, activeMapItem } from "./states.js";
  import Pie2 from "./Pie2.svelte";
  import Sankey from "./Sankey/Sankey.svelte";
  import BarChart from "./BarChart.svelte";
  import Radar from "./Radar.svelte";
  import DotGraph from "./DotGraph.svelte";
  import soledadIcon from "../assets/soledad.png";
  import busIcon from "../assets/bus.png";
  import coyoteIcon from "../assets/coyote.png";
  import desertIcon from "../assets/desert.png";
  import gradIcon from "../assets/grad.jpeg";
  import PopulationPlot from "./PopulationPlot.svelte";

  let list;
  onMount(async () => {
    inView.offset(200);
    activeMapItem.set(-1);
    list.addEventListener("scroll", () => {
      const visibleListItems = Array.from(
        document.getElementsByClassName("list-item")
      ).map(inView.is);
      if (
        Array.from(document.getElementsByClassName("head")).map(inView.is)[0]
      ) {
        activeMapItem.set(-1);
      } else {
        const topMostVisible = visibleListItems.indexOf(true);
        if (topMostVisible !== $activeMapItem) {
          activeMapItem.set(topMostVisible);
        }
      }
    });
  });

  const unsubscribeActiveListItem = activeListItem.subscribe(
    (newActiveListItem) => {
      if (list) {
        list.scrollTop = document.getElementById(
          `list-item-${newActiveListItem}`
        ).offsetTop;
      }
    }
  );

  onDestroy(unsubscribeActiveListItem);
</script>

<div id="list-items" bind:this={list}>
  <div class="head">
    <h1 class="head-title">The Migration Journey</h1>
    <div class="separator" />
    <p class="head-text">
      Extreme violence and poverty in Central America over the past decade has
      forced millions of people to be uprooted from their homes, and conditions
      are only getting worse — many risk their lives undertaking dangerous
      journeys to get to their destination.
    </p>
    <p class="head-text">
      Follow the true story of a Honduran migrant and learn more about the
      countless hardships endured along the way.
    </p>
  </div>
  <!-- <div class="separator" /> -->
  {#each geoData as item, index}
    <div class="list-item" id="list-item-{index}">
      <h2>{item.name}</h2>
      <!-- Add Svelte components for each section here; add additional ifs accordingly -->
      {#if item.name === "Honduras"}
        <img class="round-image" src={soledadIcon} alt="Soledad Castillo" />
        <p>{item.description}</p>
        <BarChart />
        <div class="separator" />
      {:else if item.name === "Guatemala"}
        <img class="round-image" src={busIcon} alt="destroyed bus" />
        <p>{item.description}</p>
        <!-- <DotGraph /> -->
        <PopulationPlot />
        <div class="separator" />
      {:else if item.name === "Mexico"}
        <img
          class="round-image"
          src={coyoteIcon}
          alt="packed migrants in a car"
        />
        <p>{item.description}</p>
        <Radar />
        <div class="separator" />
      {:else if item.name === "Texas"}
        <img class="round-image" src={desertIcon} alt="Mexican desert" />
        <p>{item.description}</p>
        <Pie2 />
        <div class="separator" />
      {:else if item.name === "California"}
        <img
          class="round-image"
          src={gradIcon}
          alt="Inspirational graduation cap"
        />
        <p>{item.description}</p>
        <Sankey />
        <div class="separator" />
      {/if}
    </div>
  {/each}

  <div class="footer">
    <h1 class="head-title">What will you do?</h1>
    <div class="separator" />
    <p class="head-text">Made by Angela Zhang, Anna Sun, and Julie Meng</p>
    <p class="head-text">
      This data visualization was made with data contributed by the United
      Nations World Food Programme (WFP).
    </p>
    <p class="head-text">Other Sources</p>
    <a href="https://doi.org/10.1177/01979183221118911">
      Torre Cantalapiedra, E. (2022). Criminal Victimization of Central American
      Migrants in Transit Through Mexico. International Migration Review, 0(0).
    </a>

    <a href="https://oprdata.princeton.edu/archive/LAMP/">
      Princeton University. Latin American Migration Project.
    </a>

    <a
      href="https://www.nieknijland.nl/blog/how-to-highlight-countries-with-mapbox"
      >Nick Nijland. How to highlight countries with Mapbox.</a
    >
    <!-- <a href=""></a> -->
  </div>
</div>
