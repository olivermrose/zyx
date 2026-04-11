import type { Hand } from "./hand-tracker";

export const hands = $state({ current: [] as Hand[] });
