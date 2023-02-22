export default class App {
  constructor() {
    this.tasks = [];
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
      if (e.key === "Enter") {
        alert("hola");
      }
    });
  }

  createNewTask(task) {
    return {
      id: this.tasks.length,
      task,
      completed: false,
    };
  }
}
