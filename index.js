const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 4000;

const router = require("./router");
app.use(router);

let content = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

io.on("connection", (socket) => {
  console.log("User Connected");
  io.emit("initial", content);
  socket.on("text", (data, id) => {
    content = data;
    io.emit("sendText", { data: content, id: id });
  });
});

http.listen(4000, () => {
  console.log(`listening on ${PORT}`);
});
