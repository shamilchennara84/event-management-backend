
const express = require("express");
const app = express();

require("dotenv").config();

// Simple route to test if the server is running
app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
