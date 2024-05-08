const name = prompt("Enter your name:");
localStorage.setItem('name', name);


document.addEventListener("DOMContentLoaded", function() {
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-btn");
    const chatMessages = document.getElementById("chat-messages");
    const audioUpload = document.getElementById("audio-upload");
    const musicPlayer = document.getElementById("music-player1");
    const audioSource = document.getElementById("audio-source");
    const socket = io();

    // // Send chat message
    // sendButton.addEventListener("click", function() {
    //     const messageText = messageInput.value.trim();
    //     if (messageText !== "") {
    //         socket.emit('chat message', messageText);
    //         messageInput.value = "";
    //     }
    // });

    // // Receive chat message
    // socket.on('chat message', (msg) => {
    //     displayMessage("User", msg);
    // });

    // function displayMessage(sender, message) {
    //     const messageElement = document.createElement("div");
    //     messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    //     chatMessages.appendChild(messageElement);
    //     chatMessages.scrollTop = chatMessages.scrollHeight;
    // }

 // Send chat message
 sendButton.addEventListener("click", function() {
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
        const name = localStorage.getItem('name') || 'User';
        socket.emit('chat message', { name: name, message: messageText });
        messageInput.value = "";
    }
});

// Receive chat message
socket.on('chat message', (data) => {
    displayMessage(data.name, data.message);
    console.log(data.name, data.message);
});

function displayMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}



    audioUpload.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            audioSource.src = fileURL;
            musicPlayer.load();
        }
    });
});
