const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');

// Load tasks and theme
window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToDOM(task.text, task.completed));
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
  }
};

// Theme toggle
themeToggle.onclick = () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
};

// Add task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return alert('Please enter a task!');
  addTaskToDOM(taskText, false);
  saveTasks();
  taskInput.value = '';
}

// Add task to DOM
function addTaskToDOM(taskText, completed) {
  const li = document.createElement('li');
  li.classList.toggle('completed', completed);

  li.innerHTML = `
    <span onclick="toggleTask(this)">${taskText}</span>
    <div>
      <button class="edit-btn" onclick="editTask(this)">Edit</button>
      <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    </div>
  `;

  taskList.appendChild(li);
}

// Toggle task complete
function toggleTask(taskElement) {
  taskElement.parentElement.classList.toggle('completed');
  saveTasks();
}

// Delete task
function deleteTask(btn) {
  btn.parentElement.parentElement.remove();
  saveTasks();
}

// Edit task
function editTask(btn) {
  const li = btn.parentElement.parentElement;
  const span = li.querySelector('span');
  const oldText = span.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = oldText;
  input.style.flex = '1';
  input.onblur = () => {
    span.textContent = input.value;
    span.style.display = 'block';
    input.remove();
    saveTasks();
  };
  span.style.display = 'none';
  li.insertBefore(input, li.firstChild);
  input.focus();
}

// Save to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
