<script lang="ts">
	import type { NormalizedLandmark } from "@mediapipe/tasks-vision";
	import { LANDMARKS } from "$lib/constants";
	import { T } from "@threlte/core";
	import { Color, Vector3 } from "three";
	import { hands } from "$lib/state.svelte";

	function translateLandmark(lm: NormalizedLandmark) {
		return new Vector3(-(lm.x - 0.5) * 18, -(lm.y - 0.5) * 10, lm.z * -6 + 2);
	}
</script>

<!-- eslint-disable svelte/require-each-key -->

{#each hands.current as hand}
	<T.Group name="{hand.handedness} Hand">
		{#each hand.landmarks as landmark}
			<T.Mesh position={translateLandmark(landmark).toArray()}>
				<T.SphereGeometry args={[0.05, 8, 8]} />

				<T.MeshStandardMaterial
					color={Color.NAMES.red}
					emissive={Color.NAMES.red}
					emissiveIntensity={0.1}
				/>
			</T.Mesh>
		{/each}

		{#each LANDMARKS as [start, end]}
			<T.Line>
				<T.BufferGeometry
					attach={({ parent, ref }) => {
						ref.setFromPoints([
							translateLandmark(hand.landmarks[start]),
							translateLandmark(hand.landmarks[end]),
						]);

						// @ts-expect-error - inference
						parent.geometry = ref;
					}}
				/>

				<T.LineBasicMaterial color={Color.NAMES.cyan} />
			</T.Line>
		{/each}
	</T.Group>
{/each}
