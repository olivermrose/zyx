<script lang="ts">
	import { T, useTask, useThrelte } from "@threlte/core";
	import { Vector3, type PerspectiveCamera } from "three";
	import Rifle from "./Rifle.svelte";

	interface Hotspot {
		target: [number, number, number];
		radius: number;
		elevation: number; // radians above/below horizontal
		azimuth: number; // horizontal angle;
	}

	const HOTSPOTS: Hotspot[] = [
		{ target: [1, 1.44, 0], radius: 8.0, elevation: 0.12, azimuth: 0 }, // 0: hero
		{ target: [-0.49, 2.15, 0], radius: 2.8, elevation: 0.2, azimuth: 0.9 }, // 1: sight
		{ target: [-0.67, 1.82, 0], radius: 1.5, elevation: 0.25, azimuth: -0.7 }, // 2: bolt
		{ target: [-0.62, 1.22, 0], radius: 2.8, elevation: 0.18, azimuth: 0.6 }, // 3: body
		{ target: [-0.84, 1.09, 0], radius: 3, elevation: -0.2, azimuth: 0.8 }, // 4: magazine
		{ target: [-4.4, 1.25, 0], radius: 1.9, elevation: 0.22, azimuth: -0.4 }, // 5: bullet
		{ target: [4.67, 1.3, 0], radius: 3, elevation: 0.24, azimuth: 0.4 }, // 6: bayonet
		{ target: [1, 1.44, 0], radius: 8.0, elevation: 0.12, azimuth: 0 }, // 7: explore
	];

	const LERP_FACTOR = 0.08;

	let { progress }: { progress: number } = $props();

	const { scene, renderer } = useThrelte();

	renderer.shadowMap.enabled = false;

	let camera = $state<PerspectiveCamera>();

	const desiredPos = new Vector3();
	const desiredTarget = new Vector3();

	const currentPos = new Vector3(0, 1.5, 12);
	const currentTarget = new Vector3();

	function resolve(p: number) {
		const clamped = Math.max(0, Math.min(1, p));
		const scaled = clamped * (HOTSPOTS.length - 1);

		const current = HOTSPOTS[Math.floor(scaled)];

		return {
			target: new Vector3(...current.target),
			radius: current.radius,
			elevation: current.elevation,
			azimuth: current.azimuth,
		};
	}

	useTask(() => {
		if (!camera) return;

		const { target, radius, elevation, azimuth } = resolve(progress);
		const cosEl = Math.cos(elevation);

		// Spherical to cartesian; rotation comes from azimuth interpolation
		desiredPos.set(
			target.x + radius * cosEl * Math.sin(azimuth),
			target.y + radius * Math.sin(elevation),
			target.z + radius * cosEl * Math.cos(azimuth),
		);

		desiredTarget.copy(target);

		currentPos.lerp(desiredPos, LERP_FACTOR);
		currentTarget.lerp(desiredTarget, LERP_FACTOR);

		camera.position.copy(currentPos);
		camera.lookAt(currentTarget);
	});
</script>

<T.PerspectiveCamera args={[60, 1, 0.1, 1000]} makeDefault bind:ref={camera} />

<T.Group>
	<T.SpotLight
		args={[0xffffff, 150, 60, 0.4, 0.5, 2]}
		position={[5, 15, 8]}
		oncreate={(ref) => {
			ref.target.position.set(0, 0, 0);
			scene.add(ref.target);
			ref.target.updateMatrixWorld();

			return () => scene.remove(ref.target);
		}}
	/>

	<T.AmbientLight intensity={0.5} />
	<T.HemisphereLight args={[0xfff5e0, 0xe8e0d0, 0.4]} />
</T.Group>

<Rifle />
