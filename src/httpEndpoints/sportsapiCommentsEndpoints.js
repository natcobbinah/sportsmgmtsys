import axiosinstance from "./axiosInstance";

function getAllComments() {
  return axiosinstance.get("/comments/getAllComments");
}

function addNewComment() {
  return axiosinstance.post("/comments/addComment");
}

function updateComment(id) {
  return axiosinstance.patch(`/comments/updateComment/${id}`);
}

function deleteComment(id) {
  return axiosinstance.delete(`/comments/deleteComment/${id}`);
}

export { getAllComments, addNewComment, updateComment, deleteComment };
