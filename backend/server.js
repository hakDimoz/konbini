const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
const scenarioRoutes = require("./routes/scenarios-routes.js");
const chatRoutes = require("./routes/chat-routes.js");

app.use("/api/scenarios", scenarioRoutes);
app.use("/api/chat", chatRoutes);

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
