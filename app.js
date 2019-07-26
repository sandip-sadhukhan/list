// Get all Ui Var
console.clear();    
let task = document.getElementById('task');
let addTask=document.getElementById('addtask');
let taskItems=document.getElementById('taskitems');
let clearAll=document.getElementById('clearall');
//Add Event Listener
addalleventlistener();

//add event listener function
function addalleventlistener(){
    document.addEventListener('DOMContentLoaded',getallItems);
    task.addEventListener('keypress',returnkey);
    addTask.addEventListener('click',addmytask);
    document.addEventListener('click',deleteitem);
    clearAll.addEventListener('click',clearall);
}

//Get all items
function getallItems(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        let li=document.createElement('li');
        li.appendChild(document.createTextNode(task));
        let a=document.createElement('a');
        a.className='ml-2 delete-item text-danger';
        a.appendChild(document.createTextNode('x'));
        li.appendChild(a);
        // console.log(li);
        taskItems.appendChild(li);
    });
}

//Return Key
function returnkey(e){
   if(e.keyCode===13){
       addmytask();
   }
}

//Add My Task
function addmytask(){
    if(task.value===''){
        alert("Please Enter a Word!!");
    }else{

        let task = document.getElementById('task');
        let li=document.createElement('li');
        li.appendChild(document.createTextNode(task.value));
        let a=document.createElement('a');
        a.className='ml-2 delete-item text-danger';
        a.appendChild(document.createTextNode('x'));
        li.appendChild(a);
        // console.log(li);
        taskItems.appendChild(li);
        addtols(task.value);
        task.value='';
    }
}

//add to ls 
function addtols(task){
    // console.log(task);
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}

//Delect Items
function deleteitem(e){
    if(e.target.classList.contains('delete-item')){
        //Delete local storage
        removefromls(e.target.parentElement);
        e.target.parentElement.remove();
        
    }
}
function removefromls(tasklist){
    // console.log(tasklist.innerText);
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    newtasklist=tasklist.textContent.substring(0,tasklist.textContent.length-1);
    console.log(newtasklist);
    tasks.forEach(function(onetask, index){
        if(newtasklist=== onetask){
          tasks.splice(index, 1);
        }
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearall(){
    localStorage.clear();
    taskItems.innerHTML="";
}