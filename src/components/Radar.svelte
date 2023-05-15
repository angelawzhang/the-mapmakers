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

<h3>Legal vs. Illegal Migration</h3>
<p>
  In 2007, a survey conducted by the LAMP project showed that more than 70% of
  migrants from El Salvador used coyotes to make the journey. Among this group,
  the cost of hiring a coyote averaged nearly $2000 — this is more than many
  will make in a month of work. Over a decade later, the means of migration
  continue to present challenges.
</p>
<div class="chart-container">
  <LayerCake
    padding={{ top: 30, right: 0, bottom: 7, left: 0 }}
    x={xKey}
    xDomain={[0, 60]}
    xRange={({ height }) => [0, height / 2]}
    {data}
  >
    <Svg class="center-radar" viewBox="0 0 670 670">
      <RadarAxis />
      <RadarFill />
    </Svg>
  </LayerCake>
</div>

<p>
  An overwhelming proportion of external migrations are still illegal—over 75%
  of people migrated illegally, whether that be with coyotes, caravans, or by
  themselves. This is likely because it's so difficult to obtain a visa or
  asylum, especially for citizens of the Northern Triangle trying to migrate to
  the United States. This “paper fortress” significantly limits legal options
  for migration, forcing many people to resort to illegal means.
</p>
