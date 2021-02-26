const { Router } = require("express");
const router = Router();
const verifyToken = require("../middleware/auth");
const {
  createUser,
  authUser,
  createCity,
  createHeadquarter,
  getUsers,
} = require("../controllers/gymApp");

/******************** ROUTES ********************/

/* Route to create users */
router.post("/create-user", createUser);

/* Route to authenticate users */
router.post("/login", authUser);

/* Route to add cities */
router.post("/create-city", verifyToken, createCity);

/* Route to add headquarters */
router.post("/create-headquarter/:id", verifyToken, createHeadquarter);

/* Route to add headquarters */
router.get("/get-users/:city/:headquarter", verifyToken, getUsers);

module.exports = router;
