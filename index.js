const taskName = document.getElementById("taskName");
const description = document.getElementById("description");
const assignTo = document.getElementById("assignTo");
const dueDate = document.getElementById("dueDate");

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
    }
   
}