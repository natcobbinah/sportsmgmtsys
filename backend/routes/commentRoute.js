const express = require("express");
const router = express.Router();
require("dotenv").config();
const Comments = require("../models/comment");
const {
  ROUTE_addCommentURL,
  ROUTE_updateCommentURL,
  ROUTE_deleteCommentURL,
  ROUTE_getAllCommentsURL,
} = require("../constants/routePaths");
const Supporter = require("../models/supporter");

/**
 * @swagger
 * /comments/getAllComments:
 *  get:
 *    description: Retrieve all comments in the system
 *    responses:
 *        200:
 *           description: 'All Comments retrieved successfully'
 */
router.get(ROUTE_getAllCommentsURL, async (req, res) => {
  try {
    const getAllComments = await Comments.find();
    res.json(getAllComments);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /comments/addComment:
 *  post:
 *    description: Add a comment by a supporter into the system
 *    produces:
 *          application/json
 *    parameters:
 *        - in: body
 *          name: Add a comment by a supporter into the system
 *          schema:
 *              type: object
 *              required:
 *                  - description
 *                  - createdDate
 *                  - commentBy
 *              properties:
 *                   description:
 *                      type: string
 *                   createdDate:
 *                      type: string
 *                   commentBy:
 *                      type: string
 *    responses:
 *        200:
 *           description: 'Supporter created and registered successfully'
 */
router.post(ROUTE_addCommentURL, async (req, res) => {
  const comment = new Comments({
    description: req.body.description,
    createdDate: req.body.createdDate,
    commentBy: req.body.commentBy,
  });
  try {
    const createdComment = await comment.save();

    if (createdComment) {
      const updateSupporterComment = await Supporter.updateOne(
        { _id: createdComment.commentBy },
        {
          $push: {
            comments: {
              _id: createdComment._id,
            },
          },
        }
      ).catch((err) => {
        console.log(err);
      });
    }
    res.json(createdComment);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /comments/updateComment/{id}:
 *  patch:
 *    description: update existing comment in the system by Id
 *    produces:
 *          application/json
 *    parameters:
 *        - in: path
 *          name: id
 *          schema:
 *                type: string
 *                required: true
 *        - in: body
 *          name: Update  comment details in the system
 *          schema:
 *              type: object
 *              required:
 *                  - description
 *              properties:
 *                    description:
 *                      type: string
 *    responses:
 *        200:
 *           description: 'Comment update from system successfully'
 */
router.patch(ROUTE_updateCommentURL + "/:id", async (req, res) => {
  try {
    const { description } = req.body;

    //update comment
    const updatedComment = await Comments.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        description,
      }
    );
    //return update comment string message
    res.status(200).json(updatedComment);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

/**
 * @swagger
 * /comments/deleteComment/{id}:
 *  delete:
 *    description: delete existing comment in the system by Id
 *    produces:
 *          application/json
 *    parameters:
 *        - in: path
 *          name: id
 *          schema:
 *                type: string
 *                required: true
 *    responses:
 *        200:
 *           description: 'Comment deleted from system successfully'
 */
router.delete(ROUTE_deleteCommentURL + "/:id", async (req, res) => {
  try {
    //find comment
    const getComment = await Comments.findById({
      _id: req.params.id,
    });

    //delete comment reference from Supporter
    if (getComment) {
      const deleteCommentReference = await Supporter.updateOne(
        { _id: getComment.commentBy },
        {
          $pull: {
            comments: {
              _id: getComment._id,
            },
          },
        }
      );
    }

    //now delete comment from comment table
    const deleteComment = await Comments.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send("Comments deleted successfully");
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
