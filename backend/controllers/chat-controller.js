const { scenarios } = require("./scenario-controller");
const { convertTextToSpeech, convertToGeminiMessages, generateTextResponse} = require("../utilites/gemini");
const { handleTranscription } = require("../utilites/audioTranscriber");

// Generates a response and audio from the ai based on the previous messages and scenario
const generateTurn = async (req, res) => {
	try {
		const { scenarioId, messages } = req.body;

		// find scenario by id
		const scenario = scenarios.find((s) => s.id === parseInt(scenarioId));

		if (!scenario) {
			throw new Error("Scenario not found");
		}

		// Build prompt
		const prompt = convertToGeminiMessages(messages, scenario.systemPrompt);

		const {responseText, endScenario} = await generateTextResponse(prompt);

		// Convert text to speech
		const audioUrl = await convertTextToSpeech(responseText);

		res.status(200).json({
			responseText,
			audioUrl,
			endScenario,
		});
	} catch (error) {
		console.error("Error generating turn:", error);
		res.status(500).json({ error: "Failed to generate turn" });
	}
};

// Converts users speech to text - returns text
const transcribeAudio = async (req, res) => {
	try {
		const text = await handleTranscription(req);
		res.status(200).json({ text });
	} catch (error) {
		console.error("Error transcribing audio:", error);
		res.status(500).json({ error: "Failed to transcribe audio" });
	}
}


module.exports = {
	generateTurn,
	transcribeAudio
};
