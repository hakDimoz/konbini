dotenv = require("dotenv").config();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
AssemblyAI = require("assemblyai").AssemblyAI;

const assemblyClient = new AssemblyAI({
	apiKey: process.env.ASSEMBLY_AI_KEY,
});

const transcribeAudio = async (audioFilePath) => {
	const params = {
		audio: audioFilePath,
		speech_model: "nano",
		language_code: "ja",
	};
	console.log("Transcribing audio file:", audioFilePath);
	const transcript = await assemblyClient.transcripts.transcribe(params);

	if (transcript.status === "error") {
		console.error(`Transcription failed: ${transcript.error}`);
		process.exit(1);
	}

	console.log(transcript.text);
	return transcript.text;
};

// Upload audio files to a specific directory
const storage = multer.diskStorage({
	destination: "./uploads/",
	filename: (req, file, cb) => {
		const uniqueName = Date.now() + "-" + file.originalname;
		cb(null, uniqueName);
	},
});
const upload = multer({ storage });

const uploadAudio = upload.single("audio");

// Utility that combines upload + transcription logic
const handleTranscription = async (req) => {
	const filePath = req.file?.path;
	if (!filePath) throw new Error("Audio file missing.");

	const text = await transcribeAudio(filePath);

	fs.unlink(filePath, (err) => {
		if (err) console.error("Failed to delete uploaded audio:", err);
	});

	return text;
};

module.exports = {
	uploadAudio,
	handleTranscription,
};
