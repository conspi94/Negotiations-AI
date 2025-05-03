const express = require("express");
const router = express.Router();
const { generateNegotiation } = require("../controllers/aiController");

router.post("/negotiate", generateNegotiation);

module.exports = router;