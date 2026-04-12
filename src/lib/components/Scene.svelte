<script lang="ts">
	import { T, useThrelte } from "@threlte/core";
	import { OrbitControls } from "@threlte/extras";
	import { Color, Fog, PCFShadowMap } from "three";
	import Hands from "./Hands.svelte";
	import Interact from "./Interact.svelte";

	const { scene, renderer } = useThrelte();

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = PCFShadowMap;

	scene.background = new Color(0xf5f5f5);
	scene.fog = new Fog(0xf5f5f5, 20, 50);
</script>

<T.PerspectiveCamera args={[60, 1, 0.1, 1000]} position={[0, 0, 12]} makeDefault>
	<OrbitControls />
</T.PerspectiveCamera>

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
	<T.HemisphereLight args={[0xffffff, 0xddddda, 0.2]} />
</T.Group>

<T.Mesh
	name="Floor"
	position.y={-3}
	rotation.x={-Math.PI / 2}
	receiveShadow
	userData={{ selectable: false }}
>
	<T.PlaneGeometry args={[80, 80]} />
	<T.MeshStandardMaterial color={0xeaeaea} metalness={0.02} roughness={0.35} />
</T.Mesh>

<T.Mesh name="Wall" position={[0, 10, -8]} receiveShadow userData={{ selectable: false }}>
	<T.PlaneGeometry args={[80, 80]} />
	<T.MeshStandardMaterial color={0xf0f0f0} roughness={0.95} />
</T.Mesh>

<Interact />
<Hands />
