<script lang="ts">
	import Annotation from "$lib/components/Annotation.svelte";
	import Camera from "$lib/components/Camera.svelte";
	import Scene from "$lib/components/Scene.svelte";
	import Stage from "$lib/components/Stage.svelte";
	import { menuOpen } from "$lib/state.svelte";
	import { Canvas } from "@threlte/core";
	import Lenis from "lenis";
	import { frame, useScroll } from "motion-sv";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	const { data } = $props();

	let infoProgress = $state(0);
	let dissolveProgress = $state(0);
	let driver = $state<HTMLElement>();

	const scroll = $derived(useScroll({ container: driver }));

	// svelte-ignore state_referenced_locally
	scroll.scrollYProgress.on("change", (value) => {
		infoProgress = value;
		// Dissolve completes in the first 5% of info scroll (~60vh)
		dissolveProgress = Math.min(1, value * 20);
	});

	const phase = $derived(Math.min(7, Math.floor(infoProgress * 7)));
	const stageOpacity = $derived(1 - dissolveProgress);

	const heroOpacity = $derived(
		dissolveProgress < 0.5
			? dissolveProgress * 2
			: phase >= 1
				? Math.max(0, 1 - (phase - 0.5) * 2)
				: 1,
	);

	onMount(() => {
		const lenis = new Lenis();
		frame.render((d) => lenis.raf(d.timestamp), true);

		return () => lenis.destroy();
	});
</script>

<div class="fixed inset-0">
	<Canvas>
		<Scene {dissolveProgress} {infoProgress} />
	</Canvas>
</div>

<Stage opacity={stageOpacity} />

<!-- Spacer -->
<div class="h-screen"></div>

<div class="relative h-[1200vh]" bind:this={driver}>
	<div class="sticky top-0 h-screen overflow-hidden">
		<!-- Hero text: fades in on dissolve, out as annotations begin -->
		<div
			class="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-16"
			style="opacity: {heroOpacity}"
		>
			<div class="text-center">
				<span class="font-sans text-xs font-semibold tracking-widest text-accent uppercase">
					{data.model.manufacturer} &bull; {data.model.year}
				</span>

				<h1 class="font-display leading-none text-slate-900">{data.model.name}</h1>
			</div>

			<div class="max-w-prose text-center">
				<span
					class="mb-3 inline-block font-sans text-sm font-semibold tracking-widest text-slate-500 uppercase"
				>
					{data.model.fullName}
				</span>

				<p class="font-serif text-xl/snug text-slate-900">
					{data.model.description}
				</p>
			</div>
		</div>

		<Annotation visible={dissolveProgress > 0.8 && phase >= 1 && phase <= 6} {phase} />

		{#if dissolveProgress > 0.8 && phase === 7}
			<section
				class="absolute inset-x-0 top-16 bottom-10 flex flex-col items-center justify-between"
				transition:fade
			>
				<h2 class="font-display text-fluid-9xl leading-none text-slate-900">Collection</h2>

				<div class="text-center">
					<p class="mb-8 max-w-prose font-serif text-lg text-slate-700">
						Explore the full archive — arms spanning three centuries of mechanical
						history.
					</p>

					<button
						class={[
							"group relative z-1 inline-flex items-center gap-2 overflow-hidden border border-slate-900 px-6 py-4 font-semibold uppercase",
							"before:absolute before:inset-x-0 before:-bottom-full before:-z-1 before:size-full before:bg-slate-900",
							"hover:text-off-white hover:before:bottom-0",
							"transition-colors duration-500 before:transition-all before:duration-500",
						]}
						onclick={() => (menuOpen.current = true)}
					>
						<span>Browse collection</span>

						<svg
							class="transition-transform duration-500 group-hover:translate-x-1"
							width="14"
							height="14"
							viewBox="0 0 14 14"
							fill="none"
							aria-hidden="true"
						>
							<path
								d="M2 7h10M8 3l4 4-4 4"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</div>
			</section>
		{/if}
	</div>
</div>

<div class="transition-opacity duration-100 ease-linear" style:opacity={stageOpacity}>
	<Camera />
</div>

<style>
	h1 {
		font-size: clamp(5.5rem, 16vw, 12rem);
	}
</style>
