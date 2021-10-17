import axiosinstance from "./axiosInstance";

function registerUser(userData) {
  return axiosinstance.post("/wall/register", userData);
}

function loginUser(credentialsData) {
  return axiosinstance.post("/wall/login", credentialsData);
}

function getAllRegisteredUsers() {
  return axiosinstance.get("/wall/getAllRegisteredUsers");
}

function deleteRegisteredUser(id) {
  return axiosinstance.delete(`/wall/deleteRegisteredUser/${id}`);
}

export { registerUser, loginUser, getAllRegisteredUsers, deleteRegisteredUser };
