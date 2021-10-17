const express = require("express");
const router = express.Router();
require("dotenv").config();
const Coach = require("../models/coach");
const {
  ROUTE_createAccountURL,
  ROUTE_getAllCoachesURL,
  ROUTE_deleteCoachByIdURL,
  ROUTE_updateCoachAccountURL,
} = require("../constants/routePaths");
const Team = require("../models/teams");

/**
 * @swagger
 * /coach/getAllCoaches:
 *  get:
 *    description: Retrieve all coaches
 *    responses:
 *        200:
 *           description: 'Response OK'
 */
router.get(ROUTE_getAllCoachesURL, async (req, res) => {
  try {
    const getAllCoaches = await Coach.find();
    res.json(getAllCoaches);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /coach/createAccount:
 *  post:
 *    description: Register new coach into the system
 *    produces:
 *          application/json
 *    parameters:
 *        - in: body
 *          name: Register new coach into the system
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
 *                  - salary
 *                  - date
 *                  - team
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
 *                   salary:
 *                      type: string
 *                   date:
 *                      type: string
 *                   team:
 *                      type: string
 *    responses:
 *        200:
 *           description: 'Coach created and registered successfully'
 */
router.post(ROUTE_createAccountURL, async (req, res) => {
  const coachObj = new Coach({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    street: req.body.street,
    nationality: req.body.nationality,
    sex: req.body.sex,
    birthdate: req.body.birthdate,
    city: req.body.city,
    educationStatus: req.body.educationStatus,
    salary: req.body.salary,
    date: req.body.date,
    team: req.body.team,
  });

  //local connectivity
  try {
    const sentData = await coachObj.save();

    if (sentData) {
      const updateTeamPlayer = await Team.updateOne(
        { _id: sentData.team },
        {
          $push: {
            coaches: {
              _id: sentData._id,
            },
          },
        }
      ).catch((err) => {
        console.log(err);
      });
    }
    res.json(sentData);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /coach/updateCoachAccount/{id}:
 *  patch:
 *    description: Update existing coach details in the system
 *    produces:
 *          application/json
 *    parameters:
 *        - in: path
 *          name: id
 *          schema:
 *                type: integer
 *                required: true
 *        - in: body
 *          name: Update  coach details in the system
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
 *                  - salary
 *                  - date
 *                  - team
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
 *                   salary:
 *                      type: string
 *                   date:
 *                      type: string
 *                   team:
 *                      type: string
 *    responses:
 *        200:
 *           description: 'Coach details updated successfully'
 */
router.patch(ROUTE_updateCoachAccountURL + "/:id", async (req, res) => {
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
      salary,
      date,
      team,
    } = req.body;

    //update coach details
    const coachDetailsUpdated = await Coach.findByIdAndUpdate(
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
        salary,
        date,
        team,
      }
    );

    //return updated coach string message
    res.status(200).json("Coach details updated successfully");
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /coach/deleteCoachById/{id}:
 *  delete:
 *    description: delete existing coach in the system by Id
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
 *           description: 'Coach deleted from system successfully'
 */
router.delete(ROUTE_deleteCoachByIdURL + "/:id", async function (req, res) {
  try {
    const deleteCoach = await Coach.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send("Coach deleted successfully");
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
