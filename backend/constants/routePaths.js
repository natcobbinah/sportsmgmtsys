const registerURL = "/register";
const getAllRegisteredUsers = "/getAllRegisteredUsers";
const deleteRegisteredUser = "/deleteRegisteredUser";
const loginURL = "/login";
const createAccountURL = "/createAccount";
const getAllCoachesURL = "/getAllCoaches";
const deleteCoachByIdURL = "/deleteCoachById";
const updateCoachAccountURL = "/updateCoachAccount";
const getAllSupportersURL = "/getAllSupporters";
const deleteSupporterByIdUrl = "/deleteSupporterById";
const updateSupporterAccountURL = "/updateSupporterAccount";
const buyTicket = "/buyTicket";
const addTicket = "/addTicket";
const getAllTickets = "/getAllTickets";
const registerPlayerURL = "/registerPlayer";
const getAllPlayers = "/getAllPlayers";
const updatePlayer = "/updatePlayer";
const deletePlayer = "/deletePlayer";
const generateReportURL = "/generateReport";
const updateFixturesURL = "/updateFixtures";
const addCommentURL = "/addComment";
const updateCommentURL = "/updateComment";
const deleteCommentURL = "/deleteComment";
const getAllCommentsURL = "/getAllComments";
const addClubTeam = "/addClubTeam";
const getAllClubTeams = "/getAllClubTeams";
const deleteClubTeam = "/deleteClubTeam";
const updateClubTeam = "/updateClubTeam";
const welcomeURL = "/welcome";
const remoteURI =
  "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.1ljd7.mongodb.net/sms?authSource=admin";
const addFixtures = "/addFixtures";
const getFixtures = "/getFixtures";
const updateFixtures = "/updateFixtures";
const deleteFixture = "/deleteFixture";

const addPlayGround = "/addPlayGround";
const getPlayGround = "/getPlayGround";
const getPlayGroundFixtures = "/getPlayGround/fixtures";
const updatePlayGround = "/updatePlayGround";
const deletePlayground = "/deletePlayground";

//new team implementation
const addTeam = "/addTeam";
const getAllTeams = "/getAllTeams";
const deleteTeam = "/deleteTeam";
const updateTeam = "/updateTeam";

module.exports = {
  ROUTE_registerURL: registerURL,
  ROUTE_getAllRegisteredUsers: getAllRegisteredUsers,
  ROUTE_deleteRegisteredUser: deleteRegisteredUser,
  ROUTE_loginURL: loginURL,
  ROUTE_createAccountURL: createAccountURL,
  ROUTE_getAllCoachesURL: getAllCoachesURL,
  ROUTE_deleteCoachByIdURL: deleteCoachByIdURL,
  ROUTE_updateCoachAccountURL: updateCoachAccountURL,
  ROUTE_createAccountURL: createAccountURL,
  ROUTE_getAllSupportersURL: getAllSupportersURL,
  ROUTE_deleteSupporterByIdUrl: deleteSupporterByIdUrl,
  ROUTE_updateSupporterAccountURL: updateSupporterAccountURL,
  ROUTE_registerPlayerURL: registerPlayerURL,
  ROUTE_getAllPlayers: getAllPlayers,
  ROUTE_updatePlayer: updatePlayer,
  ROUTE_deletePlayer: deletePlayer,
  ROUTE_generateReportURL: generateReportURL,
  ROUTE_updateFixturesURL: updateFixturesURL,
  ROUTE_getAllTickets: getAllTickets,
  ROUTE_addCommentURL: addCommentURL,
  ROUTE_updateCommentURL: updateCommentURL,
  ROUTE_deleteCommentURL: deleteCommentURL,
  ROUTE_getAllCommentsURL: getAllCommentsURL,
  ROUTE_addClubTeam: addClubTeam,
  ROUTE_getAllClubTeams: getAllClubTeams,
  ROUTE_deleteClubTeam: deleteClubTeam,
  ROUTE_updateClubTeam: updateClubTeam,
  ROUTE_welcomeURL: welcomeURL,
  ROUTE_buyTicket: buyTicket,
  ROUTE_addTicket: addTicket,
  ROUTE_remoteURI: remoteURI,
  ROUTE_addFixtures: addFixtures,
  ROUTE_getFixtures: getFixtures,
  ROUTE_updateFixtures: updateFixtures,
  ROUTE_deleteFixture: deleteFixture,
  ROUTE_addPlayGround: addPlayGround,
  ROUTE_getPlayGround: getPlayGround,
  ROUTE_getPlayGroundFixtures: getPlayGroundFixtures,
  ROUTE_updatePlayGround: updatePlayGround,
  ROUTE_deletePlayground: deletePlayground,
  ROUTE_addTeam: addTeam,
  ROUTE_getAllTeams: getAllTeams,
  ROUTE_deleteTeam: deleteTeam,
  ROUTE_updateTeam: updateTeam,
};
