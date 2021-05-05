//Selectors ===========================================================
const input = document.querySelector(".to-do-item");
const btn = document.querySelector(".to-do-btn");
const list = document.querySelector(".to-do-list");
const filter = document.querySelector(".filter");

//Event Listeners ====================================================
//event listener to load data in local storage when page loads
document.addEventListener("DOMContentLoaded", getFrmLocalStorage);
btn.addEventListener("click", addToDo);
list.addEventListener("click", deleteComplete);
filter.addEventListener("click", filterTodo);

//Functions =============================================================
function addToDo(event) {
  //prevent form from submitting
  event.preventDefault();
  //todo DIV
  const div = document.createElement("div");
  div.classList.add("todo");
  //create LI
  const li = document.createElement("li");
  li.innerText = input.value;
  li.classList.add("todo-item");
  div.appendChild(li);

  //add todo to localstorage
  saveToLocalStorage(input.value);

  //completed button
  const compbtn = document.createElement("button");
  compbtn.innerHTML = '<i class="fas fa-check"></i>';
  compbtn.classList.add("complete-btn");
  div.appendChild(compbtn);
  //delete button
  const delbtn = document.createElement("button");
  delbtn.innerHTML = '<i class="fas fa-trash"></i>';
  delbtn.classList.add("delete-btn");
  div.appendChild(delbtn);
  //Append todo list
  list.appendChild(div);
  //Clear INPUT value after todo item has been appended
  input.value = "";
}

function deleteComplete(event) {
  //get the element that is being targeted
  const item = event.target;
  // get the whole appended element
  const todoitem = item.parentElement;
  //Delete todo
  if (item.classList[0] === "delete-btn") {
    //animation
    todoitem.classList.add("fall");
    //remove the div element when delete btn is clicked
    removeFrmLocalStorage(todoitem);
    todoitem.addEventListener("transitionend", function () {
      todoitem.remove();
    });
  }

  //check complete
  if (item.classList[0] === "complete-btn") {
    todoitem.classList.toggle("completed");
  }
}

function filterTodo(event) {
  //Get a collection of the <ul> element's child nodes which is the <div> with class todo that is being appended
  const todos = list.childNodes;
  todos.forEach(function (todo) {
    //get the value of each selected option
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "pending":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//======================= Save/Retrieve/Delete Data to/from Local Storage ==============================================
function saveToLocalStorage(todo) {
  //check if there are todos
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getFrmLocalStorage() {
  //check if there are todos
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //todo DIV
    const div = document.createElement("div");
    div.classList.add("todo");
    //create LI
    const li = document.createElement("li");
    li.innerText = todo;
    li.classList.add("todo-item");
    div.appendChild(li);

    //completed button
    const compbtn = document.createElement("button");
    compbtn.innerHTML = '<i class="fas fa-check"></i>';
    compbtn.classList.add("complete-btn");
    div.appendChild(compbtn);
    //delete button
    const delbtn = document.createElement("button");
    delbtn.innerHTML = '<i class="fas fa-trash"></i>';
    delbtn.classList.add("delete-btn");
    div.appendChild(delbtn);
    //Append todo list
    list.appendChild(div);
  });
}

function removeFrmLocalStorage(todo) {
  //check if there are todos
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todo);
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// next step is to display completed items with line striked through when page reloads
// create another index of local storage to save completed items
