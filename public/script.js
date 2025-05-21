const list = document.getElementById('todo-list');
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const API_URL = '/api/todos';

async function fetchTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();
  list.innerHTML = '';
  todos.forEach(todo => addTodoToDOM(todo));
}

function addTodoToDOM(todo) {
  const li = document.createElement('li');
  li.textContent = todo.title;
  if (todo.completed) li.classList.add('completed');

  li.addEventListener('click', async () => {
    await fetch(`${API_URL}/${todo._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed })
    });
    fetchTodos();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = '❌';
  delBtn.onclick = async e => {
    e.stopPropagation();
    await fetch(`${API_URL}/${todo._id}`, { method: 'DELETE' });
    fetchTodos();
  };

  li.appendChild(delBtn);
  list.appendChild(li);
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const title = input.value.trim();
  if (title) {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    input.value = '';
    fetchTodos();
  }
});

fetchTodos();
