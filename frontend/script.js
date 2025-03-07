fetch('http://backend:3000/todos')
    .then(response => response.json())
    .then(todos => {
        const todoList = document.getElementById('todo-list');
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = todo.text;
            todoList.appendChild(li);
        });
    });