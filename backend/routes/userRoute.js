const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/user");

const {
  ROUTE_registerURL,
  ROUTE_loginURL,
  ROUTE_welcomeURL,
  ROUTE_getAllRegisteredUsers,
  ROUTE_deleteRegisteredUser,
  ROUTE_remoteURI,
} = require("../constants/routePaths");

const auth = require("../middleware/authentication");

const { MongoClient } = require("mongodb");

/**
 * @swagger
 * /wall/getAllRegisteredUsers:
 *  get:
 *    description: Retrieve all registered users
 *    responses:
 *        200:
 *           description: 'All registered users retrieved successfully'
 */
router.get(ROUTE_getAllRegisteredUsers, async (req, res) => {
  //local connectivity
  try {
    const getAllRegisteredUsers = await User.find(
      {},
      { token: 0, password: 0 }
    );
    res.json(getAllRegisteredUsers);
  } catch (err) {
    res.json({
      message: err,
    });
  }

  //remote connectivity
  /*  const client = new MongoClient(ROUTE_remoteURI, options);
  try {
    await client.connect();
    const database = client.db("sms");
    const collection = database.collection("users");
    const users = await collection.find({}).toArray();
    res.json(users);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  } */
});

/**
 * @swagger
 * /wall/register:
 *  post:
 *    description: Register Users into the system
 *    produces:
 *          application/json
 *    parameters:
 *        - in: body
 *          name: Save new registered user
 *          schema:
 *              type: object
 *              required:
 *                  - firstName
 *                  - lastName
 *                  - email
 *                  - password
 *                  - role
 *              properties:
 *                  firstName:
 *                    type: string
 *                  lastName:
 *                    type: string
 *                  email:
 *                    type: string
 *                  password:
 *                    type: string
 *                  role:
 *                    type: string
 *                    enum:
 *                         - admin
 *                         - coach
 *                         - supporter
 *    responses:
 *        200:
 *           description: 'New user registered successfully'
 */
router.post(ROUTE_registerURL, async (req, res) => {
  try {
    //user input
    const { firstName, lastName, email, password, role } = req.body;

    //bcrypt algorithm constant hashing rounds value
    const saltRounds = 10;

    //check if all fields are present
    if (!(firstName && lastName && email && password && role)) {
      return res.status(400).send("All fields are required");
    }

    //check if user already exists
    const oldUser = await User.findOne({ email: req.body.email });

    if (oldUser) {
      return res.status(400).send("User already exists");
    }

    //encrypt user password
    let encryptedPassword = await bcrypt.hash(password, saltRounds);

    //create token
    const token = jwt.sign(
      {
        email: req.body.email,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );

    //create user in db
    //local connectivity
    const newUser = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      token,
      role,
    });

    /*  //remote connectivity
    const newUserObj = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      token,
      role,
    };
    const client = new MongoClient(ROUTE_remoteURI, options);
    try {
      await client.connect();

      const database = client.db("sms");
      const collection = database.collection("users");
      const newUser = await collection.insertOne(newUserObj);
      return res.json(newUser);
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();
    }
 */
    //return new user
    return res.status(201).json(newUser);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /wall/login:
 *  post:
 *    description: Login Users into the system
 *    produces:
 *          application/json
 *    parameters:
 *        - in: body
 *          name: Login registered user
 *          schema:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *              properties:
 *                  email:
 *                    type: string
 *                  password:
 *                    type: string
 *    responses:
 *        200:
 *           description: 'User loggedIn successfully'
 */
router.post(ROUTE_loginURL, async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate user input
    if (!(email && password)) {
      return res.status(400).send("Invalid credentials");
    }

    //validate if user exist in db
    const user = await User.findOne({ email: req.body.email });

    if (user && (await bcrypt.compare(password, user.password))) {
      //create token
      const token = jwt.sign(
        {
          email: req.body.email,
        },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );

      //save user token
      user.token = token;
      return res.status(200).json(user);
    }
    res.status(400).send("Invalid credentials");
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /wall/deleteRegisteredUser/{id}:
 *  delete:
 *    description: delete existing user in the system by Id
 *    produces:
 *          application/json
 *    parameters:
 *        - in: path
 *          name: id
 *          schema:
 *                type: integer
 *                required: true
 *    responses:
 *        200:
 *           description: 'User deleted from system successfully'
 */
router.delete(ROUTE_deleteRegisteredUser + "/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(deletedUser);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /wall/welcome:
 *  get:
 *    description: Welcome page
 *    responses:
 *        200:
 *           description: 'Welcome page entered successfully'
 */
router.get(ROUTE_welcomeURL, auth, (req, res) => {
  res.status(200).send("Welcome");
});

module.exports = router;
