import { COLLECTION } from "$lib/data/collection";
import { error } from "@sveltejs/kit";

export function load({ params }) {
	const model = COLLECTION.find((m) => m.id === params.model);
	if (!model) error(404);

	return { model };
}
