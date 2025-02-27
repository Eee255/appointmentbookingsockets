const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = app.listen(3000, () => {
  console.log("Server running on port 3000");
});

const io = new Server(server, {
  cors: {
    origin: "https://appointmentbookingweb.vercel.app/",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("bookSlot", (doctorId) => {
    console.log(`User ${socket.id} booked a slot.`);
    
    // Notify all users **except the one who booked**
    socket.broadcast.emit("slotAlert", doctorId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
