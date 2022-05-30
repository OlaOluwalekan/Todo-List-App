console.log('hello');

// EVENTS WHEN THE BROESER LOADS

let todoListDisplay = document.querySelector('.to-do-list');

const todoListTopic = [];
const todoListDescription = [];
const todoListCreationDate = [];
const todoListCreationTime = [];

window.onload = () => {
  let storedTopics = localStorage.getItem('storedTopics');
  let storedDescriptions = localStorage.getItem('storedDescriptions');
  let storedCreatedDate = localStorage.getItem('storedCreatedDate');
  let storedCreatedTime = localStorage.getItem('storedCreatedTime');

  if(storedTopics == "" && storedDescriptions == "") {
    todoListDisplay.innerHTML = '<h3>You do not have any item in the list. Click on the Floating Icon (+) ti add and item</h3>'
    todoListDisplay.style.display = 'flex';
    todoListDisplay.style.justifyContent = 'center';
    todoListDisplay.style.alignItems = 'center';
    todoListDisplay.style.textAlign = 'center';
  } else {
    splitTopics = storedTopics.split(',');
    splitDescriptions = storedDescriptions.split(',');
    splitDate = storedCreatedDate.split(',');
    splitTime = storedCreatedTime.split(',');
  
    for(let i = 0; i < splitTopics.length; i++) {
      todoListTopic.push(splitTopics[i]);
      todoListDescription.push(splitDescriptions[i]);
      todoListCreationDate.push(splitDate[i]);
      todoListCreationTime.push(splitTime[i]);
    }
  
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
      const createdTimetext = document.createTextNode("Created Date/Time: " + todoListCreationDate[i] + ", " + todoListCreationTime[i]);
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
      // deleteIcon.classList.add('on-hover');
      edit.classList.add('edit');
      deleted.classList.add('delete');
      editDelete.classList.add('edit-delete');
  
      deleted.id = i;
      edit.id = i;
  
      deleted.setAttribute("onclick", "deleteItem(this)");
      edit.setAttribute("onclick", "editItem(this)");
    }
  }
}

let confirmDialog = document.querySelector('.confirm-dialog');
let cancelConfirm = document.getElementById('cancelConfirm');
let proceedConfirm = document.getElementById('proceedConfirm');
let toastDiv = document.querySelector('.toast');
let toastMsgText = document.querySelector('.toast-msg');
let confirmHeader = document.querySelector('.confirm-header');
let toDelete = document.querySelector('.to-delete');

// TO DELETE TODO ITEMS FROM THE LIST
function deleteItem(item) {
  toDelete.innerHTML = todoListTopic[item.id].toUpperCase();
  toDelete.style.color = 'red';
  confirmDialog.style.display = 'flex';
  blurTodoList();
  
  cancelConfirm.onclick = () => {    
    confirmDialog.style.display = 'none';
    unblurTodoList();
  }

  proceedConfirm.onclick = () => {
    confirmDialog.style.display = 'none';
    todoListTopic.splice(item.id, 1);
    todoListDescription.splice(item.id, 1);
    todoListCreationDate.splice(item.id, 1);
    todoListCreationTime.splice(item.id, 1);
    JSON.stringify(localStorage.setItem('storedTopics', todoListTopic));
    JSON.stringify(localStorage.setItem('storedDescriptions', todoListDescription));
    JSON.stringify(localStorage.setItem('storedCreationDate', todoListCreationDate));
    JSON.stringify(localStorage.setItem('storedCreationTime', todoListCreationTime));
    toastMsg("Item Deleted");
    setTimeout(reloadWindow, 2000);
  }
}

function toastMsg(msg) {
  toastMsgText.innerHTML = msg;
  toastDiv.style.bottom = '20px';
  toastDiv.style.transition = 'all 0.3s linear';
}

function reloadWindow() {
  window.location.reload();
}

function editItem(item) {
  
  todoTopic.value = todoListTopic[item.id];
  todoDescription.value = todoListDescription[item.id];
  blurTodoList();
  todoDialog.style.display = 'flex';
  fabBtn.style.display = 'none';
  addBtn.innerHTML = 'Update';
  addBtn.id = 'updateBtn';
  let updateId = item.id;

  addBtn.onclick = () => {
    todoListTopic[item.id] = todoTopic.value;
    todoListDescription[item.id] = todoDescription.value;
    console.log(todoListTopic);
    JSON.stringify(localStorage.setItem('storedTopics', todoListTopic));
    JSON.stringify(localStorage.setItem('storedDescriptions', todoListDescription));
    // JSON.stringify(localStorage.setItem('storedDescriptions', todoListCreationDate));
    todoDialog.style.display = 'none';
    fabBtn.style.display = 'flex';
    toastMsg("Todo Item Updated");
    setTimeout(reloadWindow, 2000);
  }

}


// ADDING ON HOVER EFFECTS TO ELEMENTS
let hoverElements = document.querySelectorAll('.on-hover');

for(let i = 0; i < hoverElements.length; i++) {
  hoverElements[i].setAttribute("onmouseover", "onHover(this)");
  hoverElements[i].setAttribute("onmouseout", "onHoverOut(this)");
}

let toolTip = document.querySelector('.tool-tip');
let toolTipText = document.querySelector('.tool-tip-text');

function showToolTip(text, posTop, posLeft, tipWidth) {
  toolTipText.innerHTML = text;
  toolTip.style.top = posTop + "%";
  toolTip.style.left = posLeft + "%";
  toolTip.style.width = tipWidth + "px";
  toolTip.style.display = 'flex';
}

function hideToolTip() {
  toolTip.style.display = 'none';
}

function onHover(element) {
  element.style.transform = 'scale(1.2)';
  let elemClass = element.classList;
  if(element.classList.contains('view-icon')) {
    showToolTip("view - select the type of view of for the todo list", 0.7, 52, 100);
  } else if(element.classList.contains('sort-icon')) {
    showToolTip("Sort - sort the icons by time, name. etc", 7, 80, 70);
  } else if(element.classList.contains('settings-icon')) {
    showToolTip("Settings - Choose the theme for the screen either light or dark", 7, 77, 100);
  } /*else if(element.classList.contains('fa-trash')) {
    showToolTip("Settings - Choose the theme for the screen either light or dark", 7, 80, 100);
  }*/
}

function onHoverOut(element) {
  element.style.transform = 'scale(1.0)';
  hideToolTip();
}

// FAB BUTTON CODE TO OPEN TODO LIST DIALOG
let fabBtn = document.querySelector('.fab-btn');
let todoDialog = document.querySelector('.todo-dialog');

fabBtn.addEventListener('click', () => {
  todoDialog.style.display = 'flex';
  fabBtn.style.display = 'none';
  blurTodoList();
})

function blurTodoList() {
  todoListDisplay.style.opacity = '0.3';
}

function unblurTodoList() {
  todoListDisplay.style.opacity = '1';
}

// MEMU ICONS CLICKED
// let viewIcon = document.querySelector('.view-icon');
// let viewMenu = document.getElementById('view');

// viewIcon.onclick = () => {
//   viewMenu.style.display = 'flex';
// }

// TO CLOSE/CANCEL TODO DIALOG
let cancelBtn = document.getElementById('cancelBtn');

cancelBtn.onclick = () => {
  todoDialog.style.display = 'none';
  fabBtn.style.display = 'flex';
  unblurTodoList();

  todoTopic.value = '';
  todoDescription.value = '';

  window.location.reload();
}

// ADD BUTTON TO ADD TO TODO LIST AND CLOSE DIALOG
let addBtn = document.getElementById('addBtn');
let todoTopic = document.getElementById('topic');
let todoDescription = document.getElementById('description');
// let createdTime = document.querySelector('.created-time');

addBtn.onclick = () => {
  if(todoTopic.value == "" && todoDescription.value == "") {
    toastMsg("You need to add a topic OR a description");
  } else {
    fabClicked();
  }
}

const daysArr = ["Sunday", "Monday", "Tuesuday", "Wednesday", "Thursday", "Friday", "Saturday"];

function fabClicked() {
  let date = new Date();
  // let day = daysArr[date.getDay()];
  let tTopic = todoTopic.value;
  let tDescription = todoDescription.value;
  let createdDate = date.toLocaleDateString();
  let createdTime = date.toLocaleTimeString();
  todoListTopic.push(tTopic);
  todoListDescription.push(tDescription);
  todoListCreationDate.push(createdDate);
  todoListCreationTime.push(createdTime);
  JSON.stringify(localStorage.setItem('storedTopics', todoListTopic));
  JSON.stringify(localStorage.setItem('storedDescriptions', todoListDescription));
  JSON.stringify(localStorage.setItem('storedCreatedDate', todoListCreationDate));
  JSON.stringify(localStorage.setItem('storedCreatedTime', todoListCreationTime));
  // alert('stored');
  todoDialog.style.display = 'none';
  fabBtn.style.display = 'flex';
  toastMsg("Todo Item Added to List");
  setTimeout(reloadWindow, 2000);
}

