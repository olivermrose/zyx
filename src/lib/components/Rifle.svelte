<script lang="ts">
	import type { Mesh, MeshStandardMaterial } from "three";
	import { T } from "@threlte/core";
	import { useGltf, useDraco } from "@threlte/extras";
	import rifleUrl from "../assets/rifle.glb?url";

	type RifleNodes =
		| "Rifle_Body"
		| "Rifle_Bayonet"
		| "Rifle_Bolt"
		| "Rifle_Bullet_1"
		| "Rifle_Bullet_2"
		| "Rifle_Magazine"
		| "Rifle_Sight_1"
		| "Rifle_Sight_2"
		| "Rifle_Sight_3"
		| "Rifle_Sight_4";

	type RifleMaterials =
		| "Body"
		| "Bayonet"
		| "Bolt"
		| "Bullet"
		| "Casing"
		| "Magazine"
		| "Sight"
		| "Reticle"
		| "Dials"
		| "Lenses";

	interface RifleGltf {
		nodes: Record<RifleNodes, Mesh>;
		materials: Record<RifleMaterials, MeshStandardMaterial>;
	}

	const gltf = useGltf<RifleGltf>(rifleUrl, { dracoLoader: useDraco() });
</script>

<T.Group name="Rifle" scale={0.08}>
	{#if $gltf}
		<T.Mesh
			name="Body"
			castShadow
			receiveShadow
			geometry={$gltf.nodes.Rifle_Body.geometry}
			material={$gltf.materials.Body}
			rotation={[-Math.PI / 2, 0, 0]}
		/>

		<T.Mesh
			name="Bayonet"
			castShadow
			receiveShadow
			geometry={$gltf.nodes.Rifle_Bayonet.geometry}
			material={$gltf.materials.Bayonet}
			rotation={[-Math.PI / 2, 0, 0]}
		/>

		<T.Mesh
			name="Bolt"
			castShadow
			receiveShadow
			geometry={$gltf.nodes.Rifle_Bolt.geometry}
			material={$gltf.materials.Bolt}
			rotation={[-Math.PI / 2, 0, 0]}
		/>

		<T.Group name="Bullet" rotation={[-Math.PI / 2, 0, 0]}>
			<T.Mesh
				castShadow
				receiveShadow
				geometry={$gltf.nodes.Rifle_Bullet_1.geometry}
				material={$gltf.materials.Bullet}
			/>

			<T.Mesh
				castShadow
				receiveShadow
				geometry={$gltf.nodes.Rifle_Bullet_2.geometry}
				material={$gltf.materials.Casing}
			/>
		</T.Group>

		<T.Mesh
			name="Magazine"
			castShadow
			receiveShadow
			geometry={$gltf.nodes.Rifle_Magazine.geometry}
			material={$gltf.materials.Magazine}
			rotation={[-Math.PI / 2, 0, 0]}
		/>

		<T.Group name="Sight" rotation={[-Math.PI / 2, 0, 0]}>
			<T.Mesh
				castShadow
				receiveShadow
				geometry={$gltf.nodes.Rifle_Sight_1.geometry}
				material={$gltf.materials.Sight}
			/>

			<T.Mesh
				castShadow
				receiveShadow
				geometry={$gltf.nodes.Rifle_Sight_2.geometry}
				material={$gltf.materials.Reticle}
			/>

			<T.Mesh
				castShadow
				receiveShadow
				geometry={$gltf.nodes.Rifle_Sight_3.geometry}
				material={$gltf.materials.Dials}
			/>

			<T.Mesh
				castShadow
				receiveShadow
				geometry={$gltf.nodes.Rifle_Sight_4.geometry}
				material={$gltf.materials.Lenses}
			/>
		</T.Group>
	{/if}
</T.Group>
