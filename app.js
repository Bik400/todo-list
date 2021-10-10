//Selectors
const addProject = document.querySelector(".add-project");
const addTask = document.querySelector(".add-task");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const filterOption = document.querySelector(".todo-filter");

//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
addTask.addEventListener("click", addTaskItem);
todoList.addEventListener("click", deleteTaskItem);
todoList.addEventListener("click", taskComplete);
filterOption.addEventListener("change", filterTodo);


//Functions
function addTaskItem(event) {
    // prevent user from submitting
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoDiv");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    //Save todo to local storage
    saveLocalTodos(todoInput.value); 

    //Create a date selection

    const completeButton = document.createElement("button");
    completeButton.innerHTML = "<i class='fas fa-check-square'></i>";
    completeButton.classList.add("complete-button");

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
    deleteButton.classList.add("delete-button");

    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completeButton);
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
    
    //clear input value 
    todoInput.value = "";

}

function taskComplete(e) {
    const item = e.target;
    if (item.classList.contains("complete-button")) {
        const todo = item.parentElement;
        todo.classList.add("completed");
    }

}

function deleteTaskItem(e) {
    const item = e.target;
    if (item.classList.contains("delete-button")) {
        const todo = item.parentElement;
        todo.remove();
        removeLocalStorageTodos(todo);
    }
}

// todo div is getting class "completed"

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(e.target.value);
    todos.forEach((todo) => {
        console.log(todo);
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";    
                break;
            case "completed":
                if (todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
    
} 


function saveLocalTodos(todo) {
    let todos;

    if (window.localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;

    if (window.localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach((todo) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todoDiv");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");

        const completeButton = document.createElement("button");
        completeButton.innerHTML = "<i class='fas fa-check-square'></i>";
        completeButton.classList.add("complete-button");

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
        deleteButton.classList.add("delete-button");

        todoDiv.appendChild(newTodo);
        todoDiv.appendChild(completeButton);
        todoDiv.appendChild(deleteButton);

        todoList.appendChild(todoDiv);
    })
}
    
function removeLocalStorageTodos(todo) {
    let todos;

    if (window.localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    if (todos.indexOf(todo.children[0].innerText) !== -1) {
        index = todo.children[0].innerText;
        todos.splice(todos.indexOf(index), 1);
    } 

    localStorage.setItem("todos", JSON.stringify(todos));
}
