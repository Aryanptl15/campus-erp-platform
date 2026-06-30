const express = require("express");
   const mongoose = require("mongoose");
   const cors = require("cors");
   const path = require("path");

   const app = express();

   app.use(cors());
   app.use(express.json());

   // MongoDB connect
   mongoose.connect("mongodb://127.0.0.1:27017/cms")
   .then(()=>console.log("MongoDB Connected"))
   .catch(err=>console.log(err));

   // Serve static files (HTML, CSS, JS)
   app.use(express.static(path.join(__dirname, "../cms")));

   // Routes import
   const studentRoutes = require("./routes/studentRoutes");
   app.use("/api/students", studentRoutes);

   const facultyRoutes = require("./routes/facultyRoutes");
   app.use("/api/faculty", facultyRoutes);

   const authRoutes = require("./routes/authRoutes");
   app.use("/api/auth", authRoutes);

   const noticeRoutes = require("./routes/noticeRoutes");
   app.use("/api/notices", noticeRoutes);

   // Payment routes
   const paymentRoutes = require("./routes/paymentRoutes");
   app.use("/api/payments", paymentRoutes);

   // Favicon
   app.get("/favicon.ico", (req, res) => {
     res.sendFile(path.join(__dirname, "../cms/favicon.ico"));
   });

   // SPA Routing - Serve index.html for all non-API routes
   app.get("*", (req, res) => {
     res.sendFile(path.join(__dirname, "../cms/index.html"));
   });

   // Server start
   app.listen(3000, ()=>{
     console.log("Server running on port 3000");
     console.log("Access at http://localhost:3000");
   });