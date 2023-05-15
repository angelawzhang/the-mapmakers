<script>
  import * as d3 from "d3";
  // our interactive data
  // export let migration_medium_data = [];
  let migration_medium_data = [
    { index: 0, size: 54.1, name: "Illegally with Coyote" },
    { index: 1, size: 20.5, name: "Illegally Independently" },
    { index: 2, size: 7.0, name: "National Identity Document" },
    { index: 3, size: 5.8, name: "Tourist Visa" },
    { index: 4, size: 2.8, name: "Passport, No Visa Required" },
    { index: 5, size: 2.7, name: "Other" },
    { index: 6, size: 2.3, name: "Illegally via Caravans" },
    { index: 7, size: 1.9, name: "Foreign Residence" },
    { index: 8, size: 1.8, name: "Work Visa" },
    { index: 9, size: 0.5, name: "Papers from Mexico" },
    { index: 10, size: 0.4, name: "Student Visa" },
    { index: 11, size: 0.2, name: "Refuge/Asylum" },
  ];

  let arcGenerator = d3
    .arc()
    .innerRadius(0)
    .outerRadius(100)
    .padAngle(0)
    .cornerRadius(0);

  let pieAngleGenerator = d3.pie().value((d) => d[0]);
  let arc_data = [];

  const arc_color = d3
    .scaleOrdinal()
    .range([
      "#01CA97",
      "#E8B0D1",
      "#208a9a",
      "#27aab5",
      "#2ec9d0",
      "#31d8dd",
      "#f69ad2",
      "#4ee1e5",
      "#5de4e8",
      "#9beff2",
      "#abf1f4",
      "#cef7fa",
    ])
    .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

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

<h3 style="margin-top: 15px">Legal vs. Illegal Migration</h3>
<div class="visualization">
  <svg width="500" height="500">
    <g transform="translate(250, 120)">
      {#each arc_data as data, index}
        <path
          d={arcGenerator({
            startAngle: data.startAngle,
            endAngle: data.endAngle,
          })}
          fill={index === hovered ? "#ECDC8F" : arc_color(index)}
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
      {arc_data[hovered].data[0]}% of people migrated via
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
    font-family: "Lato", sans-serif;
    width: 200px;
    position: absolute;
  }

  .tooltip-visible {
    font: 16px sans-serif;
    font-family: "Lato", sans-serif;
    visibility: visible;
    background-color: #e6c39c;
    border-radius: 10px;
    width: 200px;
    color: black;
    position: absolute;
    padding: 10px;
  }
</style>
