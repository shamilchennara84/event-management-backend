const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getAllEvents,
  getUserEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  rsvpToEvent,
} = require("../controllers/eventController"); // Adjust the path as necessary

router.get("/", getAllEvents);
router.get("/user", passport.authenticate("jwt", { session: false }), getUserEvents);
router.post("/", passport.authenticate("jwt", { session: false }), createEvent);
router.put("/:id", passport.authenticate("jwt", { session: false }), updateEvent);
router.delete("/:id", passport.authenticate("jwt", { session: false }), deleteEvent);
router.post("/:eventId/rsvp", passport.authenticate("jwt", { session: false }), rsvpToEvent);

module.exports = router;
