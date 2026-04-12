import type { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { Matrix4, Quaternion, Vector3 } from "three";
import { translateLandmark } from "./util";

const forward = new Vector3();
const right = new Vector3();
const up = new Vector3();

const mat4 = new Matrix4();

export class Hand {
	public static readonly quaternion = new Quaternion();

	public landmarks = $state<NormalizedLandmark[]>([]);
	public handedness = $state<"Left" | "Right">("Right");

	public constructor(landmarks: NormalizedLandmark[], handedness: "Left" | "Right") {
		this.landmarks = landmarks;
		this.handedness = handedness;
	}

	public getPinchDistance() {
		const thumbTip = this.landmarks[4];
		const indexTip = this.landmarks[8];

		const dx = thumbTip.x - indexTip.x;
		const dy = thumbTip.y - indexTip.y;
		const dz = thumbTip.z - indexTip.z;

		return Math.sqrt(dx * dx + dy * dy + dz * dz);
	}

	public getPinchPosition() {
		const thumbTip = this.landmarks[4];
		const indexTip = this.landmarks[8];

		return translateLandmark({
			x: (thumbTip.x + indexTip.x) / 2,
			y: (thumbTip.y + indexTip.y) / 2,
			z: (thumbTip.z + indexTip.z) / 2,
			visibility: 1,
		});
	}

	public updateQuaternion() {
		const wrist = this.landmarks[0];
		const indexMCP = this.landmarks[5];
		const middleMCP = this.landmarks[9];
		const pinkyMCP = this.landmarks[17];

		forward
			.set(-(middleMCP.x - wrist.x), -(middleMCP.y - wrist.y), -(middleMCP.z - wrist.z))
			.normalize();

		right
			.set(-(pinkyMCP.x - indexMCP.x), -(pinkyMCP.y - indexMCP.y), -(pinkyMCP.z - indexMCP.z))
			.normalize();

		up.crossVectors(forward, right).normalize();
		right.crossVectors(up, forward).normalize();

		mat4.makeBasis(right, up, forward);

		return Hand.quaternion.setFromRotationMatrix(mat4);
	}
}
