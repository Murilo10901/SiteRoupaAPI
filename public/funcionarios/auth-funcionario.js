document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.auth-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const cargo = document.getElementById('cargo').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
      return alert('As senhas não coincidem!');
    }

    try {
      const res = await fetch('http://localhost:4000/funcionarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, cargo, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Funcionário cadastrado com sucesso!');
        form.reset();
      } else {
        alert(data.error || 'Erro ao cadastrar funcionário.');
      }
    } catch (err) {
      alert('Erro na conexão com o servidor.');
    }
  });
});
