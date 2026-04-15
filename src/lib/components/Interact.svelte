<script lang="ts">
	import type { Group, MeshStandardMaterial } from "three";
	import { Hand } from "$lib/hand.svelte";
	import { grabbedPart, hands, interactionPhase } from "$lib/state.svelte";
	import { useTask } from "@threlte/core";
	import { mix } from "motion-sv";
	import { Box3, Color, Matrix4, Mesh, Quaternion, Vector3 } from "three";
	import Rifle from "./Rifle.svelte";

	interface RiflePart {
		mesh: Mesh;
		center: Vector3;
		matrix: Matrix4;
		targetOpacity: number;
	}

	interface Props {
		attractEnabled?: boolean;
	}

	const { attractEnabled = true }: Props = $props();

	const PINCH_GRAB_THRESHOLD = 0.05;
	const PINCH_RELEASE_THRESHOLD = 0.1;
	const HOVER_RADIUS = 1.0;
	const GRAB_RADIUS = 1.5;
	const GRAB_LIFT = 0.4;
	const MOVE_LERP = 0.45;
	const OPACITY_LERP = 0.2;
	const SMOOTH_FACTOR = 0.4;
	const HAND_LOST_GRACE_FRAMES = 15;
	const ATTRACT_ROT_SPEED = 0.3;
	const ATTRACT_BOB_SPEED = 0.7;
	const ATTRACT_BOB_AMP = 0.12;
	const ATTRACT_BLEND_SPEED = 2.0;

	const HIGHLIGHT_COLOR = new Color(0x00e5ff);
	const BLACK = new Color(0x000000);

	let rifle = $state<Group>();

	const parts: RiflePart[] = [];
	let grabbed: RiflePart | null = null;
	let hovered: RiflePart | null = null;

	const grabOffset = new Vector3();
	const grabStartHandQ = new Quaternion();
	const grabStartLocalQ = new Quaternion();

	let smoothedPinchDist = 1.0;
	let smoothedPinchPos: Vector3 | null = null;

	let wasPinching = false;
	let handLostFrames = 0;
	let time = 0;
	let attractBlend = 0;

	// For reuse without allocations
	const box = new Box3();
	const deltaQ = new Quaternion();
	const startQ = new Quaternion();
	const pinchTarget = new Vector3();

	$effect(() => {
		if (rifle) {
			rifle.updateMatrixWorld(true);
			registerParts(rifle);
		}
	});

	function registerParts(root: Group) {
		root.traverse((node) => {
			if (!(node instanceof Mesh)) return;

			box.setFromObject(node);
			const center = box.getCenter(new Vector3());

			const mat = node.material as MeshStandardMaterial;
			mat.transparent = true;

			parts.push({
				mesh: node,
				center,
				matrix: node.matrix.clone(),
				targetOpacity: 1,
			});
		});
	}

	function getPinchInfo(hand: Hand) {
		const dist = hand.getPinchDistance();
		const pos = hand.getPinchPosition();

		smoothedPinchDist += (dist - smoothedPinchDist) * SMOOTH_FACTOR;

		if (!smoothedPinchPos) {
			smoothedPinchPos = pos;
		} else {
			smoothedPinchPos.lerp(pos, SMOOTH_FACTOR);
		}

		return { dist: smoothedPinchDist, pos: smoothedPinchPos };
	}

	function highlight(part: RiflePart, color: Color, intensity: number) {
		const mat = part.mesh.material as MeshStandardMaterial;

		if (mat.emissive) {
			mat.emissive.copy(color);
			mat.emissiveIntensity = intensity;
		}
	}

	function clearHighlight(part: RiflePart) {
		highlight(part, BLACK, 1);
	}

	function updatePartCenter(part: RiflePart) {
		box.setFromObject(part.mesh);
		box.getCenter(part.center);
	}

	function findNearest(pos: Vector3, radius: number) {
		let best: RiflePart | null = null;
		let bestDist = radius;

		for (const part of parts) {
			if (part === grabbed) continue;

			const dx = part.center.x - pos.x;
			const dy = part.center.y - pos.y;
			const d = Math.sqrt(dx * dx + dy * dy);

			if (d < bestDist) {
				bestDist = d;
				best = part;
			}
		}

		return best;
	}

	function release() {
		if (!grabbed) return;

		clearHighlight(grabbed);

		rifle?.add(grabbed.mesh);
		grabbed.matrix.decompose(
			grabbed.mesh.position,
			grabbed.mesh.quaternion,
			grabbed.mesh.scale,
		);

		for (const part of parts) {
			part.targetOpacity = 1;
		}

		updatePartCenter(grabbed);
		grabbed = null;
		grabbedPart.current = "";
	}

	useTask((delta) => {
		time += delta;

		const isAttracting = hands.current.length === 0 && !grabbed && attractEnabled;
		attractBlend +=
			((isAttracting ? 1 : 0) - attractBlend) * Math.min(1, ATTRACT_BLEND_SPEED * delta);

		interactionPhase.current = grabbed
			? "commit"
			: hands.current.length > 0
				? "engage"
				: "attract";

		if (rifle) {
			rifle.rotation.y = Math.sin(time * ATTRACT_ROT_SPEED) * 0.5 * attractBlend;
			rifle.position.y = Math.sin(time * ATTRACT_BOB_SPEED) * ATTRACT_BOB_AMP * attractBlend;
		}

		if (!rifle) return;

		if (hands.current.length === 0) {
			handLostFrames++;

			if (handLostFrames > HAND_LOST_GRACE_FRAMES) {
				if (hovered) {
					clearHighlight(hovered);
					hovered = null;
				}

				if (grabbed) {
					release();
				}

				wasPinching = false;
				smoothedPinchPos = null;
				smoothedPinchDist = 1.0;
			}

			return;
		}

		handLostFrames = 0;

		// Primary for movement, secondary for scaling
		const [primary, secondary] = hands.current;
		const pinch = getPinchInfo(primary);

		const threshold = grabbed ? PINCH_RELEASE_THRESHOLD : PINCH_GRAB_THRESHOLD;
		const nowPinching = pinch.dist < threshold;

		if (!grabbed) {
			const near = findNearest(pinch.pos, HOVER_RADIUS);

			if (near !== hovered) {
				if (hovered) clearHighlight(hovered);
				hovered = near;

				if (hovered) {
					highlight(hovered, HIGHLIGHT_COLOR, 0.3);
				}
			}
		}

		if (nowPinching && !wasPinching) {
			const near = hovered ?? findNearest(pinch.pos, GRAB_RADIUS);

			if (near) {
				if (hovered && hovered !== near) {
					clearHighlight(hovered);
				}

				grabbed = near;
				hovered = null;
				grabbedPart.current = near.mesh.name;

				clearHighlight(grabbed);
				rifle.attach(near.mesh);

				near.mesh.getWorldPosition(grabOffset);
				grabOffset.sub(pinch.pos);
				grabOffset.y += GRAB_LIFT;

				grabStartHandQ.copy(primary.updateQuaternion());
				grabStartLocalQ.copy(near.mesh.quaternion);

				for (const part of parts) {
					if (part !== near) {
						part.targetOpacity = 0;
					}
				}
			}
		}

		if (!nowPinching && wasPinching && grabbed) {
			release();
		}

		if (grabbed && nowPinching) {
			pinchTarget.copy(pinch.pos).add(grabOffset);
			rifle.worldToLocal(pinchTarget);
			grabbed.mesh.position.lerp(pinchTarget, MOVE_LERP);

			startQ.copy(grabStartHandQ).invert();
			deltaQ.copy(primary.updateQuaternion()).multiply(startQ).multiply(grabStartLocalQ);

			grabbed.mesh.quaternion.slerp(deltaQ, MOVE_LERP);

			if (secondary) {
				const scaleDist = secondary.getPinchDistance();
				const s = mix(0.01, 0.04)(scaleDist + 0.05);

				grabbed.mesh.scale.lerp(new Vector3(s, s, s), MOVE_LERP);
			}

			updatePartCenter(grabbed);
		}

		for (const part of parts) {
			const mat = part.mesh.material as MeshStandardMaterial;
			const currentOpacity = mat.opacity ?? 1;

			mat.opacity = currentOpacity + (part.targetOpacity - currentOpacity) * OPACITY_LERP;

			if (part.targetOpacity === 0 && mat.opacity < 0.05) {
				part.mesh.visible = false;
			} else if (part.targetOpacity === 1) {
				part.mesh.visible = true;
			}
		}

		wasPinching = nowPinching;
	});
</script>

<Rifle bind:ref={rifle} />
