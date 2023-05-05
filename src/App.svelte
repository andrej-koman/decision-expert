<script lang="ts">
  import TreeView from "./components/ui/TreeView.svelte";
  import type { Tree } from "./types";
  let tree: Tree;

  tree = {
		label: "USA",
		children: [
			{
			  label: "Florida",
			  children: [
					{ label: "Jacksonville" },
					{ label: "Orlando" },
					{ label: "Miami" },
			  ]
		  },
			{
			  label: "California",
			  children: [
					{ label: "San Francisco" },
					{ label: "Los Angeles" },
					{ label: "Sacramento" },
			  ]
		  }
		]
	}
  const handleClick = (e: Event) => {
    console.log("click handler", e);
  }

</script>

<main>
  <TreeView tree={tree} onClick={handleClick} />
</main>

<style>
</style>
