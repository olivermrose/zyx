<script lang="ts">
	import { interactionPhase } from "$lib/state.svelte";
	import { fade, fly } from "svelte/transition";

	const { opacity }: { opacity: number } = $props();
</script>

<div class="pointer-events-none fixed inset-0 z-10" style:opacity>
	{#if interactionPhase.current === "attract"}
		<div class="mt-16 flex h-full flex-col items-center" transition:fade={{ duration: 300 }}>
			<p
				class="text-center font-display text-fluid-7xl/normal font-normal tracking-widest text-slate-900 uppercase"
			>
				Raise your hand
			</p>

			<p class="font-serif text-2xl text-slate-900">to interact</p>
		</div>

		<div
			class="pointer-events-none fixed bottom-8 left-1/2 z-10 -translate-x-1/2"
			transition:fade={{ duration: 300 }}
		>
			<div class="flex flex-col items-center gap-2">
				<span
					class="mb-1 inline-block font-sans text-sm font-semibold tracking-widest text-slate-900 uppercase"
				>
					Or scroll to learn more
				</span>

				<svg class="size-6 animate-bounce" width="32" height="32" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="m12 22l-7-7l1.4-1.425l4.6 4.6V11h2v7.175l4.6-4.575L19 15zM11 9V6h2v3zm0-5V2h2v2z"
					/>
				</svg>
			</div>
		</div>
	{:else if interactionPhase.current === "engage"}
		<div
			class="absolute bottom-0 left-1/2 -translate-x-1/2"
			in:fly={{ y: 12, duration: 300, delay: 150 }}
			out:fly={{ y: 12, duration: 300 }}
		>
			<div class="flex items-center gap-3 pb-8">
				<span
					class="font-sans text-sm font-semibold tracking-widest text-slate-900 uppercase"
				>
					Hover near a part
				</span>
				<span class="text-slate-500">—</span>
				<span class="font-sans text-sm font-semibold tracking-widest text-accent uppercase">
					Pinch to grab
				</span>
			</div>
		</div>
	{/if}
</div>
