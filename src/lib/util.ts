import type { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { Vector3 } from "three";

export function translateLandmark(lm: NormalizedLandmark) {
	return new Vector3(-(lm.x - 0.5) * 18, -(lm.y - 0.5) * 10, lm.z * -6 + 2);
}
