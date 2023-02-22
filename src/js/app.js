export default class App {
  constructor() {
    this.tasks = [];
    this.todoList = document.querySelector(".todo-list");
  }

  start() {
    this.toggleMainFooter();

    this.activateEvents();
  }

  toggleMainFooter() {
    const main = document.querySelector("#main");
    const footer = document.querySelector("#footer");
    if (this.tasks.length === 0) {
      main.classList.add("hidden");
      footer.classList.add("hidden");
    } else {
      main.classList.remove("hidden");
      footer.classList.remove("hidden");
    }
  }

  activateEvents() {
    this.addNewTask();
  }

  addNewTask() {
    const newTodo = document.querySelector(".new-todo");

    newTodo.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && e.target.value !== "") {
        const id = this.createNewTask(e.target.value.trim());
        newTodo.value = "";

        this.toggleMainFooter();
        this.todoList.append(this.newTaskElement(this.tasks[id]));

        // Set the Local Storage
        this.setLocalStorage();

        this.modifyCounter();
      }
    });
  }

  newTaskElement(task) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div class="view">
        <input class="toggle" type="checkbox" ${
          task.completed ? "checked" : ""
        }/>
        <label>${task.task}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${task.task}" />
    `;

    // Event to check the task
    const check = listItem.querySelector(".toggle");
    check.addEventListener("click", () => {
      listItem.classList.toggle("completed");
      task.completed = !task.completed;
    });

    // Event to Edit the task
    const label = listItem.querySelector("label");
    const editInput = listItem.querySelector(".edit");

    label.addEventListener("dblclick", () => {
      listItem.classList.add("editing");
      editInput.focus();
    });

    editInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        label.textContent = e.target.value;
        task.task = e.target.value.trim();
        listItem.classList.remove("editing");
      } else if (e.key === "Escape") {
        e.target.value = task.task;
        listItem.classList.remove("editing");
      }
    });

    return listItem;
  }

  createNewTask(task) {
    const id = this.tasks.length;
    this.tasks.push({
      id,
      task,
      completed: false,
    });

    return id;
  }

  setLocalStorage() {
    localStorage.setItem("mydayapp-js", JSON.stringify(this.tasks));
  }

  modifyCounter() {
    const todoCount = document.querySelector(".todo-count");
    const counter = this.tasks.filter((task) => !task.completed).length;

    todoCount.innerHTML =
      counter !== 1
        ? todoCount.innerHTML.replace("item ", "items ")
        : todoCount.innerHTML.replace("items ", "item ");

    const todoCountNumber = document.querySelector(".todo-count strong");

    todoCountNumber.textContent = this.tasks.filter(
      (task) => !task.completed
    ).length;
  }
}
