<script lang="ts">
	import { fade } from "svelte/transition";

	interface Props {
		visible: boolean;
	}

	const { visible }: Props = $props();
</script>

{#if visible}
	<section
		id="explore"
		class="absolute inset-x-0 inset-y-10 flex flex-col items-center justify-between"
		transition:fade
	>
		<h2 class="mb-6 font-display leading-none">Explore</h2>

		<div class="text-center">
			<p class="mb-8 max-w-prose text-lg">
				Manipulate the VK-43 directly using hand tracking. Disassemble the action, examine
				each component, and understand how the mechanism operates.
			</p>

			<a
				class={[
					"group relative z-1 inline-flex items-center gap-2 overflow-hidden border border-slate-900 px-6 py-4 font-semibold uppercase",
					"before:absolute before:inset-x-0 before:-bottom-full before:-z-1 before:size-full before:bg-slate-900",
					"hover:text-black hover:before:bottom-0",
					"transition-colors duration-500 before:transition-all before:duration-500",
				]}
				href="/explore"
			>
				<span>Begin interactive experience</span>

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
			</a>
		</div>
	</section>
{/if}

<style>
	h2 {
		font-size: clamp(3rem, 12vw, 8rem);
	}
</style>
