const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const PORT = 4000 || process.env.PORT;

const io = require("socket.io")(PORT, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

dotenv.config();

//CONNECTION TO DATABASE

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
  () => console.log("connected to db")
);

// app.get("/", (req, res) => {
//   res.send(`<p>Hey! It's working</p>`);
// });

// app.listen(PORT, () => console.log(`server up and running at  ${PORT}`));

io.on("connection", (socket) => {
  socket.on("send-changes", (delta) => {
    console.log(delta);
    socket.broadcast.emit("receive-changes", delta);
  });
});
