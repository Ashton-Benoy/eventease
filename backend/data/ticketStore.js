let tickets = [];
let currentId = 1;

function createTicket(data) {
  const ticket = {
    ticketId: currentId++,
    ...data,
    createdAt: new Date().toISOString(),
  };
  tickets.push(ticket);
  return ticket;
}

function getTicketById(id) {
  return tickets.find(t => t.ticketId === Number(id));
}

function getAllTickets() {
  return tickets;
}

module.exports = {
  createTicket,
  getTicketById,
  getAllTickets,
};
