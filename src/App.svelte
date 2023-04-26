<script>
  import { json } from "d3";
  import Marks from "./Marks.svelte";
  import Pie from "./Pie.svelte";
  import BarChart from "./BarChart.svelte";
  import Sankey from "./Sankey/Sankey.svelte";
  // import graph from "./Sankey/graph";


  let dataset = [];
  json(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
  ).then((data) => {
    dataset = data.features;
  });

  //for Pie
  let todo_record = [
    { index: 0, size: 20.4, names: "idk" },
    { index: 1, size: 23.8, names: "idk" },
    { index: 2, size: 55.8, names: "idk" },
  ];

</script>



<main>
  <!-- <svg {width} {height}>
    <Marks {dataset} />
  </svg> -->
  <section class="graph">
    <!-- <h2 style="margin-top: 15px">Legal vs. Illegal Migration</h2> -->
    <!-- <Pie  bind:todo_record /> -->
    <BarChart/>
    <Sankey/>
    </section>
</main>
