<script>
  import { scaleLinear, scaleOrdinal } from "d3-scale";
  import * as d3 from "d3";

  import { onMount } from "svelte";

  let data = [];

  let withCoyoteCounter = 0;
  let withoutCoyoteCounter = 0;

  // set general use variables
  export let chartWidth = 550;
  let chartHeight = 200;
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
  $: colorScale = scaleOrdinal().domain([0, 1]).range(["#67923D", "#4997D0"]);

  // with or without coyote use
  $: xScale2 = scaleLinear()
    .domain([0, dotsPerRow / 2])
    .range([paddings.left, chartWidth / 2 - padding_between]);
  $: xScale3 = scaleLinear()
    .domain([0, dotsPerRow / 2])
    .range([chartWidth / 2 + padding_between, chartWidth - paddings.right]);

  let columnWidth =
    (chartWidth - paddings.left - paddings.right - 2 * padding_between) / 3;

  function yScale(index, rowLength) {
    return ((index - (index % rowLength)) / rowLength) * 9 + paddings.top;
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
          .selectAll("rect")
          .data(data)
          .join((enter) => enter.append("rect"))
          .transition()
          .duration(250)
          .ease(d3.easeLinear)
          .attr("x", (d, i) => xScale(i % dotsPerRow))
          .attr("y", (d, i) => yScale(i, dotsPerRow))
          .attr("width", 5)
          .attr("height", 5)
          .attr("opacity", 1)
          .attr("fill", (d) => colorScale(d["with_coyote"]));
        break;
      case 1: // split into coyote and no coyote
        svg
          .selectAll("rect")
          .data(data)
          .join("rect")
          .transition()
          .duration(400)
          .ease(d3.easeLinear)
          .attr("x", (d) =>
            d["with_coyote"] === 1
              ? xScale2(d["ind-2"] % (dotsPerRow / 2))
              : xScale3(d["ind-2"] % (dotsPerRow / 2))
          )
          .attr("y", (d) => yScale(d["ind-2"], dotsPerRow / 2))
          .attr("width", 5)
          .attr("height", 5)
          .attr("fill", (d) => colorScale(d["with_coyote"]));
        break;
      case 2: // color violence red
        svg
          .selectAll("rect")
          .filter((d) => d["violence"] == 1)
          .transition()
          .duration(400)
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
        d["ind-2"] = withCoyoteCounter;
        withCoyoteCounter += 1;
      } else {
        // set the second index position to the migrating counter
        d["ind-2"] = withoutCoyoteCounter;
        withoutCoyoteCounter += 1;
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
    <button class="button" on:click={decreaseState}> previous </button>
  {:else}
    <button class="button" disabled="true" on:click={decreaseState}>
      previous
    </button>
  {/if}
  {#if state < 2}
    <button class="button" on:click={increaseState}> next </button>
  {:else}
    <button class="button" disabled="true" on:click={increaseState}>
      next
    </button>
  {/if}
</div>

<section>
  <div class="dot-visualization">
    {#if state === 0}
      <div class="headers dot-title-big">
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
      <div class="headers dot-title-big">
        <div class="center-text">Violence Experienced</div>
      </div>
      <div class="headers dot-title">
        <div>Migrated with Coyote</div>
        <div>Migrated Independently</div>
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
  <div>
    <p>
      Many migrants choose to travel with a coyote, and one reason for this
      decision is to decrease the probability that they face violence during
      their migration journey. In the above visualization, migrants had violent
      encounters over twice as often when traveling without a coyote. However,
      in the 2018 and 2019 Surveys on Migration from the Southern Border of
      Mexico, coyotes were the perpetrators of crime 9.1% of the time.
    </p>
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
