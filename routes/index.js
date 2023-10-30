const express = require("express");
const {
  homeRoute,
  createTickets,
  showAllData,
  getTicketById,
  updateTheTickets,
  deleteTickets,
} = require("../controllers/ticketControllers");
const router = express.Router();

// GET Homepage /api endpoint
router.get("/api", homeRoute);

// POST create Ticket /api/tickets
router.post("/api/tickets", createTickets);

// GET Show All Tickets /api/tickets/show-tickets
router.get("/api/tickets/show-tickets", showAllData);

// GET Get ticket by id /api/tickets/get-tickets/:id
router.get("/api/tickets/get-tickets/:id",getTicketById);

// PUT Update /api/tickets/update-ticket/:id
router.put("/api/tickets/update-ticket/:id",updateTheTickets);

// DELETE  /api/tickets/delete-ticket/:id
router.delete("/api/tickets/delete-ticket/:id",deleteTickets)

module.exports = router;
