export interface Annotation {
	id: string;
	part: string;
	desc: string;
}

export const ANNOTATIONS: Annotation[] = [
	{
		id: "01",
		part: "Sight",
		desc: "Fixed aperture rear sight graduated to 1,000 metres. Machined from hardened tool steel and zeroed at the Chelyabinsk proving grounds during final assembly inspection.",
	},
	{
		id: "02",
		part: "Bolt",
		desc: "Two-lug rotating bolt with a 90° throw. Strips, chambers, and extracts in a single cycling motion — field-tested to function reliably at temperatures below -40°C.",
	},
	{
		id: "03",
		part: "Body",
		desc: "Milled from a single billet of chromoly steel. Houses the trigger group, safety, and firing pin assembly. Each receiver was proof-fired twice before leaving the plant.",
	},
	{
		id: "04",
		part: "Magazine",
		desc: "Detachable 10-round box magazine with a spring-loaded follower. Feeds cartridges at a consistent 8° angle to prevent double-feeds under rapid cycling.",
	},
	{
		id: "05",
		part: "Bullet",
		desc: "Chambered in 7.62×54mmR. The rimmed bottleneck cartridge entered service in 1891 and remained unchanged for over half a century — a testament to its design integrity.",
	},
	{
		id: "06",
		part: "Bayonet",
		desc: "Cruciform spike bayonet, 430mm in length. Mounts to the front band via a locking collar. The hardened blade doubles as a field tool and retains its edge through sustained use.",
	},
];
