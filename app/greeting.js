//const nameContainer = document.querySelector(".js-form form"); 
 
//var username = prompt("What's your name?", "")
//document.write("Hello " + username + " ,how are you today?")


const nameContainer = document.querySelector(".js-name");


function showName(name) {
  nameContainer.innerHTML = "";

  const title = document.createElement("span");
  title.className = "name__text";
  title.innerHTML = `Hi ${name}! How are you today?`;    // span/text

  nameContainer.appendChild(title);
}


function handleSubmit(event) {
  //event.preventDefault();
  //event.cancelable 
  // Remove default event (refresh)?

  const form = event.target;  
  const input = form.querySelector("input");
  const value = input.value;

  // save value in local storage
  localStorage.setItem("username", value);

  showName(value);
}

//no name
function showInput() {

  const input = document.createElement("input");
  input.placeholder = "What's your name?";
  input.type = "text";
  input.style.textAlign = "center";
  input.className = "name__input";

  // submit
  const form = document.createElement("form");
  form.addEventListener("submit", handleSubmit);

  // put input tag inside
  form.appendChild(input);

  nameContainer.appendChild(form);
}

//get username saved in storage
function loadName() {

  const name = localStorage.getItem("username");

  if (name === null) {  // no name
    showInput();
  } else {              // print name
    showName(name);
  }
}

//initialize 
function init() {
  loadName();
}

init();