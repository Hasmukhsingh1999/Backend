const express = require("express");
const ticketSchema = require("../models/ticketSchema");
const { all } = require("../routes");

exports.homeRoute = (req, res, next) => {
  res.json({ message: "Homepage!" });
};

exports.createTickets = async (req, res, next) => {
  try {
    const { title, description, category, priority, progress, status, active } =
      req.body;
    const newTicket = new ticketSchema({
      title,
      description,
      category,
      priority,
      progress,
      status,
      active,
    });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.showAllData = async (req, res, next) => {
  try {
    const allData = await ticketSchema.find();
    res.status(201).json(allData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getTicketById = async (req, res, next) => {
  try {
    const getDataById = await ticketSchema.findOne({ _id: req.params.id });
    if (!getDataById) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    await getDataById.save();
    res.status(200).json(getDataById);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.updateTheTickets = async (req, res, next) => {
  try {
    const ticketId = req.params.id;
    const updateData = req.body;
    if (!ticketId || !updateData) {
      return res.status(400).json({ error: "Invalid request data" });
    }
    console.log("Received data for updating ticket:", updateData);
    const updatedTicket = await ticketSchema.findByIdAndUpdate(
      ticketId,
      updateData,
      {
        new: true,
      }
    );
    if (!updatedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    console.log("Updated ticket:", updatedTicket);
    res.json(updatedTicket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTickets = async (req, res, next) => {
  try {
    const delTicket = await ticketSchema.findByIdAndRemove(req.params.id);
    if (delTicket) {
      res.status(201).json(delTicket);
    } else {
      res.status(404).json({ error: "Ticket not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
