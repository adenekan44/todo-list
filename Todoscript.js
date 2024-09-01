// Selecting the DOM elements
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from Local Storage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to add a new task
function addTask(taskText = '', taskDate = '', taskTime = '', completed = false) {
    if (taskText === '') {
        taskText = taskInput.value.trim();
        taskDate = dateInput.value;
        taskTime = timeInput.value;
    }

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create new list item
    const li = document.createElement('li');

    // Create a checkbox for task completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', function () {
        toggleComplete(li, checkbox.checked);
    });

    // Create a span to hold the task text
    const span = document.createElement('span');
    span.textContent = `${taskText} (Due: ${taskDate} ${taskTime})`;
    if (completed) {
        span.style.textDecoration = 'line-through';
    }

    // Create an edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.classList.add('edit-btn');
    editBtn.onclick = function () {
        editTask(span, taskText, taskDate, taskTime);
    };

    // Create a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = function () {
        taskList.removeChild(li);
        removeTaskFromStorage(taskText);
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Save the task to Local Storage
    saveTaskToStorage(taskText, taskDate, taskTime, completed);

    // Clear the input fields
    taskInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
}

// Function to toggle task completion
function toggleComplete(li, isCompleted) {
    const taskText = li.querySelector('span').textContent;
    const tasks = getTasksFromStorage();

    tasks.forEach(task => {
        if (`${task.text} (Due: ${task.date} ${task.time})` === taskText) {
            task.completed = isCompleted;
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

    li.querySelector('span').style.textDecoration = isCompleted ? 'line-through' : 'none';
}

// Function to edit a task
function editTask(span, taskText, taskDate, taskTime) {
    const newTaskText = prompt("Edit task:", taskText);
    const newTaskDate = prompt("Edit date:", taskDate);
    const newTaskTime = prompt("Edit time:", taskTime);

    if (newTaskText === null || newTaskText.trim() === '') {
        return; // Do nothing if the prompt was canceled or the input is empty
    }

    const tasks = getTasksFromStorage();

    tasks.forEach(task => {
        if (task.text === taskText && task.date === taskDate && task.time === taskTime) {
            task.text = newTaskText.trim();
            task.date = newTaskDate;
            task.time = newTaskTime;
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    span.textContent = `${newTaskText.trim()} (Due: ${newTaskDate} ${newTaskTime})`;
}

// Function to save a task to Local Storage
function saveTaskToStorage(taskText, taskDate, taskTime, completed) {
    const tasks = getTasksFromStorage();
    tasks.push({ text: taskText, date: taskDate, time: taskTime, completed: completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove a task from Local Storage
function removeTaskFromStorage(taskText) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to get tasks from Local Storage
function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Function to load tasks from Local Storage on page load
function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => addTask(task.text, task.date, task.time, task.completed));
}

// Event listener for the Add Task button
addTaskBtn.addEventListener('click', addTask);

// Event listener for pressing "Enter" key
taskInput.add
