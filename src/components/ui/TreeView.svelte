<script lang="ts">
    import type { Tree } from "../../types";
    export let tree: Tree;
    export let depth = 0;
    export let onClick;

    const { label, children} = tree;
    let { expanded = true } = tree;

    function clickHandler() {
        expanded = !expanded;
        if (!children && !onClick)
        {
            onClick(tree, depth, expanded);
        }
    }
</script>

<div class="node">
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
                <svelte:self tree = {child} {depth} {onClick}  />
            </li>
        {/each}
    </ul>
{/if}
</div>

<style>
.list {
    list-style: none;
}
.node {
    cursor: pointer;
    width: max-content;
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
</style>