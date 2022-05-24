//Select the section with an id of container without using querySelector.
const sectionByID = document.getElementById("container");

//Select the section with an id of container using querySelector.
const section = document.querySelector("section");

//Select all of the list items with a class of “second”.
const second = document.querySelectorAll(".second");

//Select a list item with a class of third, but only the list item inside of the ol tag.
const lastThird = document.querySelectorAll("ol>.third");

//Give the section with an id of container the text “Hello!”.
//sectionByID.textContent = "Hello!";

//Add the class main to the div with a class of footer.
const footerDiv = document.querySelector(".footer");
footerDiv.classList.add("main");

//Remove the class main on the div with a class of footer.
footerDiv.classList.remove("main");

//Create a new li element.
const newListElement = document.createElement("li");

//Give the li the text “four”.
newListElement.textContent = "four";

//Append the li to the ul element.
const unorderedListElement = document.querySelector("ul");
unorderedListElement.append(newListElement);

//Loop over all of the lis inside the ol tag and give them a background color of “green”.
const listedItemsInOrderedList = document.querySelectorAll("ol>li");
for (i of listedItemsInOrderedList){
    i.style.color = "rgb(0,255,0)";
}

//Remove the div with a class of footer
footerDiv.remove();