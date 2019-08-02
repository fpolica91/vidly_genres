const express = require('express');
const app = express()
app.use(express.json())
const Joi = require('joi')

const genres = [
    { id: 1, name: "Comedy" },
    { id: 2, name: "Horror" },
    { id: 3, name: "Romance" },
    { id: 4, name: "Documentary" }
]

app.get('/', (req, res) => {
    res.send('welcome to vidly')
})

app.get('/api/movies', (req, res) => {

    res.send(genres)
})

app.get('/api/movies/:id', (req, res) => {
    const genre = genres.find(grn => grn.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('genre not found')
    res.send(genre)
})


app.post('/api/movies/', (req, res) => {
    const { error } = validateGenre(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    const genre = {
        id: genres.id.length + 1,
        name: req.body.name
    }
    genres.push(genre)
    res.send(genre)

})

app.put('/api/movies/:id', (req, res) => {
    const genre = genres.find(gnr => gnr.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('genre not found')
    const { error } = validateGenre(req.body)
    if (error) return res.status(404).send(error.details[0].message)
    genre.name = req.body.name
    res.send(genre)
})

app.delete('/api/movies/:id', (req, res) => {
    const genre = genres.find(grn => grn.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('invalid genre')
    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send(genre)
})



function validateGenre(genre) {
    const schema = {
        name: Joi
            .string()
            .min(4)
            .max(10)
            .required()
    }
    return Joi.validate(genre, schema)
}



app.listen(3000, () => {
    console.log('listening on port 3000...')
})



