const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 4000;

io.on("connection", (socket) => {
  console.log("User Connected");
  socket.on("text", (data, id) => {
    console.log(id);
    io.emit("sendText", { data: data, id: id });
  });
});

http.listen(4000, () => {
  console.log(`listening on ${PORT}`);
});
