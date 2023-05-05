<script lang="ts">
  import TreeView from "./components/ui/TreeView.svelte";
  import TreeAdd from "./components/ui/TreeAdd.svelte";
  import type { Tree } from "./types";
  import { onMount } from "svelte";
  let tree: Tree = {
	label: "root"
  };

  const handleClick = () => {
    console.log("Im here");
  }

  document.addEventListener('contextmenu', event => event.preventDefault());
  
</script>

<main>
  <div class="treeview-container">
    <TreeView tree={tree} onClick={handleClick} />
  </div>
</main>

<style>

  .treeview-container {
    background-color: var(--primary-color-light);
    width: 100%;
    border-radius: 10px;
    padding: 1rem;
	/* Add Box Shadow*/
	box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
	padding-left: 10px;
	padding-right: 0px;
  }
</style>
