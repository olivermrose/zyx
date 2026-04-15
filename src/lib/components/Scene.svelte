<script lang="ts">
	import type { Mesh, MeshStandardMaterial, PerspectiveCamera } from "three";
	import { T, useTask, useThrelte } from "@threlte/core";
	import { Color, Fog, PCFShadowMap, Vector3 } from "three";
	import Hands from "./Hands.svelte";
	import Interact from "./Interact.svelte";

	interface Hotspot {
		target: [number, number, number];
		radius: number;
		elevation: number;
		azimuth: number;
	}

	const HOTSPOTS: Hotspot[] = [
		{ target: [1, 1.8, 0], radius: 8.0, elevation: 0.12, azimuth: 0 },
		{ target: [-0.49, 2.15, 0], radius: 2.8, elevation: 0.2, azimuth: 0.9 },
		{ target: [-0.67, 1.82, 0], radius: 1.5, elevation: 0.25, azimuth: -0.7 },
		{ target: [-0.62, 1.22, 0], radius: 2.8, elevation: 0.18, azimuth: 0.6 },
		{ target: [-0.84, 1.09, 0], radius: 3, elevation: -0.2, azimuth: 0.8 },
		{ target: [-4.4, 1.25, 0], radius: 1.9, elevation: 0.22, azimuth: -0.4 },
		{ target: [4.67, 1.3, 0], radius: 3, elevation: 0.24, azimuth: 0.4 },
		{ target: [1, 1.8, 0], radius: 8.0, elevation: 0.12, azimuth: 0 },
	];

	const LERP_FACTOR = 0.08;
	const INTERACTIVE_POS = new Vector3(0, 2.5, 10);
	const INTERACTIVE_TARGET = new Vector3(1, 1.8, 0);
	const FOG_NEAR_INTERACTIVE = 20;
	const FOG_FAR_INTERACTIVE = 50;
	const FOG_NEAR_INFO = 200;
	const FOG_FAR_INFO = 500;
	const BG_COLOR = new Color(0xf8f7f4);

	interface Props {
		dissolveProgress: number;
		infoProgress: number;
	}

	const { dissolveProgress, infoProgress }: Props = $props();

	const { scene, renderer } = useThrelte();

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = PCFShadowMap;
	scene.background = BG_COLOR;
	scene.fog = new Fog(BG_COLOR, FOG_NEAR_INTERACTIVE, FOG_FAR_INTERACTIVE);

	let camera = $state<PerspectiveCamera>();
	let floor = $state<Mesh>();
	let wall = $state<Mesh>();

	// Info camera state
	const infoCurrentPos = INTERACTIVE_POS.clone();
	const infoCurrentTarget = INTERACTIVE_TARGET.clone();
	const infoDesiredPos = new Vector3();
	const infoDesiredTarget = new Vector3();

	// Blended camera output
	const blendedPos = new Vector3();
	const blendedTarget = new Vector3();

	function resolveHotspot(p: number) {
		const clamped = Math.max(0, Math.min(1, p));
		const scaled = clamped * (HOTSPOTS.length - 1);
		const hs = HOTSPOTS[Math.floor(scaled)];
		return {
			target: new Vector3(...hs.target),
			radius: hs.radius,
			elevation: hs.elevation,
			azimuth: hs.azimuth,
		};
	}

	useTask(() => {
		if (!camera) return;

		const { target, radius, elevation, azimuth } = resolveHotspot(infoProgress);
		const cosEl = Math.cos(elevation);

		infoDesiredPos.set(
			target.x + radius * cosEl * Math.sin(azimuth),
			target.y + radius * Math.sin(elevation),
			target.z + radius * cosEl * Math.cos(azimuth),
		);
		infoDesiredTarget.copy(target);

		infoCurrentPos.lerp(infoDesiredPos, LERP_FACTOR);
		infoCurrentTarget.lerp(infoDesiredTarget, LERP_FACTOR);

		blendedPos.lerpVectors(INTERACTIVE_POS, infoCurrentPos, dissolveProgress);
		blendedTarget.lerpVectors(INTERACTIVE_TARGET, infoCurrentTarget, dissolveProgress);

		camera.position.copy(blendedPos);
		camera.lookAt(blendedTarget);

		const envOpacity = 1 - dissolveProgress;

		if (floor) {
			const mat = floor.material as MeshStandardMaterial;
			mat.opacity = envOpacity;
			floor.visible = envOpacity > 0.01;
		}

		if (wall) {
			const mat = wall.material as MeshStandardMaterial;
			mat.opacity = envOpacity;
			wall.visible = envOpacity > 0.01;
		}

		// Fade fog out
		if (scene.fog instanceof Fog) {
			scene.fog.near =
				FOG_NEAR_INTERACTIVE + (FOG_NEAR_INFO - FOG_NEAR_INTERACTIVE) * dissolveProgress;
			scene.fog.far =
				FOG_FAR_INTERACTIVE + (FOG_FAR_INFO - FOG_FAR_INTERACTIVE) * dissolveProgress;
		}
	});
</script>

<T.PerspectiveCamera args={[60, 1, 0.1, 1000]} makeDefault bind:ref={camera} />

<T.Group name="Lighting">
	<T.SpotLight
		args={[0xffffff, 180, 50, 0.5, 0.7, 2]}
		position={[0, 15, 5]}
		castShadow
		shadow.mapSize={[1024, 1024]}
		shadow.camera.near={5}
		shadow.camera.far={35}
		shadow.bias={-0.0001}
		oncreate={(ref) => {
			scene.add(ref.target);
			return () => scene.remove(ref.target);
		}}
	/>

	<T.AmbientLight intensity={0.35} />
	<T.HemisphereLight args={[0xfff5e0, 0xe8e0d0, 0.4]} />
</T.Group>

<T.Mesh name="Floor" position.y={-3} rotation.x={-Math.PI / 2} receiveShadow bind:ref={floor}>
	<T.PlaneGeometry args={[80, 80]} />
	<T.MeshStandardMaterial color={0xf8f7f4} metalness={0.02} roughness={0.35} transparent />
</T.Mesh>

<T.Mesh name="Wall" position={[0, 10, -8]} receiveShadow bind:ref={wall}>
	<T.PlaneGeometry args={[80, 80]} />
	<T.MeshStandardMaterial color={0xf8f7f4} roughness={0.95} transparent />
</T.Mesh>

<Interact attractEnabled={dissolveProgress < 0.01} />
<Hands />
