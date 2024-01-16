const express = require("express");

const exploreController = require("../controller/explore");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

router.get("/getUsersPosts", isAuth, exploreController.getUsersPosts);

router.get("/getAllUsers", isAuth, exploreController.getAllUsers);

module.exports = router;
