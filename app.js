const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./db/connect");
const userRouter = require("./routes/userRoutes");
const hospitalRouter = require("./routes/hospitalRoutes");
const patientRouter = require("./routes/patientRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const nurseRouter = require("./routes/nurseRoutes");
const appointmentRouter = require("./routes/appointmentRoutes");
const medicineRouter = require("./routes/medicineRoutes");

const app = express();
const port = 3000;

// --- express body-parser middleware ---
app.use(express.json({ limit: "10kb" }));

// --- cookie parser middleware ---
app.use(cookieParser());

// --- routes ---
app.use("/api/v1/users", userRouter);

// --- [admin] has access to every route,it has full control over application
// --- everything follows on after user is authenticated
app.use("/api/v1/hospitals", hospitalRouter);
app.use("/api/v1/patients", patientRouter);
app.use("/api/v1/doctors", doctorRouter);

// --- [user] can manage that routes ---
app.use("/api/v1/nurses", nurseRouter);

// --- [user,staff] can manage that routes ---
app.use("/api/v1/appointments", appointmentRouter);

// [user,staff] can manage that routes ---
app.use("/api/v1/medicines", medicineRouter);

app.get("*", (req, res) =>
  res.status(501).send(`The route "${req.originalUrl}" is not defined yet.`)
);

(function initializeDatabaseAndServer() {
  connectDB()
    .then(() => {
      console.log("Database Connected...");
      app.listen(port, (error) => {
        if (error) console.log("Error in Server Setup");
        console.log(`App running on port ${port}`);
      });
    })
    .catch((error) => console.log("Database Error :", error));
})();
