
let task = document.querySelector(".inp");
let sub = document.querySelector(".sub");
let taksDiv = document.querySelector(".task-holder");
let j = 1;


let array = [];
if (localStorage.getItem("tasks")){
  array = JSON.parse(localStorage.getItem("tasks"))
}

getItems()

sub.onclick = function () {
  if (task.value !== "") {
    addToArray(task.value);
    task.value = "";
  }
};
function addToArray(inputValue) {
  let obj = {
    id: Date.now(),
    title: inputValue,
    completed: false,
  };
  array.push(obj);

  addItems(array);
  addToLocalStorage(array)

}
function addItems(arrayOfTasks) {
  taksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    //create main div
    let div = document.createElement("div");
    div.className = "tsk";
    if (task.completed) {
      div.className = "tsk done";
    }
    div.setAttribute("data-id", task.id);
    // create paragraphe with task value
    let txt = document.createTextNode(task.title);
    let p = document.createElement("p");
    p.append(txt);
    let inp = document.createElement("input");
    //input delete creating
    inp.setAttribute("type", "button");
    inp.value = "Delete";
    inp.className = "delete";
    div.append(p, inp);
    //add main div to task holder
    taksDiv.append(div);
  });
}
  


function addToLocalStorage(array) {
  localStorage.setItem("tasks", JSON.stringify(array))
}

function getItems(){
  let data = localStorage.getItem("tasks")
  if (data) {
    let tasks = JSON.parse(data)
    addItems(tasks)
  }
}
let dlt = document.querySelector(".delete");
taksDiv.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")){
    e.target.parentElement.remove();
    deleteFromLocal(e.target.parentElement.getAttribute("data-id"))
  }
  if(e.target.classList.contains("tsk")){
    completeDone(e.target.getAttribute("data-id"))
    e.target.classList.toggle("done")
  }
});
function deleteFromLocal(taskId){
  array = array.filter((task) => task.id != taskId )
  addToLocalStorage(array)
}
function completeDone(taskid){
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == taskid){
      array[i].completed == false ? array[i].completed = true : array[i].completed = false
    }
    addToLocalStorage(array)
  }
}
