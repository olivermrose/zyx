<script lang="ts">
	import "./layout.css";
	import "@fontsource/gloock";
	import "@fontsource-variable/eb-garamond/wght.css";
	import "@fontsource-variable/roboto-condensed/wght.css";

	let { children } = $props();
</script>

<svelte:head>
	<title>VK-43 · Vostok Karabin Model 1943</title>
</svelte:head>

<main>
	{@render children()}
</main>
