document.addEventListener("DOMContentLoaded", () => {
  const inputArea = document.getElementById("inputArea");
  const button = document.getElementById("addBtn");
  const tasksContainer = document.getElementById("tasks-container");
  const inProgressContainer = document.getElementById("in-progress");
  const finishedContainer = document.getElementById("finished");

  function inputLength() {
    return inputArea.value.length;
  }

  let taskId = 0;

  function createTaskElement(text) {
    const li = document.createElement("li");
    li.textContent = text;
    li.setAttribute("draggable", "true");
    li.setAttribute("id", "task-" + taskId++);
    li.style.marginLeft = "20px";

    function crossOut() {
      li.classList.toggle("done");
    }

    li.addEventListener("click", crossOut);

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("X"));
    li.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", deleteListItem);

    function deleteListItem() {
      li.classList.add("delete");
    }

    return li;
  }

  function addTaskToList(list, taskElement) {
    list.appendChild(taskElement);
    taskElement.addEventListener("dragstart", dragStart);
    taskElement.addEventListener("dragend", dragEnd);
  }

  function createListElement() {
    const taskText = inputArea.value.trim();
    if (taskText.length > 0) {
      const taskElement = createTaskElement(taskText);
      addTaskToList(tasksContainer, taskElement);
      inputArea.value = "";
    }
  }

  function addListAfterClick() {
    if (inputLength() > 0) {
      createListElement();
    }
  }

  function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.which === 13) {
      createListElement();
    }
  }

  button.addEventListener("click", addListAfterClick);
  inputArea.addEventListener("keypress", addListAfterKeypress);

  function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.target.classList.add("dragging");
  }

  function dragEnd(event) {
    event.target.classList.remove("dragging");
  }

  function allowDrop(event) {
    event.preventDefault();
  }

  function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    const taskElement = document.getElementById(taskId);
    const targetContainer = event.currentTarget;
    targetContainer.appendChild(taskElement);
  }

  tasksContainer.addEventListener("dragover", allowDrop);
  tasksContainer.addEventListener("drop", drop);

  inProgressContainer.addEventListener("dragover", allowDrop);
  inProgressContainer.addEventListener("drop", drop);

  finishedContainer.addEventListener("dragover", allowDrop);
  finishedContainer.addEventListener("drop", drop);
});
