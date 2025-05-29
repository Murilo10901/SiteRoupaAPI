document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.auth-form');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Verifica se é cadastro ou login
        if (window.location.pathname.includes('register')) {
            const name = document.getElementById('name').value.trim();
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                return alert('As senhas não coincidem!');
            }

            try {
                const res = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await res.json();
                if (res.ok) {
                    alert(data.message || 'Cadastro realizado com sucesso!');
                    window.location.href = 'login.html';
                } else {
                    alert(data.error || 'Erro ao cadastrar usuário.');
                }
            } catch (err) {
                alert('Erro na conexão com o servidor.');
            }

        } else {
            // Login
            try {
                const res = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();
                if (res.ok) {
                    alert(data.message || 'Login realizado com sucesso!');
                    window.location.href = 'index.html'; // redirecionar para sua dashboard
                } else {
                    alert(data.error || 'E-mail ou senha inválidos.');
                }
            } catch (err) {
                alert('Erro na conexão com o servidor.');
            }
        }
    });
});
