<script lang="ts">
	import "./layout.css";
	import "@fontsource/gloock";
	import "@fontsource-variable/eb-garamond/wght.css";
	import "@fontsource-variable/roboto-condensed/wght.css";

	const { children } = $props();
</script>

<main>
	{@render children()}
</main>
