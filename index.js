document.addEventListener("DOMContentLoaded", () => {
    const inputArea = document.getElementById("inputArea");
    const button = document.getElementById("addBtn");
    const list = document.getElementById("tasks-container");
  
    function inputLength() {
      return inputArea.value.length;
    }
  
    let x = 0;
  
    function createListElement() {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(inputArea.value));
      li.style.marginLeft = "20px";
      list.appendChild(li);
      li.setAttribute("draggable", "true");
      li.setAttribute("ondragstart", "drag(event)");
      li.setAttribute("id", "task-" + (x += 1));
      inputArea.value = "";
  
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
  
    function allowDrop(ev) {
      ev.preventDefault();
    }
  
    function drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    }
  
    function drop(ev) {
      ev.preventDefault();
      const data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
    }
  
    const inProgressContainer = document.getElementById("in-proccess");
    const finishedContainer = document.getElementById("finished");
  
    inProgressContainer.addEventListener("dragover", allowDrop);
    inProgressContainer.addEventListener("drop", drop);
  
    finishedContainer.addEventListener("dragover", allowDrop);
    finishedContainer.addEventListener("drop", drop);
  });
  