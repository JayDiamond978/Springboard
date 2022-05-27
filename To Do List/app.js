function loadPreservedData() {
    const toDoList = document.querySelector("section > header");
    const previousTasks = localStorage.getItem("saveCount");
    for (let i = 0; i < parseInt(previousTasks); i++ ) {
        let previousTask = JSON.parse(localStorage.getItem(`${i}`));

        //Section
        let toDoSection = document.createElement("section");
        if (previousTask.Completed === true) {
            toDoSection.style.textDecorationLine = "line-through";
        }

        //Checkbox
        let toDoCheckBox = document.createElement("input");
        toDoCheckBox.type = "checkbox";
        toDoCheckBox.id = previousTask.ID;
        if (previousTask.Completed === true) {
            toDoCheckBox.checked = true;
        }

        //Label
        let toDoLabel = document.createElement("label");
        toDoLabel.textContent = previousTask.ID;
        toDoLabel.setAttribute("for", previousTask.ID);

        toDoSection.append(toDoCheckBox, toDoLabel);
        toDoList.parentElement.append(toDoSection);
    }
}

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
                } if(newTask.value != task.id) {
                    newToDoSection.append(newToDoCheckBox, newToDoLabel);
                    toDoList.parentElement.append(newToDoSection);
                }
            }
        newTask.value = "";
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

function preserveData() {
    window.addEventListener("beforeunload", function() {
        const dataToSaveList = [];
        const allTaskLines = document.querySelectorAll(".toDoList > section");
        const allTaskBoxes = document.querySelectorAll(".toDoList > section > input");
    
        for (let i = 0; i < allTaskLines.length; i++) {
            if (allTaskLines[i].style.textDecorationLine === "line-through") {
                dataToSaveList.push({"ID" : `${allTaskBoxes[i].id}`, "Completed" : true});
            } else {
                dataToSaveList.push({"ID" : `${allTaskBoxes[i].id}`, "Completed" : false});
            }
        }
    
        for (let i = 0; i < dataToSaveList.length; i++) {
            localStorage.setItem(`${i}`, JSON.stringify(dataToSaveList[i]));
        }
    
        localStorage.setItem("saveCount", `${dataToSaveList.length}`);
    })
}

function main() {
    loadPreservedData();
    addNewTask();
    completeTask();
    removeCompletedTasks();
    removeAllCompletedTasks();
    preserveData();
}

main();
