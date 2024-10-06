document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');
  const sortAscBtn = document.getElementById('sort-asc');
  const sortDescBtn = document.getElementById('sort-desc');

  const tasks = [];

  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const newTaskDescription = document.getElementById('new-task-description').value;
    const user = document.getElementById('user').value;
    const duration = document.getElementById('duration').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;

    // Create a new task object
    const newTask = {
      description: newTaskDescription,
      user: user,
      duration: duration,
      dueDate: dueDate,
      priority: priority
    };

    tasks.push(newTask);

    renderTasks();

    // Reset the form
    taskForm.reset();
  });

  // Function to render tasks to the DOM
  function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${task.description}</strong> - User: ${task.user}, 
        Duration: ${task.duration}h, Due: ${task.dueDate}, Priority: ${task.priority}
        <button class="delete-btn" data-index="${index}">Delete</button>
        <button class="edit-btn" data-index="${index}">Edit</button>
        <label>
          <input type="checkbox" class="status-checkbox" data-index="${index}">
          Completed
        </label>
      `;

      // Set task color based on priority
      if (task.priority === 'high') {
        li.style.color = 'red';
      } else if (task.priority === 'medium') {
        li.style.color = 'yellow';
      } else {
        li.style.color = 'green';
      }

      taskList.appendChild(li);
    });

    // Add delete and edit functionality
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        tasks.splice(index, 1);
        renderTasks();
      });
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        const task = tasks[index];
        document.getElementById('new-task-description').value = task.description;
        document.getElementById('user').value = task.user;
        document.getElementById('duration').value = task.duration;
        document.getElementById('due-date').value = task.dueDate;
        document.getElementById('priority').value = task.priority;
        tasks.splice(index, 1);
      });
    });

    // Toggle task completion status
    document.querySelectorAll('.status-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const index = e.target.getAttribute('data-index');
        const li = e.target.parentElement.parentElement;
        if (e.target.checked) {
          li.style.textDecoration = 'line-through';
        } else {
          li.style.textDecoration = 'none';
        }
      });
    });
  }

  // Sorting by priority
  function sortTasks(order) {
    tasks.sort((a, b) => {
      const priorityLevels = { high: 1, medium: 2, low: 3 };
      if (order === 'asc') {
        return priorityLevels[a.priority] - priorityLevels[b.priority];
      } else {
        return priorityLevels[b.priority] - priorityLevels[a.priority];
      }
    });
    renderTasks();
  }

  sortAscBtn.addEventListener('click', () => sortTasks('asc'));
  sortDescBtn.addEventListener('click', () => sortTasks('desc'));
});