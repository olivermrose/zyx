// https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker/index#models
export const LANDMARKS = [
	// Thumb
	[0, 1],
	[1, 2],
	[2, 3],
	[3, 4],

	// Index
	[0, 5],
	[5, 6],
	[6, 7],
	[7, 8],

	// Middle
	[0, 9],
	[9, 10],
	[10, 11],
	[11, 12],

	// Ring
	[0, 13],
	[13, 14],
	[14, 15],
	[15, 16],

	// Pinky
	[0, 17],
	[17, 18],
	[18, 19],
	[19, 20],
];

export const ANNOTATIONS = [
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
