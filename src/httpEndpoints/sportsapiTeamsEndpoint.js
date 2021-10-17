import axiosinstance from "./axiosInstance";

function getAllTeams() {
  return axiosinstance.get("/team/getAllTeams");
}

function addNewTeam(data) {
  return axiosinstance.post("/team/addTeam", data);
}

function deleteTeam(id) {
  return axiosinstance.delete(`/team/deleteTeam/${id}`);
}

export { getAllTeams, addNewTeam, deleteTeam };
