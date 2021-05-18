const createTaskHtml = (id, name, desc, assign, due, stat) => {
    let badgeStatus;
    let doneButtonHtml = '<button type="button" class="btn btn-success done-button">Mark as done</button>';
    if (stat == 'To Do') {
      badgeStatus = 'badge-warning';
    } else if (stat == 'DONE') {
      badgeStatus = 'badge-success';
      doneButtonHtml = '';
    }
    const html = `
    <li class="list-group-item bg-light card shadow-lg style="width: 10rem;" data-task-id = "${id}">
    <div class="card-body">
      <h4 class="card-title">${name}</h4>
      <!--Dropdown buttons-->
      <!-- <div class="dropdown float-right">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown button
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">To-Do</a>
          <a class="dropdown-item" href="#">In progress</a>
          <a class="dropdown-item" href="#">Review</a>
          <a class="dropdown-item" href="#">Complete</a>
        </div>
      </div> -->
      <h6 class="card-assignment">Description: ${desc}</h6>
      <h6 class="card-assignment">Assigned To: ${assign}</h6>
      <h6>Status: <span class="badge badge-secondary badge ${badgeStatus}">${stat}</span></h6>
      <h6 class="card-assignment text-right">Due: ${due}</h6>
      ${doneButtonHtml}
      <button type="button" class="btn btn-danger delete-button">Delete</button>
    </div>
  </li>`
  
    return html;
  };
  
  class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }
  
  
      //  Gets values from form, stores values in object, pushes to array
      addTask(name, desc, assign, due, stat = 'To Do') {
        this.currentId ++;
        const task = {
          id: this.currentId,
          name: name,
          desc: desc,
          assign: assign,
          due: due,
          stat: stat
        };
        this.tasks.push(task);
      }
  
  
      //  For every task in array, format date, create HTML card, and display in task-list
      render() {
        const tasksToDoList = [];
        const tasksCompleteList = [];
        this.tasks.forEach(task => {
          //  Create Date object from due date input
          const dueDate = new Date(task.due);
          //  Format the date
          const formattedDate = dueDate.toDateString();
          //  Create HTML string for current task
          const taskHtml = createTaskHtml(task.id, task.name, task.desc, task.assign, formattedDate, task.stat);
          //  Push HTML string to either To Do List or Complete List
          if (task.stat == 'To Do') {
            tasksToDoList.push(taskHtml);
          } else if (task.stat == 'DONE') {
            tasksCompleteList.push(taskHtml);
          }
        });
        //  Join all array elements with new line in between
        const taskToDo = tasksToDoList.join('\n');
        const taskComplete = tasksCompleteList.join('\n');
        //  Find class=task-list and complete-list in index.html and replace with our HTML string
        document.getElementById("task-list").innerHTML = taskToDo;
        document.getElementById("complete-list").innerHTML = taskComplete;
      }
  
  
      //  Return task based on DONE button that was pressed
      getTaskById(taskId) {
        let foundTask;
        this.tasks.forEach(task => {
          if (task.id == taskId) {
            foundTask = task;
          }
        });
        return foundTask;
      }
  
  
      //  Save this.tasks and this.currentId into JSON strings
      save() {
        const tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);
        const currentId = JSON.stringify(this.currentId);
        localStorage.setItem('currentId', currentId);
      }
  
  
      //  Convert JSON tasks and currentId to array and number
      load() {
        if (localStorage.getItem('tasks')) {
          const tasksJson = localStorage.getItem('tasks');
          this.tasks = JSON.parse(tasksJson);
        }
        if (localStorage.getItem('currentId')) {
          const currentId = localStorage.getItem('currentId');
          this.currentId = Number(currentId);
        }
      }
  
  
      //  Delete a task from the list
      deleteTask (taskId) {
        const newTasks = [];
        this.tasks.forEach(task => {
          if (task.id != taskId) {
            newTasks.push(task);
          }
          this.tasks = newTasks;
        });
      }
  
      load() {
        if (localStorage.getItem('tasks')) {
          const tasksJson = localStorage.getItem('tasks')
          this.tasks = JSON.parse(tasksJson);
        }
  
        if(localStorage.getItem('currentId')) {
          const currentId = localStorage.getItem('currentId')
          this.currentId = Number(currentId);
        }
      }
  
      deleteTask (taskId) {
        const newTasks = [];
        this.tasks.forEach(task => {
          if (task.id !== taskId) {
            newTasks.push(task);
            console.log(this.tasks);
          } 
          this.tasks = newTasks;       
           
        });
      }
  
      
  
  }
  

  
  
  