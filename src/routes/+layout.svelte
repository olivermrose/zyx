<script lang="ts">
	import Menu from "$lib/components/Menu.svelte";
	import Nav from "$lib/components/Nav.svelte";
	import "./layout.css";
	import "@fontsource/gloock";
	import "@fontsource-variable/eb-garamond/wght.css";
	import "@fontsource-variable/roboto-condensed/wght.css";

	const { children } = $props();
</script>

<header>
	<Nav />
	<Menu />
</header>

<main>
	{@render children()}
</main>
