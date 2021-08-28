const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const PORT = 4000 || process.env.PORT;
const Document = require("./models/Document");

const io = require("socket.io")(PORT, {
  cors: {
    origin: "*",
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

io.on("connection", (socket) => {
  socket.on("send-changes", (delta) => {
    console.log(delta.delta);
    socket.broadcast.emit("receive-changes", delta);
  });
});

// const defaultValue = "";

// io.on("connection", (socket) => {
//   socket.on("get-document", async (documentId) => {
//     const document = await findOrCreateDocument(documentId);
//     socket.join(documentId);
//     socket.emit("load-document", document.data);

//     socket.on("send-changes", (delta) => {
//       socket.broadcast.to(documentId).emit("receive-changes", delta);
//     });

//     socket.on("save-document", async (data) => {
//       await Document.findByIdAndUpdate(documentId, { data });
//     });
//   });
// });

// async function findOrCreateDocument(id) {
//   if (id == null) return;

//   const document = await Document.findById(id);
//   if (document) return document;
//   return await Document.create({ _id: id, data: defaultValue });
// }
