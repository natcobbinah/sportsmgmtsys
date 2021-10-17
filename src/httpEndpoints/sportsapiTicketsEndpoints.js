import axiosinstance from "./axiosInstance";

function getAllTickets() {
  return axiosinstance.get("/tickets/getAllTickets");
}

function addNewTicket() {
  return axiosinstance.post("/tickets/addTicket");
}

function buyTicket(ticketId, supporterId) {
  return axiosinstance.patch(`/tickets/buyTicket/${ticketId}/${supporterId}`);
}

export { getAllTickets, addNewTicket, buyTicket };
