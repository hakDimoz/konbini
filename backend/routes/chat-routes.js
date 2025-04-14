express = require("express");
const chatController = require("../controllers/chat-controller.js");
const router = express.Router();

router.post("/turn", chatController.generateTurn);

module.exports = router;