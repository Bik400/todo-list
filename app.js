//Selectors
const addProject = document.querySelector(".add-project");
const addTask = document.querySelector(".add-task");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const filterOption = document.querySelector(".todo-filter");

//Event listeners
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


    

