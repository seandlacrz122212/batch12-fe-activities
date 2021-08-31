const form = document.querySelector(".js-to-do"),
input = document.querySelector(".js-add-to-do"),
list = document.querySelector(".js-list");

let toDos = [];

function showToDos() {
  const stringToDo = JSON.stringify(toDos); //make into strings
  localStorage.setItem("toDos", stringToDo);
}

function saveToDo(text) {
  const toDoObject = {
    id: toDos.length + 1, //  id : (this.todos.length || 0) + 1 // delete a task and add a new one
    value: text
  };
  toDos.push(toDoObject);
  showToDos();
}

//deleting lists
function handleDelete(event) {
  const target = event.target; //returns which DOM element triggered the event
  const li = target.parentElement;
  const ul = li.parentElement; 
  const toDoId = li.id;
  ul.removeChild(li);                             //remove lists if needed

                              toDos = toDos.filter(function(toDo) { //remove lists if needed
                                 return toDo.id !== parseInt(toDoId); // returns an integer
                                 });
  showToDos();
}

// add lists
function addToDo(text) {
  const toDo = document.createElement("li");
  toDo.className = "toDo";
  toDo.id = toDos.length + 1;
  const deleteBtn = document.createElement("span");
  deleteBtn.innerHTML = "&#x274E"; //icon 
  deleteBtn.className = "toDo__button";
  deleteBtn.addEventListener("click", handleDelete);
  const label = document.createElement("label");
  label.innerHTML = text;
  toDo.appendChild(deleteBtn);
  toDo.appendChild(label);
  list.appendChild(toDo);
  saveToDo(text);
}

//submit
function onSubmit(event) {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addToDo(value);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem("toDos");
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); //parses a JSON string 
    parsedToDos.forEach(function(toDo) {
      addToDo(toDo.value);
    });
  }
  return;
}

function init() {
  loadToDos();
}

form.addEventListener("submit", onSubmit);

init();