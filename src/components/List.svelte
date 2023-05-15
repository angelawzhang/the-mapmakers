<script>
  import { onMount, onDestroy } from "svelte";
  import inView from "in-view";
  import { geoData } from "./const.js";
  import { activeListItem, activeMapItem } from "./states.js";
  import Pie from "./Pie.svelte";
  import Pie2 from "./Pie2.svelte";
  import Sankey from "./Sankey/Sankey.svelte";
  import BarChart from "./BarChart.svelte";
  import BarChart2 from "./BarChart2.svelte";
  import Radar from "./Radar.svelte";
  import DotGraph from "./DotGraph.svelte";

  let list;
  onMount(async () => {
    inView.offset(200);
    list.addEventListener("scroll", () => {
      const visibleListItems = Array.from(
        document.getElementsByClassName("list-item")
      ).map(inView.is);
      const topMostVisible = visibleListItems.indexOf(true);
      if (topMostVisible !== $activeMapItem) {
        activeMapItem.set(topMostVisible);
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
    <h1>The Migration Journey</h1>
    <p />
  </div>
  <div class="separator" />
  {#each geoData as item, index}
    <div class="list-item" id="list-item-{index}">
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <!-- Add Svelte components for each section here; add additional ifs accordingly -->
      {#if item.name === "Honduras"}
        <!-- <BarChart /> -->
      {:else if item.name === "Guatemala"}
        <DotGraph />
      {:else if item.name === "Mexico"}
        <Radar />
      {:else if item.name === "Texas"}
        <Pie2 />
      {:else if item.name === "California"}
        <Sankey />
      {/if}
    </div>
  {/each}
</div>
