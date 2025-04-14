const scenarios = [
	{
		id: 1,
		title: "Buying a Melon Pan",
		description:
			"You walk into the konbini craving something sweet. You spot the freshly stocked bakery shelf and ask the clerk if they have any melon pan. The clerk lights up with a smile and not only shows you where it is, but even recommends their favourite one. The conversation is cheerful and relaxed — maybe they throw in a casual joke or ask if you’ve tried the limited seasonal flavour.",
		level: "easy",
		tags: ["food", "friendly", "basic purchase"],
		systemPrompt:
			"You are a friendly konbini store clerk. A customer comes in and asks about melon pan. Greet them warmly and guide them through the interaction, recommending your favourite melon pan. Keep the tone casual and friendly. Use natural Japanese with occasional small talk.",
		goals: [
			"Ask where the melon pan is",
			"React to the clerk’s suggestion",
			"Buy the melon pan and pay",
		],
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
}

module.exports = {
    getAllScenarios,
    getScenarioById,
}