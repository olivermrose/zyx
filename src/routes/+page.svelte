<script lang="ts">
	import Annotation from "$lib/components/Annotation.svelte";
	import Display from "$lib/components/Display.svelte";
	import Explore from "$lib/components/Explore.svelte";
	import Hero from "$lib/components/Hero.svelte";
	import { Canvas } from "@threlte/core";
	import Lenis from "lenis";
	import { frame, useScroll } from "motion-sv";
	import { onMount } from "svelte";

	let scrollProgress = $state(0);
	let driver = $state<HTMLElement>();

	const scroll = $derived(useScroll({ container: driver }));

	// svelte-ignore state_referenced_locally
	scroll.scrollYProgress.on("change", (value) => {
		scrollProgress = value;
	});

	const phase = $derived(Math.min(7, Math.floor(scrollProgress * 7)));

	onMount(() => {
		const lenis = new Lenis();
		frame.render((d) => lenis.raf(d.timestamp), true);

		return () => lenis.destroy();
	});
</script>

<Hero />

<div class="relative h-[1200vh]" bind:this={driver}>
	<div class="sticky top-0 h-screen overflow-hidden">
		<Canvas>
			<Display progress={scrollProgress} />
		</Canvas>

		<Annotation visible={phase >= 1 && phase <= 6} {phase} />
		<Explore visible={phase === 7} />
	</div>
</div>
