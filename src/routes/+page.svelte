<script lang="ts">
	import { COLLECTION } from "$lib/data/collection";
	import { cubicOut } from "svelte/easing";
	import { fly } from "svelte/transition";
</script>

<div class="min-h-screen px-6 pt-24 pb-16 md:px-10 md:pt-28">
	<div class="mb-12" in:fly={{ y: 20, duration: 500, delay: 80, easing: cubicOut }}>
		<p class="font-sans text-xs font-semibold tracking-[0.2em] text-accent uppercase">
			The Collection
		</p>

		<h2 class="mt-1 font-serif text-2xl text-slate-900">A survey of arms, 1650 to present</h2>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each COLLECTION as entry, i (entry.id)}
			<a
				href="/{entry.id}"
				class="group block"
				in:fly={{ y: 32, duration: 500, delay: 160 + i * 60, easing: cubicOut }}
			>
				<div
					class="border border-slate-200 p-6 transition-all duration-300 group-hover:scale-[1.01] group-hover:border-accent"
				>
					<p class="font-display text-fluid-7xl leading-none text-slate-900 select-none">
						{entry.year}
					</p>

					<div
						class="mt-4 border-t border-slate-200 pt-4 transition-colors duration-300 group-hover:border-accent"
					>
						<p class="font-display text-xl text-slate-900">{entry.name}</p>

						<p
							class="mt-1 font-sans text-xs font-semibold tracking-widest text-accent uppercase"
						>
							{entry.origin} &bull; {entry.fullName}
						</p>

						<p
							class="mt-3 line-clamp-2 font-serif text-sm leading-relaxed text-slate-500"
						>
							{entry.description}
						</p>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
