const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const cors = require('cors');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
})

var colums = {
    date: {type: DataTypes.DATE},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING}
}

var Notes = db.define('Notes', colums);

db.sync()
    .then(() => {
        console.log('Banco de dados sincronizado.');
    })
    .catch(error => {
        conlose.log('Erro ao sincronizar banco de dados:', error);
    })

var api = express()

api.use(cors());
api.use(express.json());
api.use(express.urlencoded());

api.get("/", function(requisicao, resposta){
    resposta.json({mensagem: "Minha primaira API!"})
})

api.get("/dev", function(requisicao, resposta){
    resposta.json({ desenvolvedor: "Dario Junior", idade: "XX anos", linguagens: "html, css, JavaScript"})
})

api.get('/notes', async function(req, res){
    var data = await Notes.findAll();
    res.json(data);
})

api.post('/notes', async function(req, res){
    await Notes.create(req.body)
    res.send();
})

api.delete("/notes", async function(req, res){
    await Notes.destroy({where: {id:req.body.id}});
    res.send();
})


api.listen(4000, function(){
    console.log("API EM FUNCIONAMENTO!")
    console.log("http://localhost:4000/")
})
