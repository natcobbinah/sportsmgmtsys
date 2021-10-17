import axiosinstance from "./axiosInstance";

function getAllPlayers() {
  return axiosinstance.get("/player/getAllPlayers");
}

function addNewPlayer(data) {
  return axiosinstance.post("/player/registerPlayer", data);
}

function updatePlayer(id, data) {
  return axiosinstance.patch(`/player/updatePlayer/${id}`, data);
}

function deletePlayer(id) {
  return axiosinstance.delete(`/player/deletePlayer/${id}`);
}

export { getAllPlayers, addNewPlayer, updatePlayer, deletePlayer };
