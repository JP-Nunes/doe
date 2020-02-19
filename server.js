const express = require('express')
const server = express()

server.use(express.static('public'))
server.use(express.urlencoded({extended: true}))

const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'imbackagain1',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})

const nunjucks = require('nunjucks')
nunjucks.configure('./', {express: server, noCache: true,})

server.get('/', function(req, res) {
    db.query("SELECT * FROM donors", function(err, result){
        if(err) return res.send('Erro no Banco de Dados.')

        const donors = result.rows
        return res.render('index.html', { donors })
    })
    
})

server.post('/', function(req, res) {
    const name = req.body.name
    const email = req.body.email
    const bloodType = req.body.bloodType

    if(name == "" || email == "" || bloodType == "") {
        return res.send('Todos os campos são obrigatórios.')
    }

    const query =  `INSERT INTO donors ("name", "email", "bloodType") 
                    VALUES ($1, $2, $3)`

    const values = [name, email, bloodType]
    
    db.query(query, values, function(err){
        if(err) return res.send('Erro no Banco de Dados.')

        return res.redirect('/')
    })
})

server.listen(3000, function() {
    console.log('Iniciando o servidor')
})