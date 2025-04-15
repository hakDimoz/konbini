const { scenarios } = require("./scenario-controller");
dotenv = require("dotenv").config();
const { convertTextToSpeech, convertToGeminiMessages, generateTextResponse} = require("../utilites/gemini");

// AssemblyAI set up
AssemblyAI = require("assemblyai").AssemblyAI;

const assemblyClient = new AssemblyAI({
	apiKey: process.env.ASSEMBLY_AI_KEY,
});
// Or use a publicly-accessible URL:
const audioFile = "https://assembly.ai/wildfires.mp3";

const params = {
	audio: audioFile,
};

const run = async () => {
	const transcript = await assemblyClient.transcripts.transcribe(params);

	if (transcript.status === "error") {
		console.error(`Transcription failed: ${transcript.error}`);
		process.exit(1);
	}

	console.log(transcript.text);
};

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



const convertSpeechToText = async (audioFilePath) => {};



module.exports = {
	generateTurn,
};
