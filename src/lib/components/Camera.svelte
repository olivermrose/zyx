<script lang="ts">
	import { HandTracker } from "$lib/hand-tracker";
	import { onMount } from "svelte";

	let video = $state<HTMLVideoElement>();

	onMount(async () => {
		if (!video) return;

		const stream = await navigator.mediaDevices.getUserMedia({ video: true });
		video.srcObject = stream;

		const { resolve } = Promise.withResolvers<void>();
		video.onloadeddata = () => resolve();

		const handTracker = new HandTracker(video);
		await handTracker.init();

		video.play();
	});
</script>

<video
	class="absolute right-4 bottom-4 z-9999 aspect-video max-w-1/5 -scale-x-100 rounded-2xl border-2 border-neutral-500 object-cover"
	autoplay
	muted
	playsinline
	bind:this={video}
></video>
