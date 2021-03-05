const { Router } = require("express");
const router = Router();
const verifyToken = require("../middleware/auth");
const {
  createUser,
  authUser,
  createCity,
  createHeadquarter,
  getUsers,
  getUsersHC
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

/* Route to get users by headquarter and city */
router.get("/get-users", verifyToken, getUsers);

/* Route to get users by headquarter and city */
router.get("/get-users/:city/:headquarter", verifyToken, getUsersHC);

module.exports = router;
