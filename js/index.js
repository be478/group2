let taskManager = new TaskManager();
//  Load and render saved tasks if any
taskManager.load();
taskManager.render();

function submitFunction() {
  //  Select Form Elements 
  const newTaskNameInput = document.querySelector('#newTaskNameInput');
  const newDescriptionInput = document.querySelector('#newDescriptionInput');
  const newAssignedToInput = document.querySelector('#newAssignedToInput');
  const newDueDateInput = document.querySelector('#newDueDateInput');
  const warning = document.querySelector('#warning');


  //  Save Values
  const taskName = newTaskNameInput.value;
  const description = newDescriptionInput.value;
  const assign = newAssignedToInput.value;
  const dueDate = newDueDateInput.value;


  //  Validate Form
  const formFilled = validFormFieldInput(taskName, description, assign, dueDate);
  
  
  //  If form valid, hide warning, add task to array, reset form
  if (formFilled) {
    warning.style.display = 'none';
    //  Add task to task array
    taskManager.addTask(taskName, description, assign, dueDate);
    taskManager.save();

    //  Save task array to localStorage
    taskManager.save();
    taskManager.render();


    //  TESTING
    //console.log(taskManager.tasks);
    //const taskHtml = createTaskHtml(taskManager.tasks[0].name, taskManager.tasks[0].description, taskManager.tasks[0].assign, taskManager.tasks[0].dueDate, taskManager.tasks[0].status);
    //console.log(taskHtml);


    //  Resets input fields after submit
    document.getElementById("form").reset();

    //  Render task list in html after submit
    taskManager.render();
    
  } else {
    warning.style.display = 'block';
  }
}




function validFormFieldInput(taskName, description, assign, dueDate) {
  if (taskName && description && assign && dueDate) {
    return true;
  } else {
    return false;
  }
}


// LISTEN FOR SUBMIT BUTTON CLICK
const submitButton = document.querySelector('#submitButton');
submitButton.addEventListener('click', submitFunction);

// LISTEN FOR TASK LIST BUTTONS
const taskList = document.querySelector('#task-list');
taskList.addEventListener('click', (event) => { 
  if(event.target.classList.contains('done-button')) {
    //  Find <li> parent element that holds card
    const parentTask = event.target.parentElement.parentElement;

    //  Find id number in <li> of card that was marked as done
    const taskId = Number(parentTask.dataset.taskId);

    //  Get task associated with that id
    const task = taskManager.getTaskById(taskId);

    //  Update task status to done, save, render
    task.stat = 'DONE'
    
    taskManager.save();
    taskManager.render();
    
  }
  if(event.target.classList.contains('delete-button')) {
    //  Find <li> parent element that holds card
    const parentTask = event.target.parentElement.parentElement;

    //  Find id number in <li> of card that was marked as done
    const taskId = Number(parentTask.dataset.taskId);

    //  Pass taskId to deleteTask method
    taskManager.deleteTask(taskId);

    //  Save and render new task list
    taskManager.save();
    taskManager.render();
  }
});

// LISTEN FOR COMPLETE LIST BUTTONS
const completeList = document.querySelector('#complete-list');
completeList.addEventListener('click', (event) => { 

  if(event.target.classList.contains('delete-button')) {
    //  Find <li> parent element that holds card
    const parentTask = event.target.parentElement.parentElement;

    //  Find id number in <li> of card that was marked as done
    const taskId = Number(parentTask.dataset.taskId);

    //  Pass taskId to deleteTask method
    taskManager.deleteTask(taskId);

    //  Save and render new task list
    taskManager.save();
    taskManager.render();
  }
});
