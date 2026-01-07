const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const statusText = document.getElementById('status');

let tasks = JSON.parse(localStorage.getItem('cyberTasks')) || [];

const saveToLocal = () => {
    localStorage.setItem('cyberTasks', JSON.stringify(tasks));
};

const renderTasks = () => {
    taskList.innerHTML = '';

    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (task.completed) li.classList.add('completed');
        
        li.innerHTML = `
            <span class="task-title">${task.text}</span>
            <div class="actions">
                <button class="btn-complete" onclick="toggleTask(${task.id})">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn-delete" onclick="deleteTask(${task.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        taskList.appendChild(li);
    });

    const n = tasks.length;
    statusText.innerText = `${n} ${n === 1 ? 
'active mission' : 'active missions'} in memory.`;
    saveToLocal();
};


const modal = document.getElementById('customModal');
const modalText = document.getElementById('modalText');

function showModal(message) {
    modalText.innerText = message;
    modal.style.display = 'flex'; 
}

function closeModal() {
    modal.style.display = 'none'; 
}

window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

const addTask = () => {
    const text = taskInput.value.trim();
    
    if (text === '') {
        showModal("Empty input field. Enter mission data."); 
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
};

window.toggleTask = (id) => {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
};

window.deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
};

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

document.addEventListener('DOMContentLoaded', renderTasks);