<script lang="ts">
	import { T } from "@threlte/core";
	import { useGltf, useDraco } from "@threlte/extras";
	import type { Group, Mesh, MeshStandardMaterial } from "three";
	import rifleUrl from "../assets/rifle.glb?url";

	type RifleNodes =
		| "Rifle_Body"
		| "Rifle_Bayonet"
		| "Rifle_Bolt"
		| "Rifle_Bullet"
		| "Rifle_Magazine"
		| "Rifle_Sight";

	type RifleMaterials = "Body" | "Bayonet" | "Bolt" | "Bullet" | "Magazine" | "Sight";

	interface RifleGltf {
		nodes: Record<RifleNodes, Mesh>;
		materials: Record<RifleMaterials, MeshStandardMaterial>;
	}

	interface Props {
		ref?: Group;
	}

	let { ref = $bindable() }: Props = $props();

	const dracoLoader = useDraco();
	const gltf = useGltf<RifleGltf>(rifleUrl, { dracoLoader });
</script>

{#if $gltf}
	<T.Group name="Rifle" scale={8} bind:ref>
		<T.Mesh
			name="Body"
			castShadow
			receiveShadow
			geometry={$gltf.nodes.Rifle_Body.geometry}
			material={$gltf.materials.Body}
			rotation={[-Math.PI / 2, 0, 0]}
			scale={0.01}
		/>

		<T.Mesh
			name="Bayonet"
			castShadow
			receiveShadow
			geometry={$gltf.nodes.Rifle_Bayonet.geometry}
			material={$gltf.materials.Bayonet}
			rotation={[-Math.PI / 2, 0, 0]}
			scale={0.01}
		/>

		<T.Mesh
			name="Bolt"
			castShadow
			receiveShadow
			geometry={$gltf.nodes.Rifle_Bolt.geometry}
			material={$gltf.materials.Bolt}
			rotation={[-Math.PI / 2, 0, 0]}
			scale={0.01}
		/>

		<T.Mesh
			name="Bullet"
			castShadow
			receiveShadow
			geometry={$gltf.nodes.Rifle_Bullet.geometry}
			material={$gltf.materials.Bullet}
			rotation={[-Math.PI / 2, 0, 0]}
			scale={0.01}
		/>

		<T.Mesh
			name="Magazine"
			castShadow
			receiveShadow
			geometry={$gltf.nodes.Rifle_Magazine.geometry}
			material={$gltf.materials.Magazine}
			rotation={[-Math.PI / 2, 0, 0]}
			scale={0.01}
		/>

		<T.Mesh
			name="Sight"
			castShadow
			receiveShadow
			geometry={$gltf.nodes.Rifle_Sight.geometry}
			material={$gltf.materials.Sight}
			rotation={[-Math.PI / 2, 0, 0]}
			scale={0.01}
		/>
	</T.Group>
{/if}
