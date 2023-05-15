<script>
  import {
    sankey as d3sankey,
    // SankeyGraph,
    // SankeyLink,
    // SankeyNode,
    sankeyLeft,
    sankeyRight,
    sankeyCenter,
    sankeyJustify,
  } from "d3-sankey";
  import { linkHorizontal } from "d3-shape";
  import { scaleSequential } from "d3-scale";
  import { interpolateCool } from "d3-scale-chromatic";
  import { extent as d3Extent } from "d3-array";

  import Group from "./Group.svelte";
  import graph from "./graph";

  export let width = 1000;
  export let height = 500;
  export let margin = {
    top: 0,
    left: 0,
    right: 200,
    bottom: 0,
  };
  let nodeHovered = -1;
  let linkHovered = -1;
  let recorded_mouse_position = {
    x: 0,
    y: 0,
  };

  export let size = undefined;
  export let nodeId = undefined;
  export let nodeWidth = undefined;
  export let nodePadding = 0;
  export let nodeSort = undefined;
  export let extent = [
    [1, 1],
    [width - 1, height - 6],
  ];
  export let iterations = undefined;

  const color = scaleSequential(interpolateCool);
  console.log(color);

  export let colors = [
    "#E8B0D1",
    "#32DCE3",
    "#ECDC8F",
    "#01CA97",
    "#F4AD6A",
    "#4997D0",
    "#67923D",
  ];
  // console.log(colors);

  let nodes, links;
  $: {
    const sankey = d3sankey();

    if (size) sankey.size(size);
    if (nodeId) sankey.nodeId(nodeId);
    if (nodeWidth) sankey.nodeWidth(nodeWidth);
    if (nodePadding) sankey.nodePadding(nodePadding);
    if (nodeSort) sankey.nodeSort(nodeSort);
    if (extent) sankey.extent(extent);
    if (iterations) sankey.iterations(iterations);

    const data = sankey(graph);
    nodes = data.nodes;
    links = data.links;
    console.log(links);

    // Set color domain after sankey() has set depth
    // color.domain(d3Extent(nodes, (d) => d.depth));
  }

  const path = linkHorizontal()
    // @ts-ignore
    .source((d) => [d.source.x1, d.y0])
    // @ts-ignore
    .target((d) => [d.target.x0, d.y1]);

  let highlightLinkIndexes = [];
</script>

<div>
  <h3 style="margin-top: 15px">
    Occupations Before and After Migrating to Another Country
  </h3>

  <div>
    <p class="center-text">
      This Sankey diagram shows the occupations of migrants before and after
      migrating to from the Northern Triangle to another country. The thickness
      of the links represents the number of migrants. Hover over a node to see
      the number of migrants in that occupation. Hover over a link to see the
      number of migrants who changed from one occupation to another.

      <br /><br />

      Though most migrants like Soledad are making the journey due to financial
      instability at home, job peospects after migration are not significantly
      better.
    </p>
  </div>

  <div class="measure" bind:offsetWidth={width} bind:offsetHeight={height} />

  <svg viewBox="0 0 1000 1000">
    <g>
      <g>
        {#each links as link, i (`link-${i}`)}
          <path
            key={`link-${i}`}
            d={path(link) || undefined}
            stroke={highlightLinkIndexes.includes(i)
              ? colors[link.source.index]
              : "black"}
            stroke-width={Math.max(1, link.width)}
            opacity={highlightLinkIndexes.includes(i) ? 0.5 : 0.1}
            fill="none"
            on:mouseover={(e) => {
              highlightLinkIndexes = [i];
              linkHovered = i;
              recorded_mouse_position = {
                x: event.pageX,
                y: event.pageY,
              };
            }}
            on:mouseout={(e) => {
              highlightLinkIndexes = [i];
              linkHovered = -1;
            }}
            on:focus={(e) => {}}
            on:blur={(e) => {}}
          />
        {/each}
      </g>

      {#each nodes as node, i (`node-${i}`)}
        <Group top={node.y0} left={node.x0}>
          <rect
            id={`rect-${i}`}
            width={node.x1 - node.x0}
            height={node.y1 - node.y0}
            fill={node.color}
            opacity={0.5}
            stroke="white"
            stroke-width={2}
            on:mouseover={(e) => {
              highlightLinkIndexes = [
                ...node.sourceLinks.map((l) => l.index),
                ...node.targetLinks.map((l) => l.index),
              ];
              nodeHovered = i;
              recorded_mouse_position = {
                x: event.pageX,
                y: event.pageY,
              };
            }}
            on:mouseout={(e) => {
              highlightLinkIndexes = [];
              nodeHovered = -1;
            }}
            on:focus={(e) => {}}
            on:blur={(e) => {}}
          />

          <text
            x={30}
            y={(node.y1 - node.y0) / 2}
            dy={5}
            style="font: 16px sans-serif"
            _verticalAnchor="middle"
          >
            {node.name}
          </text>
        </Group>
      {/each}
    </g>
  </svg>

  <div
    class={nodeHovered === -1 ? "tooltip-hidden" : "tooltip-visible"}
    style="left: {recorded_mouse_position.x +
      40}px; top: {recorded_mouse_position.y + 40}px"
  >
    {#if nodeHovered !== -1}
      <p>Occupation: {nodes[nodeHovered].name}</p>
      <p>Number of People: {nodes[nodeHovered].value}</p>
    {/if}
  </div>

  <div
    class={linkHovered === -1 ? "tooltip-hidden" : "tooltip-visible"}
    style="left: {recorded_mouse_position.x +
      40}px; top: {recorded_mouse_position.y + 40}px"
  >
    {#if linkHovered !== -1}
      <p>Number of People: {links[linkHovered].value}</p>
      {links[linkHovered].source.name} → {links[linkHovered].target.name}
    {/if}
  </div>

  <div class="measure" bind:offsetWidth={width} bind:offsetHeight={height} />
</div>

<style>
  .graph {
    position: relative;
    /* width: 100%; */
    height: 100%;
    margin: 0 auto;
  }
  .measure {
    position: absolute;
    top: 0;
    left: 0;
    /* width: 70%; */
    height: 90%;
    pointer-events: none;
    /* background: rgba(255, 0, 0, 0.5); */
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
