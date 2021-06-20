const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4050;
const SOCKET_PORT = 4000;

const io = require("socket.io")(SOCKET_PORT, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//IMPORT ROUTES

const authRoute = require("./routes/auth/auth");
// const adminRoute = require("./routes/admin/admin");
// const commonRoute = require("./routes/common/user");

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

//MIDDLEWARE

app.use(express.json(), cors());

//ROUTE MIDDLEWARE

app.use("/api/auth", authRoute);
// app.use("/api/admin", adminRoute);
// app.use("/api/common", commonRoute);

app.get("/", (req, res) => {
  res.send(`<p>Hey! It's working</p>`);
});

app.listen(PORT, () => console.log(`server up and running at  ${PORT}`));

io.on("connection", (socket) => {
  // console.log(socket);
  socket.on("send-changes", (delta) => {
    console.log(delta);
    socket.broadcast.emit("receive-changes", delta);
  });
});
