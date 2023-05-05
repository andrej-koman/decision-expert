<script lang="ts">
    import type { Tree } from "../../types";
    export let tree: Tree;
    export let depth = 0;
    export let onClick = null;

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
    {#if label}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span on:click={clickHandler}>
        {#if children}
            <span>{expanded ? "▼" : "▶"}</span>
        {/if}
        <span>{label}</span>
    </span>
{/if}
{#if children && expanded}
<ul class="list leaf">
    {#each children as child}
        <li>
            <svelte:self tree = {child} depth={depth}  />
        </li>
    {/each}
</ul>
{/if}
</div>

<style>
.list {
    list-style: none;
}

.leaf:hover {
    background-color: var(--primary-color);
}
.node {
    cursor: pointer;
    width: max-content;
}
</style>