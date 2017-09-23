const item = document.querySelector('.item');
const plus = document.querySelector('.glyphicon-pencil');
const toDo = document.querySelector('.toDo');


document.getElementById('todoForm').addEventListener('submit', addItem);;
plus.addEventListener('click', addItem);

plus.addEventListener('mouseover', function() {
  this.classList.add('pen-color');
})

plus.addEventListener('mouseout', function() {
  this.classList.remove('pen-color');
})


function dateAdded() {
  const current = new Date();
  return (current.getDate()
                  + "/" +(current.getMonth()+1)
                  + "/" +current.getFullYear()
                  + " @ " +current.getHours()
                  + ":"   +current.getMinutes()
                  + ":"   +current.getSeconds());
}

function addItem(e) {
  if (item.value == '') {
    alert('Do what?');
    return;
  }

  if (localStorage.getItem('todos') === null) {
  var  todos =[];
    todos.push(item.value);
    localStorage.setItem('todos', JSON.stringify(todos));
    return
  }
  const task = {
    name: item.value,
    added: dateAdded()
  };

  var todos = JSON.parse(localStorage.getItem('todos'));
  todos.unshift(task);
  localStorage.setItem('todos', JSON.stringify(todos));
  /*li = document.createElement('li');
  li.appendChild(document.createTextNode(item.value));
  toDo.appendChild(li);*/
  document.getElementById('todoForm').reset();
  fetchList();
}

function doneItem(num) {
  todos = JSON.parse(localStorage.getItem('todos'));
  todos.splice(num,1);
  localStorage.setItem('todos', JSON.stringify(todos))
  fetchList();
}

function fetchList() {

  if (localStorage.getItem('todos') === null) {
  //var  todos =[];
    //todos.push(item.value);
    //localStorage.setItem('todos', JSON.stringify(todos));
    toDo.innerHTML = 'Put your to-do lists here';
    return
  }

  var todos = JSON.parse(localStorage.getItem('todos'));

  toDo.innerHTML = '';

  for (var i = 0; i < todos.length; i++){
    toDo.innerHTML += `<div class="task-item"><span class="added">added: ${todos[i].added}</span> <span class="task-name">${todos[i].name}</span> <a onClick="doneItem(${i})" href="#"><span class="glyphicon glyphicon-ok"></span><a></div> `
  }

  const taskItem = Array.from(document.querySelectorAll('.task-item'));

  taskItem.forEach(task => task.addEventListener('mouseover', recolor));
  taskItem.forEach(task => task.addEventListener('mouseout', normal));



  function recolor() {
    this.classList.add('recolor');
  }

  function normal() {
    this.classList.remove('recolor');
  }
}
