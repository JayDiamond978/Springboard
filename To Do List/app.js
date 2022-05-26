function addNewTask() {
    const newTask = document.querySelector("input[type=text]");
    const submitTaskButton = document.querySelector("button[type=submit]");
    const toDoList = document.querySelector("section > header");

    submitTaskButton.addEventListener("click", function(e){
        e.preventDefault();

        const newToDoSection = document.createElement("section");

        //Creates new checkbox
        const newToDoCheckBox = document.createElement("input");
        newToDoCheckBox.type = "checkbox";
        newToDoCheckBox.id = newTask.value;

        //Creates new label for new checkbox
        const newToDoLabel = document.createElement("label");
        newToDoLabel.textContent = newTask.value;
        newToDoLabel.setAttribute("for", newTask.value);

        const allCurrentTasksButtons = document.querySelectorAll(".toDoList > section > input");
        if (allCurrentTasksButtons.length === 0) { 
            newToDoSection.append(newToDoCheckBox, newToDoLabel);
            toDoList.parentElement.append(newToDoSection);
        } else {
            //Can't use const or let in the for of loop, "Uncaught ReferenceError: task is not defined"
            for (task of allCurrentTasksButtons) {
                console.log(newTask.value, task.id)
                } if(newTask.value != task.id) {
                    newToDoSection.append(newToDoCheckBox, newToDoLabel);
                    toDoList.parentElement.append(newToDoSection);
                }
            }
    })
}

function completeTask() {
    const toDoList = document.querySelector(".toDoList");
    toDoList.addEventListener("click", function(){
        const allTaskCheckBoxes = document.querySelectorAll(".toDoList > section > input");
        for (let taskCheckBox of allTaskCheckBoxes) {
            if (taskCheckBox.checked === true){
                taskCheckBox.parentElement.style.textDecorationLine = "line-through";
            } else {
                taskCheckBox.parentElement.style.textDecorationLine = "none";
            }
        }
    })
    
}

function removeCompletedTasks() {
    const toDoList = document.querySelector(".toDoList");
    toDoList.addEventListener("dblclick", function(e){
        const allTaskCheckBoxes = document.querySelectorAll(".toDoList > section > input");
        console.log(e.target);
        for (let taskCheckBox of allTaskCheckBoxes) {
            if (e.target.parentElement.style.textDecorationLine === "line-through"){
                e.target.parentElement.remove();
            }
        }
    })
    
}


function removeAllCompletedTasks() {
    const removeTasksButton = document.querySelector(".removeTasks");
    removeTasksButton.addEventListener("click", function(){
        const allTaskCheckBoxes = document.querySelectorAll(".toDoList > section > input");
        for (let taskCheckBox of allTaskCheckBoxes) {
            if (taskCheckBox.parentElement.style.textDecorationLine === "line-through"){
                taskCheckBox.parentElement.remove();
            }
        }
    })
}


function main() {
    addNewTask();
    completeTask();
    removeCompletedTasks();
    removeAllCompletedTasks();
}

main();