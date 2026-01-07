const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');
const addBtn = document.getElementById('addBtn');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function render() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.done ? 'completed' : '';

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;
    text.onclick = () => {
      todo.done = !todo.done;
      save();
      render();
    };

    const del = document.createElement('span');
    del.className = 'delete';
    del.textContent = '✕';
    del.onclick = () => {
      todos.splice(index, 1);
      save();
      render();
    };

    li.appendChild(text);
    li.appendChild(del);
    list.appendChild(li);
  });
}

function addTodo() {
  if (!input.value.trim()) return;
  todos.push({ text: input.value, done: false });
  input.value = '';
  save();
  render();
}

addBtn.onclick = addTodo;
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTodo();
});

render();
