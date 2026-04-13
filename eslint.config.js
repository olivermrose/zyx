import antfu from "@antfu/eslint-config";
import prettier from "eslint-config-prettier";

export default antfu({
	svelte: true,
	stylistic: false,
}).append(prettier);
