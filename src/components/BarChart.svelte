<script>
  import { scaleLinear, scaleBand } from "d3-scale";
  import { slide } from "svelte/transition";
  import * as d3 from "d3";

  let points = [
    { id: 1, reason: "Search for better job", numOfHouseholds: 1239 },
    { id: 2, reason: "Unemployment", numOfHouseholds: 618 },
    { id: 3, reason: "Money for other", numOfHouseholds: 351 },
    { id: 4, reason: "Remittances", numOfHouseholds: 277 },
    { id: 5, reason: "Money to buy food", numOfHouseholds: 234 },
    { id: 6, reason: "Fam reunification", numOfHouseholds: 137 },
    { id: 7, reason: "Unsafety", numOfHouseholds: 118 },
    { id: 8, reason: "For Study", numOfHouseholds: 80 },
    { id: 9, reason: "Other", numOfHouseholds: 70 },
  ];

  $: reasons = points.map((d) => d.reason);

  const yTicks = [0, 400, 700, 1000, 1300];
  const padding = { top: 20, right: 15, bottom: 20, left: 25 };

  let width = 500;
  let height = 200;

  let hovered = -1;
  let recorded_mouse_position = {
    x: 0,
    y: 0,
  };

  let showAll = true;

  function formatMobile(tick) {
    return "'" + tick.toString().slice(-2);
  }

  function updateData() {
    if (showAll) {
      points = points.map((d) => ({
        ...d,
        numOfHouseholds: d.numOfHouseholds > 200 ? d.numOfHouseholds : 0,
      }));
      const timeout = setTimeout(() => {
        points = points.filter((d) => d.numOfHouseholds > 200);
      }, 200);

      showAll = false;
    } else {
      points = [
        { id: 1, reason: "Search for better job", numOfHouseholds: 1239 },
        { id: 2, reason: "Unemployment", numOfHouseholds: 618 },
        { id: 3, reason: "Money for other", numOfHouseholds: 351 },
        { id: 4, reason: "Remittances", numOfHouseholds: 277 },
        { id: 5, reason: "Money to buy food", numOfHouseholds: 234 },
        { id: 6, reason: "Fam reunification", numOfHouseholds: 137 },
        { id: 7, reason: "Unsafety", numOfHouseholds: 118 },
        { id: 8, reason: "For Study", numOfHouseholds: 80 },
        { id: 9, reason: "Other", numOfHouseholds: 70 },
      ];

      showAll = true;
    }
  }

  $: xScale = scaleBand()
    .domain(reasons)
    .range([padding.left, width - padding.right])
    .padding(0.2);

  $: yScale = scaleLinear()
    .domain([0, Math.max.apply(null, yTicks)])
    .range([height - padding.bottom, padding.top]);

  $: innerWidth = width - (padding.left + padding.right);
  $: barWidth = innerWidth / 9; //magic num 9 instead of xTicks.length
</script>

<h2>Migration Motivations</h2>
<div>
  <button on:click={updateData}> toggle </button>
</div>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
  <svg>
    <!-- y axis -->
    <g class="axis y-axis" transform="translate(0,{padding.top})">
      {#each yTicks as tick}
        <g
          class="tick tick-{tick}"
          transform="translate(0, {yScale(tick) - padding.bottom})"
        >
          <line x2="100%" />
          <text y="-4">{tick} {tick === 20 ? " per 1,000 population" : ""}</text
          >
        </g>
      {/each}
    </g>

    <!-- x axis -->
    <g class="axis x-axis">
      {#each points as point (point.reason)}
        <g class="tick" transform="translate({xScale(point.reason)},{height})">
          <text x={barWidth / 2} y="-4"
            >{width > 380 ? point.reason : formatMobile(point.reason)}</text
          >
        </g>
      {/each}
    </g>

    <g class="bars">
      {#each points as point, i (point.reason)}
        <rect
          x={xScale(point.reason)}
          y={yScale(point.numOfHouseholds)}
          width={barWidth - 4}
          height={height - padding.bottom - yScale(point.numOfHouseholds)}
          out:slide={{ duration: 1000 }}
          on:mouseover={(event) => {
            hovered = i;
            recorded_mouse_position = {
              x: event.pageX,
              y: event.pageY,
            };
          }}
          on:mousemove={(event) => {
            recorded_mouse_position = {
              x: event.pageX,
              y: event.pageY,
            };
          }}
          on:mouseout={(event) => {
            hovered = -1;
          }}
        />
      {/each}
    </g>
  </svg>

  <div
    class={hovered === -1 ? "tooltip-hidden" : "tooltip-visible"}
    style="left: {recorded_mouse_position.x -
      100}px; top: {recorded_mouse_position.y - 100}px"
  >
    {#if hovered !== -1}
      <p>
        {points[hovered].numOfHouseholds} households main reason of migration was:
        {points[hovered].reason}
      </p>
    {/if}
  </div>
</div>
<div>
  {#if showAll == false}
    <p>the top 5 reasons of migration are financial!</p>
  {/if}
</div>

<style>
  h2 {
    text-align: center;
  }

  .chart {
    width: 80%;
    /* max-width: 500px; */
    margin: 0 auto;
  }

  svg {
    position: relative;
    width: 100%;
    height: 200px;
  }

  .tick {
    font-family: Helvetica, Arial;
    font-size: 0.725em;
    font-weight: 200;
  }

  .tick line {
    stroke: #e2e2e2;
    stroke-dasharray: 2;
  }

  .tick text {
    fill: #ccc;
    text-anchor: start;
  }

  .tick.tick-0 line {
    stroke-dasharray: 0;
  }

  .x-axis .tick text {
    text-anchor: middle;
  }

  .bars rect {
    transition: all 1s;
    fill: #a11;
    stroke: none;
    opacity: 0.65;
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
