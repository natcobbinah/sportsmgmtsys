import Dashboard from "views/Dashboard.js";
import Supporters from "views/Supporters";
import Players from "views/players";
import Coaches from "views/coach";
import FixtureCreate from "views/fixtureCreate";
import Users from "views/users";
import ViewPlayers from "views/playersView";
import Team from "views/teams";

const dashboardRoutes = [
  {
    path: "/admin/dashboard",
    name: "DASHBOARD",
    icon: "nc-icon nc-settings-gear-64",
    component: Dashboard,
    layout: "",
  },
  {
    path: "/admin/users",
    name: "USERS",
    icon: "nc-icon nc-circle-09",
    component: Users,
    layout: "",
  },
  {
    path: "/admin/supporters",
    name: "TEAM SUPPORTERS",
    icon: "nc-icon nc-grid-45",
    component: Supporters,
    layout: "",
  },
  {
    path: "/admin/teams",
    name: "ADD TEAMS",
    icon: "nc-icon nc-single-02",
    component: Team,
    layout: "",
  },
  {
    path: "/admin/players",
    name: "ADD PLAYERS",
    icon: "nc-icon nc-single-02",
    component: Players,
    layout: "",
  },
  {
    path: "/admin/viewplayers",
    name: "VIEW PLAYERS",
    icon: "nc-icon nc-puzzle-10",
    component: ViewPlayers,
    layout: "",
  },
  {
    path: "/admin/coaches",
    name: "COACHES",
    icon: "nc-icon nc-badge",
    component: Coaches,
    layout: "",
  },
  {
    path: "/admin/fixtures",
    name: "FIXTURES",
    icon: "nc-icon  nc-album-2",
    component: FixtureCreate,
    layout: "",
  },
  {
    path: "/",
    name: "LOGOUT",
    icon: "nc-icon  nc-delivery-fast",
    layout: "",
  },
];

export default dashboardRoutes;
