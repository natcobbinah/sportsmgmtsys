const express = require("express");
const router = express.Router();
require("dotenv").config();
const {
  ROUTE_createAccountURL,
  ROUTE_getAllSupportersURL,
  ROUTE_deleteSupporterByIdUrl,
  ROUTE_updateSupporterAccountURL,
  ROUTE_getAllCommentsURL,
} = require("../constants/routePaths");
const Supporter = require("../models/supporter");

/**
 * @swagger
 * /supporters/getAllSupporters:
 *  get:
 *    description: Retrieve all team supporters
 *    responses:
 *        200:
 *           description: 'All team supporters retrieved successfully'
 */
router.get(ROUTE_getAllSupportersURL, async (req, res) => {
  try {
    const getAllSupporters = await Supporter.find()
      .populate("comments")
      .populate("tickets");
    res.json(getAllSupporters);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /supporters/getAllComments/{email}:
 *  get:
 *    description: Get all comments by a supporter by email
 *    produces:
 *          application/json
 *    parameters:
 *        - in: path
 *          name: email
 *          schema:
 *                type: string
 *                required: true
 *    responses:
 *        200:
 *           description: 'Supporter comments retrieved successfully'
 */
router.get(ROUTE_getAllCommentsURL + "/:email", async (req, res) => {
  try {
    const getAllSupporterComments = await Supporter.find({
      email: req.params.email,
    })
      .populate("comments")
      .populate("tickets");
    res.json(getAllSupporterComments);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /supporters/createAccount:
 *  post:
 *    description: Register new team supporter into the system
 *    produces:
 *          application/json
 *    parameters:
 *        - in: body
 *          name: Register new supporter into the system
 *          schema:
 *              type: object
 *              required:
 *                  - firstName
 *                  - lastName
 *                  - email
 *                  - phone
 *                  - street
 *                  - nationality
 *                  - sex
 *                  - birthdate
 *                  - city
 *                  - educationStatus
 *                  - date
 *              properties:
 *                   firstName:
 *                      type: string
 *                   lastName:
 *                      type: string
 *                   email:
 *                      type: string
 *                   phone:
 *                      type: string
 *                   street:
 *                      type: string
 *                   nationality:
 *                      type: string
 *                   sex:
 *                      type: string
 *                      enum:
 *                           - male
 *                           - female
 *                           - bi-sexual
 *                           - transgender
 *                   birthdate:
 *                      type: string
 *                   city:
 *                      type: string
 *                   educationStatus:
 *                      type: string
 *                   date:
 *                      type: string
 *    responses:
 *        200:
 *           description: 'Supporter created and registered successfully'
 */
router.post(ROUTE_createAccountURL, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      street,
      nationality,
      sex,
      birthdate,
      educationStatus,
      date,
    } = req.body;

    //create supporters
    const supporterDetails = await Supporter.create({
      firstName,
      lastName,
      email,
      phone,
      street,
      nationality,
      sex,
      birthdate,
      educationStatus,
      date,
    });

    //return supporter object
    res.json(supporterDetails);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /supporters/updateSupporterAccount/{id}:
 *  patch:
 *    description: Update existing supporter details in the system
 *    produces:
 *          application/json
 *    parameters:
 *        - in: path
 *          name: id
 *          schema:
 *                type: integer
 *                required: true
 *        - in: body
 *          name: Update  supporter details in the system
 *          schema:
 *              type: object
 *              required:
 *                  - firstName
 *                  - lastName
 *                  - email
 *                  - phone
 *                  - street
 *                  - nationality
 *                  - sex
 *                  - birthdate
 *                  - city
 *                  - educationStatus
 *                  - date
 *              properties:
 *                   firstName:
 *                      type: string
 *                   lastName:
 *                      type: string
 *                   email:
 *                      type: string
 *                   phone:
 *                      type: string
 *                   street:
 *                      type: string
 *                   nationality:
 *                      type: string
 *                   sex:
 *                      type: string
 *                      enum:
 *                           - male
 *                           - female
 *                           - bi-sexual
 *                           - transgender
 *                   birthdate:
 *                      type: string
 *                   city:
 *                      type: string
 *                   educationStatus:
 *                      type: string
 *                   date:
 *                      type: string
 *    responses:
 *        200:
 *           description: 'Supporter details updated successfully'
 */
router.patch(ROUTE_updateSupporterAccountURL + "/:id", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      street,
      nationality,
      sex,
      birthdate,
      educationStatus,
      date,
    } = req.body;

    //update supporter details object
    const supporterDetails = await Supporter.findByIdAndUpdate(
      { _id: req.params.id },
      {
        firstName,
        lastName,
        email,
        phone,
        street,
        nationality,
        sex,
        birthdate,
        educationStatus,
        date,
      }
    );

    //return update supporter string message
    res.status(200).json("Supporter details updated successfully");
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /supporters/deleteSupporterById/{id}:
 *  delete:
 *    description: delete existing supporter in the system by Id
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
 *           description: 'Supporter deleted from system successfully'
 */
router.delete(ROUTE_deleteSupporterByIdUrl + "/:id", async (req, res) => {
  try {
    const deleteSupporter = await Supporter.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send("Supporter deleted successfully");
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
