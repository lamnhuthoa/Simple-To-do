//Select Element
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

//Classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "text-decoration-line-through";

//Variables
let LIST, id;

//get item from localStorage
let data = localStorage.getItem("TODO");

//check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST); //load the list to the user interface
} else {
    //if the data is empty
    LIST = [];
    id = 0;
}

//load items to the user's interface
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the local storage
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

//Show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add a to do function

function addToDo(toDo, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="far ${DONE}" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="far fa-trash-alt" job="delete" id="${id}"></i>
                  </li>`;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//add items by add button
document.getElementById('addToDo').onclick = function () {
    const toDo = input.value;
    if (toDo) {
        addToDo(toDo);

        LIST.push({
            name: toDo,
            id: id,
            done: false,
            trash: false
        });

        localStorage.setItem("TODO", JSON.stringify(LIST));

        id++;
    }
    input.value = "";
}

//add items by enter key
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        //if the input isn't empty
        if (toDo) {
            addToDo(toDo);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            //add item to localStorage (this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

//complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created dynamically
list.addEventListener("click", function (event) {
    const element = event.target; //return the clicked element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

    //add item to localStorage (this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
})

//instruction
function showInstruction(){
    document.getElementById('closeIn').classList.remove('d-none');
    document.getElementById("welcome").innerHTML = 
    `
    <div style="background: #fff; position: fixed; top: 0; left: 0; height: 100vh; width: 100%; z-index: 99999">
        <p class="instruction-text">
            <span class="instruction-text-title">HOW TO USE <i class="fas fa-question"></i></span><br/>
            &bull; Type your To-do and click <i class="fas fa-plus-circle"></i> or press Enter<br/>
            &bull; You can also <i class="far fa-check-circle"></i> check or <i class="far fa-circle"></i> uncheck your To-do<br/>
            &bull; Click the <i class="far fa-trash-alt"></i> button to delete a To-do<br/>
            &bull; Click the <i class="fas fa-eraser"></i> button to delete the entire list<br/>
            &bull; The list won't be deleted when you refresh the page
        </p>
    
    </div>

    `
}

function closeInstruction(){
    document.getElementById('closeIn').classList.add('d-none');
    document.getElementById("welcome").innerHTML = 
    `
    <div></div>

    `
}