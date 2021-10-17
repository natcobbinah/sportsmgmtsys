const express = require("express");
const router = express.Router();
require("dotenv").config();
const path = require("path");
const crypto = require("crypto"); //to generate file name
const multer = require("multer");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream"); //storing and retriviing files that excess the BSON-document size limit of 16MB
const { GridFsStorage } = require("multer-gridfs-storage");
const ClubTeams = require("../models/clubsTeams");

const {
  ROUTE_addClubTeam,
  ROUTE_getAllClubTeams,
  ROUTE_deleteClubTeam,
  ROUTE_updateClubTeam,
} = require("../constants/routePaths");

let storage = new GridFsStorage({
  url: process.env.DB_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: "imageUpload",
      };
      resolve(fileInfo);
    });
  },
});

var conn = mongoose.connection;
var gfs;
conn.once("open", () => {
  //initizlize stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("imageUpload");
});

const upload = multer({ storage });

//add clubTeam together with its clubBadge
router.post(ROUTE_addClubTeam, upload.single("clubBadge"), async (req, res) => {
  try {
    //const { clubName, country, clubManager, clubBadge } = req.body;
    const clubDetails = await ClubTeams.create({
      clubName: req.body.clubName,
      country: req.body.country,
      clubManager: req.body.clubManager,
      clubBadge: req.file.id,
    });
    res.json({ file: req.file });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

//retrieve all clubTeams
router.get(ROUTE_getAllClubTeams, async (req, res) => {
  try {
    const getAllClubTeams = await ClubTeams.find();

    if (getAllClubTeams) {
      gfs.files.find(
        {
          _id: getAllClubTeams.clubBadge,
        },
        (err, file) => {
          //check if file exists
          if (!file || file.length == 0) {
            return res.status(404).json({
              err: "No files exist",
            });
          }

          //check if image
          if (
            file.contentType === "image/jpeg" ||
            file.contentType === "img/png"
          ) {
            //read output to browser
            const readStream = gfs.createReadStream(file.filename);
            readStream.pipe(res);
            res.sendFile(readStream);
          } else {
            res.status(404).json({
              err: "Not an image",
            });
          }
        }
      );
    }
    // res.json(getAllClubTeams);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
