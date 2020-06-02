const io = require("socket.io")(3000);
const users = {};

io.on("connection", (socket) => {
  console.log("server connection");
  // For new user
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("newuser-connected", name);
  });
  // message
  socket.on("user-message", (data) => {
    socket.broadcast.emit("send-message", {
      message: data,
      name: users[socket.id],
    });
  });
  // disconnect the user
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnect", users[socket.id]);
    delete users[socket.id];
  });
});
