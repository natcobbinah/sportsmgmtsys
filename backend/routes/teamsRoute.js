const express = require("express");
const router = express.Router();
require("dotenv").config();
const {
  ROUTE_addTeam,
  ROUTE_getAllTeams,
  ROUTE_deleteTeam,
  ROUTE_updateTeam,
} = require("../constants/routePaths");
const Team = require("../models/teams");

/**
 * @swagger
 * /team/getAllTeams:
 *  get:
 *    description: Retrieve all teams
 *    responses:
 *        200:
 *           description: 'All team  retrieved successfully'
 */
router.get(ROUTE_getAllTeams, async (req, res) => {
  try {
    const getTeams = await Team.find().populate("players").populate("coaches");
    res.json(getTeams);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /team/addTeam:
 *  post:
 *    description: Register new team  into the system
 *    produces:
 *          application/json
 *    parameters:
 *        - in: body
 *          name: Register new team into the system
 *          schema:
 *              type: object
 *              required:
 *                  - teamName
 *                  - teamOwner
 *                  - yearEstablished
 *              properties:
 *                   teamName:
 *                      type: string
 *                   teamOwner:
 *                      type: string
 *                   yearEstablished:
 *                      type: string
 *    responses:
 *        200:
 *           description: 'Team created and registered successfully'
 */
router.post(ROUTE_addTeam, async (req, res) => {
  try {
    const { teamName, teamOwner, yearEstablished } = req.body;
    const createTeam = await Team.create({
      teamName,
      teamOwner,
      yearEstablished,
    });
    //return created team object
    res.json(createTeam);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /team/deleteTeam/{id}:
 *  delete:
 *    description: delete existing team in the system by Id
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
 *           description: 'team deleted from system successfully'
 */
router.delete(ROUTE_deleteTeam + "/:id", async (req, res) => {
  try {
    const deleteTeam = await Team.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send("Team deleted successfully");
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
