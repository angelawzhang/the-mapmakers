<script>
  import { getContext } from "svelte";
  import { line, curveCardinalClosed } from "d3-shape";

  const { data, width, height, xGet, config } = getContext("LayerCake");

  /**	@type {String} [fill='#f0c'] The radar's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color. */
  export let fill = "#f0c";

  /**	@type {String} [stroke='#f0c'] The radar's stroke color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color. */
  export let stroke = "#f0c";

  /**	@type {Number} [stroke=2] The radar's stroke color. */
  export let strokeWidth = 2;

  /**	@type {Number} [fillOpacity=0.5] The radar's fill opacity. */
  export let fillOpacity = 0.5;

  /**	@type {Number} [r=4.5] Each circle's radius. */
  export let r = 8;

  /**	@type {String} [circleFill="#f0c"] Each circle's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color. */
  export let circleFill = "#f0c";

  /**	@type {String} [circleStroke="#fff"] Each circle's stroke color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color. */
  export let circleStroke = "#fff";

  /**	@type {Number} [circleStrokeWidth=1] Each circle's stroke width. */
  export let circleStrokeWidth = 1;

  $: angleSlice = (Math.PI * 2) / $config.x.length;

  $: path = line()
    .curve(curveCardinalClosed)
    .x((d, i) => d * Math.cos(angleSlice * i - Math.PI / 2))
    .y((d, i) => d * Math.sin(angleSlice * i - Math.PI / 2));

  let hovered = -1;

  let recorded_mouse_position = {
    x: 0,
    y: 0,
  };
</script>

<g transform="translate({$width / 1.8}, {$height / 1.5})">
  {#each $data as row}
    {@const xVals = $xGet(row)}
    <path
      class="path-line"
      d={path(xVals)}
      {stroke}
      stroke-width={strokeWidth}
      {fill}
      fill-opacity={fillOpacity}
    />

    {#each xVals as circleR, i}
      {@const thisAngleSlice = angleSlice * i - Math.PI / 2}
      <circle
        cx={circleR * Math.cos(thisAngleSlice)}
        cy={circleR * Math.sin(thisAngleSlice)}
        {r}
        fill={circleFill}
        stroke={circleStroke}
        stroke-width={circleStrokeWidth}
        on:mouseover={(event) => {
          hovered = i;
          recorded_mouse_position = {
            x: circleR * Math.cos(thisAngleSlice),
            y: circleR * Math.sin(thisAngleSlice),
          };
          console.log(i);
        }}
        on:mouseout={(event) => {
          hovered = -1;
        }}
      />
    {/each}
  {/each}
  <g
    class={hovered === -1 ? "radar-tooltip-hidden" : "radar-tooltip-visible"}
    transform="translate({recorded_mouse_position.x -
      80}, {recorded_mouse_position.y - 80})"
  >
    <rect
      fill="#E6C39C"
      width="650"
      height="80"
      rx="10"
      ry="10"
      transform="translate(-325, -42)"
    />
    <text dominant-baseline="middle" text-anchor="middle">
      {#if hovered !== -1}
        {$data[0][$config.x[hovered]]}% migrated via: {$config.x[hovered]}
      {/if}
    </text>
  </g>
</g>
