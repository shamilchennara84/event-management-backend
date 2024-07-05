const express = require("express");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const morgan = require('morgan')
const cors = require("cors");


const eventRoutes = require("./routes/eventRoute"); 

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

app.use(morgan("dev"));

async function startServer() {
  try {
    await connectDB();

    // Middleware to parse JSON bodies
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Routes
    app.use("/api/events", eventRoutes);


    // Simple route to test if the server is running
    app.get("/", (req, res) => {
      res.send("Server is running!");
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit process on error
  }
}

startServer();
