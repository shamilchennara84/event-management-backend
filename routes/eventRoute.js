const express = require("express");
const router = express.Router();
const { getAllEvents, createEvent, updateEvent, deleteEvent, rsvpToEvent } = require("../controllers/EventController"); // Adjust the path as necessary

router.get("/", getAllEvents);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.post("/:eventId/rsvp", rsvpToEvent);

module.exports = router;
