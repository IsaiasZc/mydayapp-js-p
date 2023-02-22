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
        this.todoList.innerHTML += this.newTaskElement(this.tasks[id]);

        // Set the Local Storage
        this.setLocalStorage();

        this.modifyCounter();
      }
    });
  }

  newTaskElement(task) {
    return `
    <li>
      <div class="view">
        <input class="toggle" type="checkbox" ${
          task.completed ? "checked" : ""
        }/>
        <label>${task.task}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${task.task}" />
    </li>
    `;
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
    const todoCount = document.querySelector(".todo-count strong");

    todoCount.textContent = this.tasks.filter((task) => !task.completed).length;
  }
}
