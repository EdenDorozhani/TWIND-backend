const express = require("express");

const exploreController = require("../controller/explore");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

router.get("/getAllPosts", exploreController.getAllPosts);

router.get("/getAllUsers", exploreController.getAllUsers);

module.exports = router;
