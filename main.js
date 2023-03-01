// OPEN ARRAY
let tasks = [];

// INITIATION FUNCTION ------------------------------------------------------------

function init() {
  loadTasksFromLocalStorage();
  renderTasks();
}

// SAVE TO LOCAL ------------------------------------------------------------------

function saveTasksToLocalStorage() {
  const json = JSON.stringify(tasks);
  localStorage.setItem("myTasks", json);
}

// LOAD FROM LOCAL ----------------------------------------------------------------

function loadTasksFromLocalStorage() {
  const json = localStorage.getItem("myTasks");
  const saved = JSON.parse(json);
  if (!saved) return;
  tasks = saved;
}

// RENDER OLD TASKS --------------------------------------------------------------

function renderTasks() {
  for (let task of tasks) {
    renderTask(task);
  }
}

// CREATE NEW TASK FROM USER -------------------------------------------------------

function createTask() {
  event.preventDefault();

  const infoTextBox = document.getElementById("infoTextBox");
  const dateBox = document.getElementById("dateBox");
  const timeBox = document.getElementById("timeBox");

  const task = {
    id: Date.now(),
    info: infoTextBox.value,
    date: dateBox.value,
    time: timeBox.value,
  };

  tasks.push(task);
  saveTasksToLocalStorage();
  renderTask(task, true);
}

// RENDER NEW TASK FROM USER --------------------------------------------------------

function renderTask(task, fadeIn) {
  const taskElement = document.createElement("div");
  taskElement.className = "card";
  taskElement.id = task.id;
  taskElement.innerHTML = `<button class="removeBtn" onclick="removeTask(${task.id})">
  <i class="glyphicon glyphicon-remove"></i>
  </button>
    <p id="taskInfoP">Task Info:</p>
      <p class="infoP">${task.info}</p>
      <p class="dateP">${task.date}</p> 
      <p class="timeP">${task.time}</p>`;

  document.getElementById("cardDiv").appendChild(taskElement);

  if (fadeIn) {
    taskElement.classList.add("fade-in");
  }
  clearInput();
}

// CLEAR FORM  ---------------------------------------------------------------------

function clearInput() {
  infoTextBox.value = "";
  dateBox.value = "";
  timeBox.value = "";
  infoTextBox.focus();
}

// REMOVE TASK FROM ARRAY ----------------------------------------------------------

function removeTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) return;

  tasks.splice(taskIndex, 1);
  saveTasksToLocalStorage();
  removeElement(id);
}

function removeElement(id) {
  const elementToRemove = document.getElementById(id);
  if (!elementToRemove) return;
  elementToRemove.parentElement.removeChild(elementToRemove);
}

// SET MIN DATE ---------------------------------------------------------------------

var date = new Date();
var dd = date.getDate();
var mm = date.getMonth() + 1;
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
var yyyy = date.getFullYear();
var minDate = yyyy + "-" + mm + "-" + dd;
document.getElementById("dateBox").setAttribute("min", minDate);
