<script>
  import * as d3 from "d3";
  // our interactive data
  // export let migration_medium_data = [];
  let migration_medium_data = [
    { index: 0, size: 893, name: "Yes, you reside in the destination country" },
    { index: 1, size: 338, name: "Not yet, in transit to destination country" },
    { index: 2, size: 115, name: "Passed away / disappeared" },
    { index: 3, size: 95, name: "Returned to country of origin" },
  ];

  let arcGenerator = d3
    .arc()
    .innerRadius(10)
    .outerRadius(100)
    .padAngle(0.02)
    .cornerRadius(4);

  let pieAngleGenerator = d3.pie().value((d) => d[0]);
  let arc_data = [];

  const arc_color = d3
    .scaleLinear()
    .range(["#faffd1", "#db921d", "#b86a04", "#a65d29", "#6e3003"])
    .domain([0, 15, 30, 45, 60]);

  let hovered = -1;

  let recorded_mouse_position = {
    x: 0,
    y: 0,
  };

  $: {
    // interactive data here
    let migration_medium_counts = d3.rollups(
      migration_medium_data,
      (v) => v.length,
      (d) => d.size
    );

    arc_data = pieAngleGenerator(migration_medium_counts);
    console.log(arc_data);
  }
</script>

<h2 style="margin-top: 15px">Legal vs. Illegal Migration</h2>
<div class="visualization">
  <svg width="500" height="500">
    <g transform="translate(250, 120)">
      {#each arc_data as data, index}
        <path
          d={arcGenerator({
            startAngle: data.startAngle,
            endAngle: data.endAngle,
          })}
          fill={index === hovered ? "brown" : arc_color(data.data[0])}
          on:mouseover={(event) => {
            hovered = index;
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
    style="left: {recorded_mouse_position.x +
      40}px; top: {recorded_mouse_position.y + 40}px"
  >
    {#if hovered !== -1}
      {arc_data[hovered].data[0]} people responded: 
      {migration_medium_data[arc_data[hovered].index].name}
    {/if}
  </div>
</div>

<style>
  .visualization {
    font: 25px sans-serif;
    margin: auto;
    margin-top: 1px;
    text-align: middle;
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
