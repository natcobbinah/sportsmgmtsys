const express = require("express");
const router = express.Router();
require("dotenv").config();
const PlayGround = require("../models/playGround");
const {
  ROUTE_addPlayGround,
  ROUTE_getPlayGround,
  ROUTE_getPlayGroundFixtures,
  ROUTE_updatePlayGround,
  ROUTE_deletePlayground,
} = require("../constants/routePaths");

/**
 * @swagger
 * /playGround/getPlayGround:
 *  get:
 *    description: Retrieve all playGrounds
 *    responses:
 *        200:
 *           description: 'Response OK'
 */
router.get(ROUTE_getPlayGround, async (req, res) => {
  try {
    const getPlayGround = await PlayGround.find();
    res.json(getPlayGround);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /playGround/getPlayGround/fixtures:
 *  get:
 *    description: Retrieve all playGrounds fixtures
 *    responses:
 *        200:
 *           description: 'Response OK'
 */
router.get(ROUTE_getPlayGroundFixtures, async (req, res) => {
  try {
    const getPlayGround = await PlayGround.find().populate("Fixtures");
    res.json(getPlayGround);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /playGround/addPlayGround:
 *  post:
 *    description: Register new playground into the system
 *    produces:
 *          application/json
 *    parameters:
 *        - in: body
 *          name: Register new playground into the system
 *          schema:
 *              type: object
 *              required:
 *                  - title
 *                  - country
 *                  - city
 *                  - capacity
 *                  - address
 *                  - fixtures
 *              properties:
 *                   title:
 *                      type: string
 *                   country:
 *                      type: string
 *                   city:
 *                      type: string
 *                   capacity:
 *                      type: string
 *                   address:
 *                      type: string
 *                   fixtures:
 *                      type: string
 *    responses:
 *        200:
 *           description: 'Playground created successfully'
 */
router.post(ROUTE_addPlayGround, async (req, res) => {
  try {
    const { title, country, city, capacity, address, fixtures } = req.body;

    //create playGround
    const addPlayGroundDetails = await PlayGround.create({
      title,
      country,
      city,
      capacity,
      address,
      fixtures,
    });

    //return playGround object
    res.status(201).json(addPlayGroundDetails);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /playGround/updatePlayGround/{id}:
 *  patch:
 *     description: Update existing playground details in the system
 *     produces:
 *          application/json
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *                type: integer
 *                required: true
 *         - in: body
 *           name: Update  playground details in the system
 *           schema:
 *              type: object
 *              required:
 *                  - title
 *                  - country
 *                  - city
 *                  - capacity
 *                  - address
 *                  - fixtures
 *              properties:
 *                   title:
 *                      type: string
 *                   country:
 *                      type: string
 *                   city:
 *                      type: string
 *                   capacity:
 *                      type: string
 *                   address:
 *                      type: string
 *                   fixtures:
 *                      type: string
 *     responses:
 *        200:
 *           description: 'Playground details updated successfully'
 */
router.patch(ROUTE_updatePlayGround + "/:id", async (req, res) => {
  try {
    const { title, country, city, capacity, address, fixtures } = req.body;

    //update coach details
    const playGroundDetailsUpdated = await PlayGround.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title,
        country,
        city,
        capacity,
        address,
        fixtures,
      }
    );

    res.status(200).json(playGroundDetailsUpdated);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /playGround/deletePlayground/{id}:
 *  delete:
 *    description: delete existing playground in the system by Id
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
 *           description: 'playGround deleted from system successfully'
 */
router.delete(ROUTE_deletePlayground + "/:id", async function (req, res) {
  try {
    const deletePlayGround = await PlayGround.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send(deletePlayGround);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
