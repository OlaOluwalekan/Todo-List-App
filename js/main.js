console.log('hello');

// EVENTS WHEN THE BROESER LOADS

let todoListDisplay = document.querySelector('.to-do-list');

window.onload = () => {
  let storedTopics = localStorage.getItem('storedTopics');
  let storedDescriptions = localStorage.getItem('storedDescriptions');
  splitTopics = storedTopics.split(',');
  splitDescriptions = storedDescriptions.split(',');

  for(let i = 0; i < splitTopics.length; i++) {
    todoListTopic.push(splitTopics[i]);
    todoListDescription.push(splitDescriptions[i]);
  }
  // console.log(todoListTopic);
  // console.log(todoListDescription);

  for(let i = 0; i < todoListTopic.length; i++) {
    const todoListDiv = document.createElement('div');

    const topic = document.createElement('h3');
    const topicText = document.createTextNode(todoListTopic[i]);
    topic.appendChild(topicText);
    todoListDiv.appendChild(topic);

    const description = document.createElement('p');
    const descriptionText = document.createTextNode(todoListDescription[i]);
    description.appendChild(descriptionText);
    todoListDiv.appendChild(description);

    
    const todoExtras = document.createElement('div');
    
    const createdTime = document.createElement('p');
    const createdTimetext = document.createTextNode('9:45pm');
    createdTime.appendChild(createdTimetext);
    todoExtras.appendChild(createdTime);
    todoListDiv.appendChild(todoExtras)
    
    const editDelete = document.createElement('div');
    const edit = document.createElement('div');
    const deleted = document.createElement('div');
    const editIcon = document.createElement('i');
    const deleteIcon = document.createElement('i');

    edit.appendChild(editIcon);
    editDelete.appendChild(edit);

    deleted.appendChild(deleteIcon);
    editDelete.appendChild(deleted);

    todoExtras.appendChild(editDelete);

    todoListDisplay.appendChild(todoListDiv);

    todoListDiv.classList.add('item-list');
    topic.classList.add('todo-topic');
    description.classList.add('todo-details');
    todoExtras.classList.add('todo-extras');
    createdTime.classList.add('created-time');
    editIcon.classList.add('fas', 'fa-edit');
    deleteIcon.classList.add('fas', 'fa-trash');
    edit.classList.add('edit');
    deleted.classList.add('delete');
    editDelete.classList.add('edit-delete');

    deleted.id = i;
    edit.id = i;

    deleted.setAttribute("onclick", "deleteItem(this)");
    edit.setAttribute("onclick", "editItem(this)");
  }
}

// TO DELETE TODO ITEMS FROM THE LIST
function deleteItem(item) {
  todoListTopic.splice(item.id, 1);
  todoListDescription.splice(item.id, 1);
  JSON.stringify(localStorage.setItem('storedTopics', todoListTopic));
  JSON.stringify(localStorage.setItem('storedDescriptions', todoListDescription));
  window.location.reload();
}

function editItem(item) {
  
  todoTopic.value = todoListTopic[item.id];
  todoDescription.value = todoListDescription[item.id];
  todoDialog.style.display = 'flex';
  fabBtn.style.display = 'none';
  addBtn.innerHTML = 'Update';
  addBtn.id = 'updateBtn';
  // addBtn.setAttribute("onclick", "updateItem()");
  let updateId = item.id;
  // console.log(item);
  console.log(updateId);

  addBtn.onclick = () => {
    // console.log(item);
    todoListTopic[item.id] = todoTopic.value;
    todoListDescription[item.id] = todoDescription.value;
    console.log(todoListTopic);
    JSON.stringify(localStorage.setItem('storedTopics', todoListTopic));
    JSON.stringify(localStorage.setItem('storedDescriptions', todoListDescription));
    alert('updated');
    window.location.reload();
  }
  
  // function updateItem() {
  //   // todoListTopic[thisId] = todoTopic.value;
  //   // todoListDescription[thisId] = todoDescription.value;
  // }
  // return updateId;
  // window.location.reload();
  // setTimeout(showDialog, 5000);
  // console.log(item.id);
}


// ADDING ON HOVER EFFECTS TO ELEMENTS
let hoverElements = document.querySelectorAll('.on-hover');

for(let i = 0; i < hoverElements.length; i++) {
  hoverElements[i].setAttribute("onmouseover", "onHover(this)");
  hoverElements[i].setAttribute("onmouseout", "onHoverOut(this)");
}

function onHover(element) {
  element.style.transform = 'scale(1.2)';
}

function onHoverOut(element) {
  element.style.transform = 'scale(1.0)';
}

// FAB BUTTON CODE TO OPEN TODO LIST DIALOG
let fabBtn = document.querySelector('.fab-btn');
let todoDialog = document.querySelector('.todo-dialog');

fabBtn.addEventListener('click', () => {
  todoDialog.style.display = 'flex';
  fabBtn.style.display = 'none';
})

// TO CLOSE/CANCEL TODO DIALOG
let cancelBtn = document.getElementById('cancelBtn');

cancelBtn.onclick = () => {
  todoDialog.style.display = 'none';
  fabBtn.style.display = 'flex';
}

// ADD BUTTON TO ADD TO TODO LIST AND CLOSE DIALOG
let addBtn = document.getElementById('addBtn');
let todoTopic = document.getElementById('topic');
let todoDescription = document.getElementById('description');

const todoListTopic = [];
const todoListDescription = [];

addBtn.onclick = () => {
  let tTopic = todoTopic.value;
  let tDescription = todoDescription.value;
  todoListTopic.push(tTopic);
  todoListDescription.push(tDescription);
  JSON.stringify(localStorage.setItem('storedTopics', todoListTopic));
  JSON.stringify(localStorage.setItem('storedDescriptions', todoListDescription));
  alert('stored');
  window.location.reload();
  // console.log(todoListTopic);
  // console.log(todoListDescription);
  todoDialog.style.display = 'none';
  fabBtn.style.display = 'flex';
  console.log(addBtn.id);
}

