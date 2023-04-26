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
</script>

<main>
  <section class="graph">
    <h2 style="margin-top: 15px">Legal vs. Illegal Migration</h2>
    <Pie />
    <BarChart />
    <Sankey />
  </section>
</main>
