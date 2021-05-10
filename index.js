const taskName = document.querySelector('#taskName');
const description = document.querySelector('#description');
const assignTo = document.querySelector('#assignTo');
const dueDate = document.querySelector('#DueDate');
function validFormFieldInput(){
    let errorMessages = [];
    const taskName1 = taskName.value;
    const description1 = description.value;
    const assignTo1 = assignTo.value;
    const dueDate1 = DueDate.value;
    if(taskName1 === '' || taskName1 === null){
        errorMessages.push("Please enter task name")
    }
    if(description1 === '' || description1 === null){
        errorMessages.push("Please write task description")
    }
    if(assignTo1 === '' || assignTo1 === null){
        errorMessages.push("Please enter assign to")
    }
    if(dueDate1 === '' || dueDate1 === null){
        errorMessages.push("Please select due date")
    }
    if(errorMessages.length > 0){
        let output = '';
        for(let i =0; i<errorMessages.length; i++){
            output += errorMessages[i]+'\n';
        }
       alert(output)
    }
}




