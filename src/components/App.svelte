<script>
  import List from "./List.svelte";
  import Map from "./Map.svelte";
  import Sankey from "./Sankey/Sankey.svelte";
</script>

<div class="container">
  <div class="pane left">
    <Map />
  </div>
  <div class="pane right">
    <List />
  </div>
  <!-- <Sankey /> -->
</div>
