const express =require('express') // recuperer package express
let pokemons =require('./mock-pokemon')
const app = express() // instance express
const port = 3001 // port de demarage
app.get('/',(req,res)=>{
    res.send('Hello Express 2')
})

app.listen(port,()=>{
    console.log(port,`Notre application Node est demaré sur : http://localhost:${port}`)
})

console.log(pokemons)
app.get('/api/pokemons/:id',(req,res)=>{
    const id  = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)

    res.json(pokemon)
})
app.get('/api/pokemons',(req,res)=>{
    
    res.send(`il ya ${pokemons.length} pokémons dans pkédex,pour le moment.` );
})