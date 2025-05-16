document.addEventListener('DOMContentLoaded', function() {
    // Validação do formulário de login
    const loginForm = document.querySelector('.auth-form');
    if (loginForm && window.location.pathname.includes('login.html')) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
                alert('Por favor, preencha todos os campos');
                return;
            }
            
            // Simulação de login bem-sucedido
            alert('Login realizado com sucesso!');
            window.location.href = 'index.html';
        });
    }
    
    // Validação do formulário de cadastro
    const registerForm = document.querySelector('.auth-form');
    if (registerForm && window.location.pathname.includes('register.html')) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            if (!name || !email || !password || !confirmPassword) {
                alert('Por favor, preencha todos os campos');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('As senhas não coincidem');
                return;
            }
            
            if (password.length < 8) {
                alert('A senha deve ter no mínimo 8 caracteres');
                return;
            }
            
            if (!terms) {
                alert('Você deve aceitar os termos de serviço');
                return;
            }
            
            // Simulação de cadastro bem-sucedido
            alert('Cadastro realizado com sucesso! Faça login para continuar.');
            window.location.href = 'login.html';
        });
    }
});