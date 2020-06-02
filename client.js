const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

// method to append the messages in container
const appendMessage = (data) => {
  const dataDiv = document.createElement("div");
  dataDiv.innerText = data;
  messageContainer.append(dataDiv);
};

const method = swal({
  title: "welcome to spartan chat app",
  text: "Type your sweet name",
  content: "input",
  buttons: {
    ok: "Submit",
  },
}).then((name1) => {
  if (name1) {
    name = name1;

    appendMessage("you joined");
    socket.emit("new-user", name);

    console.log(name1);
  }
});

// to show user joined message to everyone
socket.on("newuser-connected", (name) => {
  appendMessage(`${name} joined`);
});

// to send message to evryone
socket.on("send-message", (data) => {
  appendMessage(`${data.name}:${data.message}`);
});

// disconnect the user
socket.on("user-disconnect", (data) => {
  appendMessage(`${data} disconnected`);
});

// add event listeners
messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = messageInput.value;
  appendMessage(`You: ${data}`);
  socket.emit("user-message", data);
  messageInput.value = "";
});
