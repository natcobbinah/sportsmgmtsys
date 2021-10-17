import axiosinstance from "./axiosInstance";

function getAllFixtures() {
  return axiosinstance.get("/fixture/getFixtures");
}

function addNewFixture(data) {
  return axiosinstance.post("/fixture/addFixtures", data);
}

function updateFixture(id, data) {
  return axiosinstance.patch(`/fixture/updateFixtures/${id}`, data);
}

function deleteFixture(id) {
  return axiosinstance.delete(`/fixture/deleteFixture/${id}`);
}

export { getAllFixtures, addNewFixture, updateFixture, deleteFixture };
