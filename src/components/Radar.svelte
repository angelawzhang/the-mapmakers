<script>
  import { LayerCake, Svg } from "layercake";
  import { scaleLinear } from "d3-scale";

  import RadarFill from "./RadarFill.svelte";
  import RadarAxis from "./RadarAxis.svelte";

  import data from "./radarData.js";

  const seriesKey = "name";
  const xKey = [
    "Visa",
    "Illegally with Coyote",
    "National Identity Document",
    "Passport, No Visa Required",
    "Other",
    "Illegally Independently",
    "Illegally via Caravans",
    "Foreign Residence",
    "Papers from Mexico",
    "Refuge/Asylum",
  ];

  const seriesNames = Object.keys(data[0]).filter((d) => d !== seriesKey);

  data.forEach((d) => {
    seriesNames.forEach((name) => {
      d[name] = +d[name];
    });
  });
</script>

<h2>Legal vs. Illegal Migration</h2>

<div class="chart-container">
  <LayerCake
    padding={{ top: 30, right: 0, bottom: 7, left: 0 }}
    x={xKey}
    xDomain={[0, 60]}
    xRange={({ height }) => [0, height / 2]}
    {data}
  >
    <Svg viewBox="0 0 900 900">
      <RadarAxis />
      <RadarFill />
    </Svg>
  </LayerCake>
</div>
