const { v4: uuidv4 } = require("uuid");
const path = require("path");
GoogleGenAI = require("@google/genai").GoogleGenAI;
dotenv = require("dotenv").config();
const textToSpeech = require("@google-cloud/text-to-speech");
const { writeFile } = require("node:fs/promises");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

const googleClient = new textToSpeech.TextToSpeechClient({
	keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

// Returns {responseText, endScenario}
const generateTextResponse = async (prompt) => {
	try {
		const response = await ai.models.generateContent({
			model: "gemini-2.0-flash",
			contents: prompt,
		});


		return parseGeminiResponse(response.text);
	} catch (error) {
		throw new Error("Failed to generate text response: " + error.message);
	}
};

const convertTextToSpeech = async (text) => {
	try {
		const request = {
			input: { text: text },
			voice: {
				languageCode: "ja-JP",
				name: "ja-JP-Chirp3-HD-Aoede",
				ssmlGender: "FEMALE",
			},
			audioConfig: { audioEncoding: "MP3" },
		};

		const [response] = await googleClient.synthesizeSpeech(request);

		const outputFileName = `chat-${uuidv4()}.mp3`;
		const outputDir = path.join(__dirname, "..", "public", "audio");
		console.log(outputDir);
		const outputFilePath = path.join(outputDir, outputFileName);

		await writeFile(outputFilePath, response.audioContent, "binary");

		return `/audio/${outputFileName}`;
	} catch (error) {
		throw new Error("Failed to convert text to speech: " + error.message);
	}
};

const convertToGeminiMessages = (messages, scenarioSystemPrompt) => {
	const systemPart = {
		role: "user",
		parts: [{ text: `[System Prompt]\n${scenarioSystemPrompt}` }],
	};

	const mapped = messages.map((msg) => ({
		role: msg.role === "assistant" ? "model" : msg.role,
		parts: [{ text: msg.content }],
	}));

	return [systemPart, ...mapped];
};

const parseGeminiResponse = (rawText) => {
	const match = rawText.match(/{\s*"?(endScenario)"?\s*:\s*(true|false)\s*}/);

	let endScenario = false;
	if (match) {
		endScenario = match[2] === "true";
	}

	const responseText = match
		? rawText.replace(match[0], "").trim()
		: rawText.trim();

	return { responseText, endScenario };
};

module.exports = {
	generateTextResponse,
	convertToGeminiMessages,
    convertTextToSpeech
};
