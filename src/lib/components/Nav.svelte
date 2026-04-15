<script lang="ts">
	import { page } from "$app/state";
	import { menuOpen } from "$lib/state.svelte";
	import { fade } from "svelte/transition";
</script>

<nav
	class="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10"
	in:fade={{ duration: 600, delay: 200 }}
>
	<a
		href="/"
		class="font-sans text-sm font-semibold tracking-widest text-slate-900 uppercase transition-opacity hover:opacity-60"
	>
		The Chamber
	</a>

	{#if page.route.id !== "/"}
		<button
			class="group flex flex-col items-end gap-1.5 transition-opacity hover:opacity-60"
			type="button"
			onclick={() => (menuOpen.current = !menuOpen.current)}
			aria-label={menuOpen.current ? "Close menu" : "Open menu"}
		>
			<span
				class={[
					"block h-px bg-slate-900 transition-all duration-300",
					menuOpen.current ? "w-4" : "w-6",
				]}
			></span>

			<span class="block h-px w-6 bg-slate-900 transition-all duration-300"></span>

			<span
				class={[
					"block h-px bg-slate-900 transition-all duration-300",
					menuOpen.current ? "w-4" : "w-6",
				]}
			></span>
		</button>
	{/if}
</nav>
