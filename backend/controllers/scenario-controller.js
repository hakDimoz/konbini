const scenarios = [
	{
		id: 1,
		title: "Buying a Melon Pan",
		description:
			"You walk into the konbini craving something sweet. You spot the freshly stocked bakery shelf and ask the clerk if they have any melon pan. The clerk lights up with a smile and not only shows you where it is, but even recommends their favourite one. The conversation is cheerful and relaxed — maybe they throw in a casual joke or ask if you’ve tried the limited seasonal flavour.",
		level: "easy",
		imageSrc: "images/melon-pan.png",
		systemPrompt:
			"You are a friendly konbini store clerk. The user is buying a melon pan. Speak only in Japanese. Keep replies short and natural. Make small talk. End the conversation with 'ありがとうございました' and always include a JSON that is true if the conversation is ended or false if not, like this: { endScenario: true }",
	},
];

const getAllScenarios = async (req, res) => {
	try {
		res.status(200).json(scenarios);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch scenarios" });
	}
};

const getScenarioById = async (req, res) => {
	try {
		const id = req.params.id;
		const scenario = scenarios.find((s) => s.id === parseInt(id));

		if (!scenario) {
			return res.status(404).json({ error: "Scenario not found" });
		}

		res.status(200).json(scenario);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch scenario" });
	}
};

module.exports = {
	getAllScenarios,
	getScenarioById,
	scenarios,
};
