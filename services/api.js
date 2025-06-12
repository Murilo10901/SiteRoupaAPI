import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:3000"
})


export default api


//Servidor usuário (porta 3000):

//http://localhost:3000/register.html → página de cadastro usuário

//http://localhost:3000/login.html → página login usuário

//http://localhost:3000/admin.html → página admin usuário

//Servidor funcionário (porta 4000):

//http://localhost:4000/funcionario.html → página cadastro funcionário

//http://localhost:4000/admin-funcionario.html → página admin funcionário (se tiver)


//http://localhost:5000/admin-roupas.html → página cadastro funcionário
