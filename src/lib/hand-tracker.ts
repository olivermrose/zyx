import { FilesetResolver, HandLandmarker, type NormalizedLandmark } from "@mediapipe/tasks-vision";
import { hands } from "./state.svelte";

const WASM_CDN = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";
const MODEL_URL =
	"https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

export interface Hand {
	landmarks: NormalizedLandmark[];
	handedness: "Left" | "Right";
}

export class HandTracker {
	#landmarker?: HandLandmarker;
	#running = false;
	#lastVideoTime = 0;
	#rafId = NaN;

	public constructor(private readonly video: HTMLVideoElement) {}

	public async init() {
		const vision = await FilesetResolver.forVisionTasks(WASM_CDN);

		this.#landmarker = await HandLandmarker.createFromOptions(vision, {
			baseOptions: {
				modelAssetPath: MODEL_URL,
				delegate: "GPU",
			},
			runningMode: "VIDEO",
			numHands: 2,
		});

		this.#running = true;
		this.#tick();
	}

	public destroy() {
		this.#running = false;
		cancelAnimationFrame(this.#rafId);
		this.#landmarker?.close();
	}

	#tick() {
		if (!this.#running || !this.#landmarker) return;

		const now = performance.now();
		const isReady = this.video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;

		if (this.video.currentTime !== this.#lastVideoTime && isReady) {
			this.#lastVideoTime = this.video.currentTime;

			const result = this.#landmarker.detectForVideo(this.video, now);

			hands.current = result.landmarks.map((landmarks, i) => {
				const handedness = result.handedness[i][0].categoryName as "Left" | "Right";

				return {
					landmarks,
					handedness,
				};
			});
		}

		this.#rafId = requestAnimationFrame(this.#tick.bind(this));
	}
}
