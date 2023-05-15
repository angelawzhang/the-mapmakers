<script>
  import { scaleLinear, scaleOrdinal } from "d3-scale";
  import * as d3 from "d3";

  import { onMount } from "svelte";

  let data = [];
  let dataByMotivation = {
    betterJob: [],
    unemployment: [],
    lackMoneyNeeds: [],
    remittances: [],
    lackMoneyFood: [],
    adventureTourism: [],
  };

  let motivationResponses = {
    1: "betterJob",
    2: "unemployment",
    6: "lackMoneyFood",
    7: "lackMoneyNeeds",
    8: "remittances",
    15: "adventureTourism",
  };

  let dataWithCategories = [];

  let order = ["1", "2", "6", "7", "8", "15"]; // to make a 3 x 2 grid

  let categoryNames = {
    1: "Better Job/Salary",
    2: "Unemployment",
    6: "Money for Food",
    7: "Money for Other Basic Needs",
    8: "Remittances",
    15: "Tourism",
  };

  let doesNotWantMigrateCounter = 0;
  let wantsMigrateCounter = 0;

  // set general use variables
  export let chartWidth = 600;
  let chartHeight = 400;
  let toggle = false;
  export let state = 0; // state of the visualization

  const paddings = {
    top: 25,
    left: 25,
    right: 25,
    bottom: 50,
  };
  const padding_between = 10;

  const dotsPerRow = 50;

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));

      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  // set scaling variables
  $: xScale = scaleLinear()
    .domain([0, dotsPerRow])
    .range([paddings.left, chartWidth - paddings.right / 2]);
  // $: yScale = scaleLinear()
  // 	.domain([0, (data.length - (data.length % dotsPerRow)) / dotsPerRow])
  // 	.range([paddings.top, chartHeight - paddings.bottom]);
  $: colorScale = scaleOrdinal().domain([0, 1]).range(["#000", "#65BABD"]);

  // for separating into different types of migration
  $: xScale2 = scaleLinear()
    .domain([0, dotsPerRow / 2])
    .range([paddings.left, chartWidth / 2 - padding_between]);
  $: xScale3 = scaleLinear()
    .domain([0, dotsPerRow / 2])
    .range([chartWidth / 2 + padding_between, chartWidth - paddings.right]);

  let columnWidth =
    (chartWidth - paddings.left - paddings.right - 2 * padding_between) / 3;
  let categoryDotsPerRow = 20;
  $: xScale4 = scaleLinear() // divide into 3 columns, for different categories
    .domain([0, categoryDotsPerRow])
    .range([0, columnWidth]);
  $: colorScaleCategories = scaleOrdinal()
    .domain(order)
    .range([" #4FAA5F", "#1C52A3", "#6297D5", "#824936", "#B990EC", "#F8CE6D"]);

  function yScale(index, rowLength) {
    // hard code for now so that we can have fixed distance between dots
    // index: index in the array
    // row length: how many items per row
    return ((index - (index % rowLength)) / rowLength) * 9 + paddings.top;
  }

  function xScaleCategories(index, category) {
    let placement = order.indexOf(category); // where it should be placed
    let col = placement % 3;
    let unadjustedX = xScale4(index % categoryDotsPerRow);
    return (
      unadjustedX +
      paddings.left +
      columnWidth * col +
      padding_between * (col - 1)
    );
  }

  function yScaleCategories(index, category) {
    // place first 3 on first row, second 3 on second row
    let placement = order.indexOf(category); // where it should be placed
    let row = (placement - (placement % 3)) / 3;
    let offset = 300; // arbitrary offset, find a better way to calculate this
    return yScale(index, categoryDotsPerRow) + row * offset;
  }

  function transition() {
    if (data.length === 0) {
      return;
    }
    console.log("Current state", state);
    let svg = d3.select("svg.dot-graph").select("g");
    switch (state) {
      case 0: // all migrants
        svg
          .selectAll("circle")
          .data(data)
          .join((enter) => enter.append("circle"))
          .transition()
          .duration(250)
          .ease(d3.easeLinear)
          .attr("cx", (d, i) => xScale(i % dotsPerRow))
          .attr("cy", (d, i) => yScale(i, dotsPerRow))
          .attr("r", 3)
          .attr("opacity", 1)
          .attr("fill", (d) => colorScale(d["with_coyote"]));
        break;
      case 1: // split into coyote and no coyote
        svg
          .selectAll("circle")
          .data(data)
          .join("circle")
          .transition()
          .duration(250)
          .ease(d3.easeLinear)
          .attr("cx", (d) =>
            d["with_coyote"] === 1
              ? xScale2(d["ind-2"] % (dotsPerRow / 2))
              : xScale3(d["ind-2"] % (dotsPerRow / 2))
          )
          .attr("cy", (d) => yScale(d["ind-2"], dotsPerRow / 2))
          .attr("r", 3)
          .attr("fill", (d) => colorScale(d["with_coyote"]));
        break;
      case 2: // color violence red
        svg
          .selectAll("circle")
          .filter((d) => d["violence"] == 1)
          .transition()
          .duration(250)
          .ease(d3.easeLinear)
          .attr("opacity", 1)
          .attr("fill", "red");
        break;
      default:
        break;
    }
  }

  $: state, transition();

  onMount(async () => {
    let ordered_data = [];
    for (let i = 0; i < 16; i++) {
      ordered_data.push({ with_coyote: 1, violence: 1 });
    }
    for (let i = 0; i < 490; i++) {
      ordered_data.push({ with_coyote: 1, violence: 0 });
    }
    for (let i = 0; i < 37; i++) {
      ordered_data.push({ with_coyote: 0, violence: 1 });
    }
    for (let i = 0; i < 457; i++) {
      ordered_data.push({ with_coyote: 0, violence: 0 });
    }
    data = shuffleArray(ordered_data);
    for (let d of data) {
      d["with_coyote"] = +d["with_coyote"];
      if (d["with_coyote"] === 0) {
        // set the second index position to the not migrating counter
        d["ind-2"] = doesNotWantMigrateCounter;
        doesNotWantMigrateCounter += 1;
      } else {
        // set the second index position to the migrating counter
        d["ind-2"] = wantsMigrateCounter;
        wantsMigrateCounter += 1;
      }
    }
    console.log(data);
    state = 0;
    transition();
  });

  function increaseState() {
    state += 1;
  }
  function decreaseState() {
    state -= 1;
  }
</script>

<div>
  {#if state > 0}
    <button class="button-4" on:click={decreaseState}> previous </button>
  {:else}
    <button class="button-4" disabled="true" on:click={decreaseState}>
      previous
    </button>
  {/if}
  {#if state < 2}
    <button class="button-4" on:click={increaseState}> next </button>
  {:else}
    <button class="button-4" disabled="true" on:click={increaseState}>
      next
    </button>
  {/if}
</div>

<section>
  <div class="visualization">
    {#if state === 0}
      <div class="headers dot-title">
        <div>All Migrants</div>
      </div>
    {/if}
    {#if state === 1}
      <div class="headers dot-title">
        <div>Migrated with Coyote</div>
        <div>Migrated Independently</div>
      </div>
    {/if}
    {#if state === 2}
      <div class="headers dot-title">
        <div class="center-text">Violence Experienced</div>
      </div>
    {/if}
    <svg class="dot-graph" width={chartWidth} height={chartHeight}>
      <g />
      {#if state === 3}
        <g>
          {#each order as category, i}
            <text
              x={(columnWidth * (2 * (i % 3) + 1)) / 2 +
                paddings.left +
                padding_between * ((i % 3) - 1)}
              y={((i - (i % 3)) / 3) * 300 + 15}
              text-anchor={"middle"}
            >
              {categoryNames[category]}
            </text>
          {/each}
        </g>
      {/if}
    </svg>
  </div>
</section>

<style>
  @keyframes draw {
    from {
      stroke-dashoffset: 4400;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
  .headers {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 50px;
  }

  /* dynamic classes for the tooltip */
  .tooltip-hidden {
    visibility: hidden;
    font-family: "Nunito", sans-serif;
    width: 200px;
    position: absolute;
  }

  .tooltip-visible {
    font: 25px sans-serif;
    font-family: "Nunito", sans-serif;
    visibility: visible;
    background-color: #f0dba8;
    border-radius: 10px;
    width: 200px;
    color: black;
    position: absolute;
    padding: 10px;
  }
</style>
