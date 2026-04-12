import type { Hand } from "./hand.svelte";

export const hands = $state({ current: [] as Hand[] });

export const grabbedPart = $state({ current: "" });
