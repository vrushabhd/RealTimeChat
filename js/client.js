const socket = io("http://localhost:8000");
//Get DOM elements in respective JS variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
//Audio that will play on recieving meassages.
var audio = new Audio('pristine.mp3');
//Function which will append to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {

        audio.play();

    }






}












//if form gets submitted send server the message.
form.addEventListener('submit', (e) => {


    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''





})


//Ask new user for her/his name and let the sever Know

const name = prompt("Enter your name to join");
if (name) {
    socket.emit('new-user-joined', name);
    //If the new user joines let the server know
    socket.on('user-joined', name => {
        append(`${name} joined the chat`, 'right')




    })
} else {

    alert("Please write your name");



}
//If server sends a message recieve it.
socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left')




})
//If the user leaves the chat append the info to the container
socket.on('left', name => {
    append(`${name} left the chat`, 'right')




})

