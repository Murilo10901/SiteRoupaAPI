import express from 'express'

const app = express ()
const users = []

app.post('/usuarios', (req,res) =>{

    console.log(req)
    res.send('ok post')
})


app.get ('/usuarios', (req, res)=>{
    res.send (`ok deu bom`)


})

app.listen(3000)
    
//objetivo desse codigo vai ser criar api de usuario
//listar todos os usurarios
// listar os usuarios
// editar usuario
// deletar usuario
