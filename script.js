document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");
  const span = document.getElementById("modal-span");

  function animateGlow() {
    let glowing = true;
    let glowIntensity = 0;

    setInterval(() => {
      if (glowing) {
        glowIntensity += 5;
        if (glowIntensity >= 100) glowing = false;
      } else {
        glowIntensity -= 5;
        if (glowIntensity <= 0) glowing = true;
      }

      taskInput.style.boxShadow = `0 0 ${
        glowIntensity / 10
      }px rgba(2, 255, 0, ${glowIntensity / 100})`;
    }, 50);
  }

  animateGlow();

  addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (
      taskText === "" ||
      taskList.getElementsByTagName("li").length > 4 ||
      taskText.length > 75
    ) {
      if (taskText === "") {
        span.textContent = "Минимальная длина заметки — 1 символ";
        document.getElementById("modal").classList.add("active");
      } else if (taskList.getElementsByTagName("li").length > 4) {
        span.textContent = "Максимальное кол-во заметок - 5";
        document.getElementById("modal").classList.add("active");
      } else if (taskText.length > 75) {
        span.textContent = "Максимальное кол-во символов в заметке - 75";
        document.getElementById("modal").classList.add("active");
      }
      return;
    }

    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.style.cssText = `
        position: absolute;
        right: 10px;
        top: 10px;
        background: red;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
      `;
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
    taskInput.value = "";

    deleteButton.addEventListener("click", () => {
      taskItem.classList.add("removing");
      taskItem.addEventListener("animationend", () => {
        taskList.removeChild(taskItem);
      });
    });
  });
});

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("modal").classList.remove("active");
});
