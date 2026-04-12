<script lang="ts">
	import { Canvas } from "@threlte/core";
	import { Studio } from "@threlte/studio";
	import { dev } from "$app/environment";
	import { grabbedPart } from "$lib/state.svelte";
	import Camera from "$lib/components/Camera.svelte";
	import Scene from "$lib/components/Scene.svelte";
	import { ANNOTATIONS } from "$lib/constants";
	import { fade } from "svelte/transition";

	const annotation = $derived(ANNOTATIONS.find((a) => a.part === grabbedPart.current));
</script>

<div class="fixed inset-0">
	<Canvas>
		{#if dev}
			<Studio>
				<Scene />
			</Studio>
		{:else}
			<Scene />
		{/if}
	</Canvas>
</div>

{#if annotation}
	<div
		class="pointer-events-none fixed bottom-0 left-1/2 -translate-x-1/2 translate-y-0"
		transition:fade={{ duration: 150 }}
	>
		<div class="flex flex-col items-center gap-2 pb-6 text-center">
			<p class="text-sm font-semibold text-accent uppercase">
				{annotation.part}
			</p>

			<p class="font-serif text-lg text-slate-900">{annotation.desc}</p>
		</div>
	</div>
{/if}

<Camera />
