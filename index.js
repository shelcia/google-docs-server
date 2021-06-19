// const app = require("express")();
// const http = require("http").Server(app);
// const io = require("socket.io")(http);
// const PORT = process.env.PORT || 4000;

// const router = require("./router");
// app.use(router);

// let content = [
//   {
//     type: "paragraph",
//     children: [{ text: "A line of text in a paragraph." }],
//   },
// ];

// io.on("connection", (socket) => {
//   console.log(`User Connected, ${socket.id}`);
//   io.emit("initial", content);
//   socket.on("text", (data, id) => {
//     content = data;
//     io.emit("sendText", { data: content, id: id });
//   });
// });

// http.listen(4000, () => {
//   console.log(`listening on ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
// const io = require("socket.io")(PORT);
const io = require("socket.io")(PORT, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// app.use(cors());

io.on("connection", (socket) => {
  // console.log(socket);
  socket.on("send-changes", (delta) => {
    console.log(delta);
    socket.broadcast.emit("receive-changes", delta);
  });
});
