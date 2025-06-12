document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:4000/funcionarios')
    .then(res => res.json())
    .then(funcionarios => {
      const tbody = document.querySelector('#funcionariosTable tbody');
      tbody.innerHTML = '';
      funcionarios.forEach(f => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${f.name}</td>
          <td>${f.email}</td>
          <td>${f.cargo}</td>
          <td>
            <button onclick="editFuncionario('${f.id}', '${f.name}', '${f.email}', '${f.cargo}')">Editar</button>
            <button onclick="deleteFuncionario('${f.id}')">Excluir</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
});

function editFuncionario(id, currentName, currentEmail, currentCargo) {
  const name = prompt('Novo nome:', currentName);
  const email = prompt('Novo email:', currentEmail);
  const cargo = prompt('Novo cargo:', currentCargo);

  if (name && email && cargo) {
    fetch(`http://localhost:4000/funcionarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, cargo }),
    })
    .then(res => res.json())
    .then(() => location.reload());
  }
}

function deleteFuncionario(id) {
  if (confirm('Tem certeza que deseja excluir este funcionário?')) {
    fetch(`http://localhost:4000/funcionarios/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => location.reload());
  }
}
