<script lang="ts">
	import { Canvas } from "@threlte/core";
	import { Studio } from "@threlte/studio";
	import { dev } from "$app/environment";
	import Camera from "$lib/components/Camera.svelte";
	import Scene from "$lib/components/Scene.svelte";
</script>

<div class="fixed inset-0">
	<Canvas>
		{#if dev}
			<Studio>
				<Scene />
			</Studio>
		{:else}
			<Scene />
		{/if}
	</Canvas>
</div>

<Camera />
