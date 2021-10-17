const express = require("express");
const app = express();
let cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const usersRoute = require("./routes/userRoute");
const playersRoute = require("./routes/playerRoute");
const coachRoute = require("./routes/coachRoute");
const supportersRoute = require("./routes/supporterRoute");
const ticketsRoute = require("./routes/ticketsRoute");
const commentsRoute = require("./routes/commentRoute");
const clubTeamRoute = require("./routes/clubTeamRoute");
const fixturesRoute = require("./routes/fixturesRoute");
const playGroundRoute = require("./routes/playGroundRoute");
const teamRoute = require("./routes/teamsRoute");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

//initialize db connectivity options
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Sports Management System",
      description: "SPORTS-MGMT-SYSTEM API Information",
      contact: {
        name: "Cobbinah Nathaniel",
      },
      servers: ["https://localhost:3002"],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

//use middlewares
app.use(express.json());
app.use(cors());
app.use("/wall", usersRoute);
app.use("/player", playersRoute);
app.use("/coach", coachRoute);
app.use("/supporters", supportersRoute);
app.use("/tickets", ticketsRoute);
app.use("/comments", commentsRoute);
app.use("/clubTeam", clubTeamRoute);
app.use("/fixture", fixturesRoute);
app.use("/playGround", playGroundRoute);
app.use("/team", teamRoute);
app.use("/sportsapi", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(5000 || 5000, () => {
  console.log("Server running");
});

//middlewares
app.use(cors());

//client-side routing
/* app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
}); */

mongoose.connect(process.env.DB_URL, options, () => {
  console.log("Connected to mongodb Compass");
});
