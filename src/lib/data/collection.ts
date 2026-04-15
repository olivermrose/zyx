import type { Annotation } from "./annotations";
import { ANNOTATIONS } from "./annotations";

export interface RifleEntry {
	id: string;
	name: string;
	fullName: string;
	year: number;
	origin: string;
	manufacturer: string;
	description: string;
	modelPath: string;
	annotations: Annotation[];
}

export const COLLECTION: RifleEntry[] = [
	{
		id: "brown-bess",
		name: "Brown Bess",
		fullName: "Land Pattern Musket",
		year: 1722,
		origin: "Britain",
		manufacturer: "Board of Ordnance",
		description:
			"The standard British military longarm for over a century. Produced in enormous numbers across four pattern variants, it saw service from the War of the Spanish Succession through the Napoleonic era. Its smoothbore flintlock mechanism was the defining infantry technology of its age.",
		modelPath: "/rifle.glb",
		annotations: ANNOTATIONS,
	},
	{
		id: "martini-henry",
		name: "Martini-Henry",
		fullName: "Martini-Henry Mk I",
		year: 1871,
		origin: "Britain",
		manufacturer: "Royal Small Arms Factory",
		description:
			"A pivoting-block breech-loader chambered in .577/450, combining Friedrich von Martini's falling-block action with Alexander Henry's polygonal rifling. It remained the primary British service rifle until 1888 and earned a fearsome reputation throughout the colonial campaigns.",
		modelPath: "/rifle.glb",
		annotations: ANNOTATIONS,
	},
	{
		id: "mosin-nagant",
		name: "Mosin-Nagant",
		fullName: "Vintovka Mosina obr. 1891",
		year: 1891,
		origin: "Russia",
		manufacturer: "Tula Arms Plant",
		description:
			"Designed jointly by Sergei Mosin and Léon Nagant, the Model 1891 bolt-action became the standard rifle of Imperial and Soviet Russia. Produced in greater numbers than any other bolt-action rifle in history, it served through both World Wars and numerous conflicts beyond.",
		modelPath: "/rifle.glb",
		annotations: ANNOTATIONS,
	},
	{
		id: "gewehr-98",
		name: "Gewehr 98",
		fullName: "Infanteriegewehr 98",
		year: 1898,
		origin: "Germany",
		manufacturer: "Mauser-Werke",
		description:
			"Paul Mauser's definitive controlled-feed bolt-action, chambered in 7.92×57mm. Its three-lug action and internal staggered magazine set the benchmark for military bolt-action design worldwide. Derivatives of the G98 pattern remain in production to this day.",
		modelPath: "/rifle.glb",
		annotations: ANNOTATIONS,
	},
	{
		id: "vk-43",
		name: "VK-43",
		fullName: "Vostok Karabin, Model 1943",
		year: 1943,
		origin: "Soviet Union",
		manufacturer: "Vostok Arms Factory, Chelyabinsk",
		description:
			"Developed at the Tula Arms Plant between 1941 and 1943, the VK-43 was a last-generation bolt-action rifle produced alongside emerging semi-automatic designs. Fewer than 8,000 examples were manufactured before the programme was superseded. Today, no more than twelve verified specimens are known to survive.",
		modelPath: "/rifle.glb",
		annotations: ANNOTATIONS,
	},
	{
		id: "akm",
		name: "AKM",
		fullName: "Avtomat Kalashnikova Modernizirovanny",
		year: 1959,
		origin: "Soviet Union",
		manufacturer: "Izhmash",
		description:
			"The modernised and lightened successor to the AK-47, the AKM introduced a stamped steel receiver, a slanted muzzle compensator, and revised manufacturing tolerances that made it faster and cheaper to produce at scale. It became the most widely distributed assault rifle in history.",
		modelPath: "/rifle.glb",
		annotations: ANNOTATIONS,
	},
];
