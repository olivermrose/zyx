<script lang="ts">
	import { ANNOTATIONS } from "$lib/data/annotations";
	import { cubicIn, cubicOut } from "svelte/easing";
	import { fade, fly } from "svelte/transition";

	interface Props {
		visible: boolean;
		phase: number;
	}

	const { visible, phase }: Props = $props();

	const annotation = $derived(phase >= 1 && phase <= 6 ? ANNOTATIONS[phase - 1] : null);
</script>

{#if visible}
	<aside class="absolute inset-0 flex items-center" transition:fade>
		<div id="timeline" class="absolute inset-y-0 left-10 w-px">
			<div
				class="absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full bg-accent"
			></div>
		</div>

		{#if annotation}
			{#key phase}
				<div
					class="absolute top-1/2 left-24 max-w-sm -translate-y-1/2"
					in:fly={{ y: 50, duration: 500, delay: 90, easing: cubicOut }}
					out:fly={{ y: -50, duration: 280, easing: cubicIn }}
				>
					<span class="font-display text-8xl">{annotation.id}</span>
					<p class="text-lg font-semibold text-accent uppercase">{annotation.part}</p>
					<hr class="my-4 w-8" />
					<p class="font-serif text-lg/snug">{annotation.desc}</p>
				</div>
			{/key}
		{/if}
	</aside>
{/if}

<style>
	aside {
		backdrop-filter: blur(12px);
		mask-image: linear-gradient(to right, black 0%, black 25%, transparent 80%);
		background-color: color-mix(in oklch, tan 65%, transparent);
	}

	#timeline {
		background: linear-gradient(
			to bottom,
			transparent 4%,
			color-mix(in oklch, black 40%, transparent) 18%,
			color-mix(in oklch, black 40%, transparent) 82%,
			transparent 96%
		);
	}
</style>
