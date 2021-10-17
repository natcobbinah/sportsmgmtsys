const express = require("express");
const router = express.Router();
require("dotenv").config();
const Fixtures = require("../models/fixtures");
const {
  ROUTE_addFixtures,
  ROUTE_getFixtures,
  ROUTE_updateFixtures,
  ROUTE_deleteFixture,
} = require("../constants/routePaths");

/**
 * @swagger
 * /fixture/getFixtures:
 *  get:
 *    description: Retrieve all fixtures
 *    responses:
 *        200:
 *           description: 'Response OK'
 */
router.get(ROUTE_getFixtures, async (req, res) => {
  try {
    const getFixtures = await Fixtures.find();
    res.json(getFixtures);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /fixture/addFixtures:
 *  post:
 *    description: Register new fixtures into the system
 *    produces:
 *          application/json
 *    parameters:
 *        - in: body
 *          name: Register new fixtures into the system
 *          schema:
 *              type: object
 *              required:
 *                  - teamOne
 *                  - teamTwo
 *                  - scores
 *                  - playatTimeDate
 *                  - postPoned
 *                  - playGround
 *                  - city
 *                  - winner
 *                  - looser
 *                  - draw
 *                  - foul
 *              properties:
 *                   teamOne:
 *                      type: string
 *                   teamTwo:
 *                      type: string
 *                   scores:
 *                      type: string
 *                   playatTimeDate:
 *                      type: string
 *                   postPoned:
 *                      type: boolean
 *                   playGround:
 *                      type: string
 *                   city:
 *                      type: string
 *                   winner:
 *                      type: string
 *                   looser:
 *                      type: string
 *                   draw:
 *                      type: string
 *                   foul:
 *                      type: string
 *    responses:
 *        200:
 *           description: 'Fixtures created successfully'
 */
router.post(ROUTE_addFixtures, async (req, res) => {
  try {
    const {
      teamOne,
      teamTwo,
      scores,
      playatTimeDate,
      postPoned,
      playGround,
      city,
      winner,
      looser,
      draw,
      foul,
    } = req.body;

    //create fixture
    const fixtureDetails = await Fixtures.create({
      teamOne,
      teamTwo,
      scores,
      playatTimeDate,
      postPoned,
      playGround,
      city,
      winner,
      looser,
      draw,
      foul,
    });

    //return fixture object
    res.status(201).json(fixtureDetails);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /fixture/updateFixtures/{id}:
 *  patch:
 *     description: Update existing fixture details in the system
 *     produces:
 *          application/json
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *                type: integer
 *                required: true
 *         - in: body
 *           name: Update  fixture details in the system
 *           schema:
 *              type: object
 *              required:
 *                  - teamOne
 *                  - teamTwo
 *                  - scores
 *                  - playatTimeDate
 *                  - postPoned
 *                  - playGround
 *                  - city
 *                  - winner
 *                  - looser
 *                  - draw
 *                  - foul
 *              properties:
 *                   teamOne:
 *                      type: string
 *                   teamTwo:
 *                      type: string
 *                   scores:
 *                      type: string
 *                   playatTimeDate:
 *                      type: string
 *                   postPoned:
 *                      type: boolean
 *                   playGround:
 *                      type: string
 *                   city:
 *                      type: string
 *                   winner:
 *                      type: string
 *                   looser:
 *                      type: string
 *                   draw:
 *                      type: string
 *                   foul:
 *                      type: string
 *     responses:
 *        200:
 *           description: 'Fixture details updated successfully'
 */
router.patch(ROUTE_updateFixtures + "/:id", async (req, res) => {
  try {
    const {
      teamOne,
      teamTwo,
      scores,
      playatTimeDate,
      postPoned,
      playGround,
      city,
      winner,
      looser,
      draw,
      foul,
    } = req.body;

    //update fixture details
    const fixtureDetailsUpdated = await Fixtures.findByIdAndUpdate(
      { _id: req.params.id },
      {
        teamOne,
        teamTwo,
        scores,
        playatTimeDate,
        postPoned,
        playGround,
        city,
        winner,
        looser,
        draw,
        $push: {
          fouls: {
            foulType: foul,
          },
        },
      }
    );

    res.status(200).json(fixtureDetailsUpdated);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /fixture/deleteFixture/{id}:
 *  delete:
 *    description: delete existing fixture in the system by Id
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
 *           description: 'fixture deleted from system successfully'
 */
router.delete(ROUTE_deleteFixture + "/:id", async function (req, res) {
  try {
    const deleteFixture = await Fixtures.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send(deleteFixture);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
