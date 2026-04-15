import type { Hand } from "./hand.svelte";

export const hands = $state({ current: [] as Hand[] });

export const grabbedPart = $state({ current: "" });

export const interactionPhase = $state({ current: "attract" as "attract" | "engage" | "commit" });

export const menuOpen = $state({ current: false });
