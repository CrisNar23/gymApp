const dbConnection = require("../../config/dbConfig");
const jwt = require("jsonwebtoken");

/******************** CONTROLLERS ********************/

/* Method to create users */
const createUser = async (req, res) => {
  const { user_id, username, password, headquarter_name, city_id } = req.body;
  try {
    //Validate users by headquarter and city limit
    const counter = await dbConnection("users")
      .where("city_id", "=", city_id)
      .andWhere("headquarter_name", "=", headquarter_name)
      .count("headquarter_name as users_count");
    if (counter[0].users_count < 300) {
      //Validate if user already exist
      const userList = await dbConnection("users")
        .where("user_id", "=", user_id)
        .select("*");
      if (userList.length === 0) {
        const result = await dbConnection("users").insert({
          user_id: `${user_id}`,
          username: `${username}`,
          password: `${password}`,
          headquarter_name: `${headquarter_name}`,
          city_id,
        });
        result
          ? res
              .status(201)
              .json({ success: true, message: "User created successfully!" })
          : res.status(400).json({ message: "Error creating user" });
      } else {
        res.status(400).json({ message: "User already exist!" });
      }
    } else {
      res.status(400).json({ message: "Maximum user limit reached" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* Method to autenticate users using JWT*/
const authUser = async (req, res) => {
  const user = req.body;
  try {
    const result = await dbConnection("users")
      .join("cities", "users.city_id", "=", "cities.city_id")
      .join("roles", "users.role_id", "=", "roles.role_id")
      .select(
        "users.user_id",
        "users.username",
        "users.role_id",
        "roles.role_name",
        "users.headquarter_name",
        "cities.city_name"
      )
      .where(user);
    if (result.length !== 0) {
      result[0].role_id === 1
        ? ((payload = {
            user_id: result[0].user_id,
            username: result[0].username,
            role_id: result[0].role_id,
          }),
          jwt.sign(
            payload,
            process.env.SECRET_KEY,
            { expiresIn: "1h" },
            (err, token) => {
              res.json({
                message: "OK",
                user_id: result[0].user_id,
                role_name: result[0].role_name,
                token,
              });
            }
          ))
        : res
            .status(403)
            .json({ message: "You must be an administrator to login1" });
    } else {
      res
        .status(404)
        .json({ message: "Invalid credentials or user does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* Add new city */
const createCity = async (req, res) => {
  const { city_name } = req.body;
  try {
    const result = await dbConnection("cities").insert({
      city_name: city_name,
    });
    result
      ? res.status(200).json({ success: true, message: "ok" })
      : res.status(400).json({ message: "Error adding city" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* Add new headquarter */
const createHeadquarter = async (req, res) => {
  const { headquarter_name } = req.body;
  const { id: city_id } = req.params;
  try {
    const citiesList = await dbConnection("cities")
      .where("city_id", "=", city_id)
      .select("*");
    if (citiesList.length !== 0) {
      const result = await dbConnection("headquarters").insert({
        headquarter_name,
        city_id,
      });
      result
        ? res.status(200).json({ success: true, message: "ok" })
        : res.status(400).json({ message: "Error adding headquarter" });
    } else {
      res.status(400).json({ message: "This city does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* Get all users */
const getUsers = async (req, res) => {
  try {
    const result = await dbConnection("users")
      .join("cities", "users.city_id", "=", "cities.city_id")
      .join("roles", "users.role_id", "=", "roles.role_id")
      .select(
        "user_id",
        "username",
        "role_name",
        "headquarter_name",
        "city_name"
      )
    result.length !== 0
      ? res.status(200).json({ results: result })
      : res.status(400).json({ message: "No records" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* Get users by city and headquarter */
const getUsersHC = async (req, res) => {
  const { city: city_id, headquarter: headquarter_name } = req.params;
  try {
    const result = await dbConnection("users")
      .join("cities", "users.city_id", "=", "cities.city_id")
      .join("roles", "users.role_id", "=", "roles.role_id")
      .select(
        "user_id",
        "username",
        "role_name",
        "headquarter_name",
        "city_name"
      )
      .where("users.city_id", "=", city_id)
      .andWhere("users.headquarter_name", "=", headquarter_name);

    result.length !== 0
      ? res.status(200).json({ results: result })
      : res.status(400).json({ message: "No records" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  authUser,
  createCity,
  createHeadquarter,
  getUsers,
  getUsersHC
};
