<script>
  import { scaleLinear, scaleBand } from "d3-scale";
  import { slide } from "svelte/transition";
  import * as d3 from "d3";

  let points = [
    {
      id: 1,
      reason: "💼",
      description: "Search for better job",
      numOfHouseholds: 1239,
    },
    { id: 2, reason: "👔", description: "Unemployment", numOfHouseholds: 618 },
    {
      id: 3,
      reason: "💸",
      description: "Money for other",
      numOfHouseholds: 351,
    },
    { id: 4, reason: "💰", description: "Remittances", numOfHouseholds: 277 },
    {
      id: 5,
      reason: "🥙",
      description: "Money for food",
      numOfHouseholds: 234,
    },
    {
      id: 6,
      reason: "👨‍👩‍👦‍👦",
      description: "Fam reunification",
      numOfHouseholds: 137,
    },
    { id: 7, reason: "⚠️", description: "Unsafety", numOfHouseholds: 118 },
    { id: 8, reason: "📚", description: "For Study", numOfHouseholds: 80 },
    { id: 9, reason: "❓", description: "Other", numOfHouseholds: 70 },
  ];

  $: reasons = points.map((d) => d.reason);

  const yTicks = [0, 400, 700, 1000, 1300];
  const padding = { top: 20, right: 15, bottom: 20, left: 25 };

  let width = 500;
  let height = 500;

  let hovered = -1;
  let recorded_mouse_position = {
    x: 0,
    y: 0,
  };

  let showAll = true;

  function formatMobile(tick) {
    return "'" + tick.toString().slice(-2);
  }

  function getButtonString(showAll) {
    if (showAll) {
      return "Show only top 5";
    } else {
      return "Show all";
    }
  }

  function updateData() {
    if (showAll) {
      points = [
        {
          id: 1,
          reason: "Search for better job",
          description: "Search for better job",
          numOfHouseholds: 1239,
        },
        {
          id: 2,
          reason: "Unemployment",
          description: "Unemployment",
          numOfHouseholds: 618,
        },
        {
          id: 3,
          reason: "Money for other",
          description: "Money for other",
          numOfHouseholds: 351,
        },
        {
          id: 4,
          reason: "Remittances",
          description: "Remittances",
          numOfHouseholds: 277,
        },
        {
          id: 5,
          reason: "Money to buy food",
          description: "Money to buy food",
          numOfHouseholds: 234,
        },
      ];
      // points = points.map((d) => ({
      //   ...d,
      //   numOfHouseholds: d.numOfHouseholds > 200 ? d.numOfHouseholds : 0,
      // }));
      // const timeout = setTimeout(() => {
      //   points = points.filter((d) => d.numOfHouseholds > 200);
      // }, 200);

      showAll = false;
    } else {
      points = [
        {
          id: 1,
          reason: "💼",
          description: "Search for better job",
          numOfHouseholds: 1239,
        },
        {
          id: 2,
          reason: "👔",
          description: "Unemployment",
          numOfHouseholds: 618,
        },
        {
          id: 3,
          reason: "💸",
          description: "Money for other",
          numOfHouseholds: 351,
        },
        {
          id: 4,
          reason: "💰",
          description: "Remittances",
          numOfHouseholds: 277,
        },
        {
          id: 5,
          reason: "🥙",
          description: "Money for food",
          numOfHouseholds: 234,
        },
        {
          id: 6,
          reason: "👨‍👩‍👦‍👦",
          description: "Fam reunification",
          numOfHouseholds: 137,
        },
        { id: 7, reason: "⚠️", description: "Unsafety", numOfHouseholds: 118 },
        { id: 8, reason: "📚", description: "For Study", numOfHouseholds: 80 },
        { id: 9, reason: "❓", description: "Other", numOfHouseholds: 70 },
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
  <button on:click={updateData}> {getButtonString(showAll)} </button>
</div>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
  <svg class="bar">
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
      {#each points as point, i}
        <rect
          x={xScale(point.reason)}
          y={yScale(point.numOfHouseholds)}
          width={barWidth - 4}
          height={height - padding.bottom - yScale(point.numOfHouseholds)}
          out:slide={{ duration: 1000 }}
          on:mouseover={(event) => {
            hovered = i;
            console.log(hovered);
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
      1000}px; top: {recorded_mouse_position.y - 400}px"
  >
    {#if hovered !== -1}
      <p>
        {points[hovered].numOfHouseholds} households main reason of migration was:
        {points[hovered].description}
      </p>
    {/if}
  </div>
</div>
<div>
  <p>
    What are some factors that are causing people to migrate from the Northern
    Triangle? The top 5 reasons of migration, which makes up 89% of the
    households that responded to the survey, are all due to financial reasons,
    including searching for a better job or hoping to get more money for food
    and other basic necessities.
  </p>
</div>

<style>
  .bars rect {
    transition: all 1s;
    fill: #a11;
    stroke: none;
    opacity: 0.65;
  }

  .y-axis-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
