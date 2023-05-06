<script lang="ts">
  import type { Tree } from "../../types";
  import { createEventDispatcher } from "svelte";
  export let tree: Tree;
  export let depth = 0;
  export let onClick;

  const dispatch = createEventDispatcher();

  const { label, children } = tree;
  let { expanded = true } = tree;

  function clickHandler() {
    expanded = !expanded;
    if (!children && !onClick) {
      onClick(tree, depth, expanded);
    }
  }

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();

    // Find the element that was clicked
    const target = (e.target as HTMLElement).closest(".tooltip");

    if (!target) return;

    // Determine the position of the element
    const x = target.clientLeft + target.clientWidth;
    const y = target.clientTop + target.clientHeight;

    // Show the context menu
    const contextMenu = document.createElement("div");
    contextMenu.style.position = "absolute";
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.innerHTML = `
      <ul>
        <li><a href="#" on:click={editNode}>Edit</a></li>
        <li><a href="#" on:click={addNode}>Add</a></li>
      </ul>
    `;
    document.body.appendChild(contextMenu);

    // Handle clicks outside the context menu to close it
    function handleOutsideClick(event: MouseEvent) {
      if (!contextMenu.contains(event.target as Node)) {
        contextMenu.remove();
        window.removeEventListener("click", handleOutsideClick);
      }
    }
    window.addEventListener("click", handleOutsideClick);
  };
</script>

<div class="node" on:contextmenu={handleContextMenu}>
  {#if !!label}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="tooltip" on:click={clickHandler}>
      <span>
        {#if children}
          <span>{expanded ? "▼" : "▶"}</span>
        {/if}
        <span>{label}</span>
      </span>
    </div>
  {/if}
  {#if children && expanded}
    <ul class="list">
      {#each children as child}
        <li>
          <svelte:self tree={child} {depth} {onClick} />
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .list {
    list-style: none;
  }
  .tooltip:hover {
    background-color: var(--primary-color);
    color: #fff;
    border-radius: 5px;
  }
  .tooltip {
    padding: 5px;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version */
  }

  .node {
    width: 100%;
    cursor: pointer;
    width: max-content;
    padding: 5px;
  }
</style>