<script>
  import { json } from "d3";
  import Marks from "./Marks.svelte";
  import Pie from "./Pie.svelte";
  import Pie2 from "./Pie2.svelte";
  import BarChart from "./BarChart.svelte";
  import BarChart2 from "./BarChart2.svelte";
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
    
    <BarChart />
    <BarChart2 />
    <Sankey />
    <Pie />
    <Pie2 />
  </section>
</main>
