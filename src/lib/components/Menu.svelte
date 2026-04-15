<script lang="ts">
	import { menuOpen } from "$lib/state.svelte";
	import { fade } from "svelte/transition";
	import Home from "../../routes/+page.svelte";
</script>

{#if menuOpen.current}
	<div
		id="menu"
		class="fixed inset-0 z-40 overflow-y-auto bg-off-white"
		transition:fade={{ duration: 350 }}
	>
		<Home />
	</div>
{/if}
