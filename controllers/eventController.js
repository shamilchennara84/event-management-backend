const Event = require("../models/eventModel"); // Adjust the path as necessary

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserEvents = async (req, res) => {
  try {
    const userEvents = await Event.find({ creatorId: req.user._id });
    console.log(userEvents);
    res.json(userEvents);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};

exports.createEvent = async (req, res) => {

  const event = new Event({
    ...req.body,
    creatorId: req.user._id, 
  });
  try {
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (String(event.creatorId) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to edit this event" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (String(event.creatorId) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }

    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    res.json(deletedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.rsvpToEvent = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Assuming user authentication
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.rsvps.push(user._id);
    await event.save();

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
