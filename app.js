const express =require('express') // recuperer package express
let pokemons =require('./mock-pokemon')
const {success}  = require('./helper.js')
const app = express() // instance express
const port = 3001 // port de demarage
const morgan  = require('morgan');

const favicon = require('serve-favicon');

app
.use(favicon(__dirname + '/favicon.ico'))
.use(morgan('dev'))

app.get('/api/pokemons',(req,res)=>{
    const message = "Les pokemons ont été bien trouvé";
    res.json(success(message,pokemons))
    
})
app.get('/api/pokemons/:id',(req,res)=>{
    const id  = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message  = 'Pokemon a été bien trouvé';
    res.json(success(message,pokemon),)
}) 

    app.post('/api/pokemons',(req,res) => {
const id = pokemons.length + 1 ; 
    const pokemonCreated =  {...req.body, ...{id:id,created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a été bien créer ! `
    res.json(success(message,pokemonCreated))
})
app.listen(port,()=>{
    console.log(port,`Notre application Node est demaré sur : http://localhost:${port}`)
})