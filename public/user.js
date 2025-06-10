document.addEventListener('DOMContentLoaded', () => {
  fetch('/users')
    .then(res => res.json())
    .then(users => {
      const tbody = document.querySelector('#usersTable tbody');
      tbody.innerHTML = '';
      users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>
            <button onclick="editUser('${user.id}', '${user.name}', '${user.email}')">Editar</button>
            <button onclick="deleteUser('${user.id}')">Excluir</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
});

function editUser(id, currentName, currentEmail) {
  const name = prompt('Novo nome:', currentName);
  const email = prompt('Novo email:', currentEmail);

  if (name && email) {
    fetch(`/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    })
    .then(res => res.json())
    .then(() => location.reload());
  }
}

function deleteUser(id) {
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    fetch(`/users/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => location.reload());
  }
}
