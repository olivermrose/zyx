<script lang="ts">
	import { dev } from "$app/environment";
	import Camera from "$lib/components/Camera.svelte";
	import Scene from "$lib/components/Scene.svelte";
	import { ANNOTATIONS } from "$lib/constants";
	import { grabbedPart } from "$lib/state.svelte";
	import { Canvas } from "@threlte/core";
	import { Studio } from "@threlte/studio";
	import { fade } from "svelte/transition";

	const annotation = $derived(ANNOTATIONS.find((a) => a.part === grabbedPart.current));
</script>

<div class="fixed top-6 left-1/2 z-1 -translate-x-1/2 translate-y-0">
	<p class="text-center text-slate-900">
		Move your hands in front of your camera and hover over a part. Pinch near its center and
		drag with your dominant hand to move and rotate it. Pinch with your non-dominant hand while
		a part is grabbed to scale it.
	</p>
</div>

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
