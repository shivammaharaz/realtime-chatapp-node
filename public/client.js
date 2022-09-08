const socket = io();

let username;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message-area");

do {
  username = prompt("Enter your name");
} while (!username);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if(e.target.value!==''){
    sendMessage(e.target.value);
  }
  }
});

function sendMessage(mseg) {
  let msg = {
    user: username,
    message: mseg.trim(),
  };
//   appending message
  appendMessage(msg, "outgoing");

  textarea.value = "";

  // send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");
  let markup = `
    <h4 >${msg.user}</h4>
    <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;

  messageArea.appendChild(mainDiv);
}

//receiving message

socket.on("msg", (msg) => {
  appendMessage(msg, "incoming");
});
