<script lang="ts">
	import { motion, useScroll, useTransform } from "motion-sv";

	let hero = $state<HTMLElement>();

	const { scrollYProgress } = $derived(useScroll({ target: hero }));
	const opacity = $derived(useTransform(scrollYProgress, [0, 1], [1, 0]));
</script>

<motion.section
	id="hero"
	class="absolute inset-0 z-1 h-[200vh]"
	style={{ opacity }}
	bind:ref={hero}
>
	<div class="sticky top-0 flex h-screen flex-col items-center justify-between py-10">
		<div class="text-center">
			<span class="text-sm font-semibold text-accent uppercase">
				Vostok Arms Factory &bull; Chelyabinsk &bull; 1943
			</span>

			<h1 class="font-display leading-none">VK-43</h1>
		</div>

		<div class="text-center">
			<span class="mb-4 inline-block text-lg font-medium text-neutral-500 uppercase">
				Vostok Karabin, Model 1943
			</span>

			<p class="mb-6 max-w-prose font-serif text-xl/snug">
				Developed at the Tula Arms Plant between 1941 and 1943, the VK-43 was a
				last-generation bolt-action rifle produced alongside emerging semi-automatic
				designs. Fewer than 8,000 examples were manufactured before the programme was
				superseded. Today, no more than twelve verified specimens are known to survive.
			</p>

			<span class="text-sm uppercase">Scroll to learn more</span>
		</div>
	</div>
</motion.section>

<style>
	h1 {
		font-size: clamp(5.5rem, 16vw, 12rem);
	}
</style>
