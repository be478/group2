const taskName = document.getElementById("task_name");
const description = document.getElementById("description");
const assignTo = document.getElementById("assign_to");
const dueDate = document.getElementById("due_date");

const taskCard = document.getElementById("task_card");

const nameSpan = document.getElementById("name-span");
const discSpan = document.getElementById("dsc-span");
const assignSpan = document.getElementById("asign-span");
const dateSpan = document.getElementById("date-span");

function validFormFieldInput(){
    
    if(taskName.value === '' || taskName.value === null){
        nameSpan.innerHTML = "Please enter task name"   
    }else if(description.value === '' || description.value === null){
      discSpan.innerHTML = "Please enter description"
    }else if(assignTo.value === '' || assignTo.value === null){
        assignSpan.innerHTML="Please enter assign to"
    }else if(dueDate.value === '' || dueDate.value === null){
        dateSpan.innerHTML = "Please enter date"
    }else{

    let newTask = createTaskObject(
        taskName.value,
        description.value,
        assignTo.value,
        dueDate.value
    );
    saveTask(newTask);
  }
}

// Creats new objeect 
const createTaskObject = (name, desc, ato, date) => {
  return {
    taskName: name,
    taskDesc: desc,
    assignedTo: ato,
    duedate: date,
    status:'TODO',
    buttonClass:'btn btn-danger btn-sm',
  };
};

// Add new task to localStorage 
function saveTask(newObject) {
  if (localStorage.getItem("tasksArrayLocalStorage") === null) {
    localStorage.setItem("tasksArrayLocalStorage", JSON.stringify([]));
    let pulledTasks = JSON.parse(
      localStorage.getItem("tasksArrayLocalStorage")
    );
    pulledTasks.push(newObject);
    localStorage.setItem(
      "tasksArrayLocalStorage",
      JSON.stringify(pulledTasks)
    );
  } else {
    let pulledTasks = JSON.parse(
      localStorage.getItem("tasksArrayLocalStorage")
    );
    pulledTasks.push(newObject);
    localStorage.setItem(
      "tasksArrayLocalStorage",
      JSON.stringify(pulledTasks)
    );
  }
  location.reload();
}

// display task lists from localstorage  
function displayTasks() {
  if (localStorage.getItem("tasksArrayLocalStorage") !== null) {
    let pulledTasks = JSON.parse(
      localStorage.getItem("tasksArrayLocalStorage")
    );

    let arrayLength = pulledTasks.length;
    let output = "";
    for (let i = arrayLength -1; i >=0; i--) {

      output += `
       <div class="card" style="width: 18rem">
            <div class="card-body">
              <div class="row">
                <div class="col-md-5">
                  <p>Name: ${pulledTasks[i].taskName}</p>
                </div>
                <div class="col-md-1">
                  <button type="button" class="btn btn-success">Status</button>
                  <button type="button" class="btn btn-dark" onclick="updateTask(${i})">Update</button>
                  <button type="button" class="btn btn-dark" onclick="deleteTask(${i})">Delete</button>
                </div>
              </div>
              <p>Description: ${pulledTasks[i].taskDesc}</p>
              <p>AssignedTo: ${pulledTasks[i].assignedTo}</p>
              <p>DueDate: ${pulledTasks[i].duedate}</p>
              <p>Status: ${pulledTasks[i].status}</p>
            </div>
          </div>
      `
    }
    taskCard.innerHTML = output;
  }

}

// Update a task 
function updateTask(index){
    let pulledTasks = JSON.parse(
        localStorage.getItem("tasksArrayLocalStorage")
      );
      let taskToUpdate = pulledTasks[index];

      let taskNameObj = taskToUpdate.taskName;
      let taskDescObj = taskToUpdate.taskDesc;
      let assignedToObj = taskToUpdate.assignedTo;
      let duedateObj = taskToUpdate.duedate;

      taskName.value = taskNameObj;
      description.value = taskDescObj;
      assignTo.value = assignedToObj;
      dueDate.value = duedateObj;

      pulledTasks.splice(index, 1);
      localStorage.setItem(
        "tasksArrayLocalStorage",
        JSON.stringify(pulledTasks)
      );
      
}

// Delete a task 
function deleteTask(index){
    var ask = confirm("Are you sure you want to delete?");
    if(ask){
      let pulledTasks = JSON.parse(
        localStorage.getItem("tasksArrayLocalStorage")
      );
      pulledTasks.splice(index, 1);
      localStorage.setItem(
        "tasksArrayLocalStorage",
        JSON.stringify(pulledTasks)
      );
    }
    location.reload();
    
}