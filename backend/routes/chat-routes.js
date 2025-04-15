express = require("express");
const chatController = require("../controllers/chat-controller.js");
const { uploadAudio } = require("../utilites/audioTranscriber.js");
const router = express.Router();

router.post("/turn", chatController.generateTurn);
router.post("/transcribe", uploadAudio, chatController.transcribeAudio);

module.exports = router;