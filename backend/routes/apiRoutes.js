const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const processBlackboard = require("../controllers/blackboardController");

const router = express.Router();

router.post("/blackboard", authenticate, processBlackboard);

module.exports = router;
