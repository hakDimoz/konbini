express = require('express');
scenariosController = require('../controllers/scenario-controller.js');
const router = express.Router();

router.get("/", scenariosController.getAllScenarios);
router.get("/:id", scenariosController.getScenarioById); 

module.exports = router;