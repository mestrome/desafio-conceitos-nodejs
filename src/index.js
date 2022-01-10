const express = require('express')
const {uuid} = require('uuidv4')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const reporsitores = []

app.get('/repositores', (request, response) => {
    const {title} = request.query
    const results = title
    ? reporsitores.filter(
        repositore => repositore.title.toLowerCase().includes(title.toLowerCase())
    ): reporsitores

    return response.json(results)
})

app.post('/repositores', (request, response) => {
    const {
        title,
        url,
        techs
    } = request.body

    const repositore = {
        id: uuid(),
        title,
        url,
        techs,
        likes: 0
    }

    reporsitores.push(repositore)

    return response.json(repositore)
})

app.put('/repositores/:id', (request, response) => {
    const {id} = request.params
    const {title, url, techs} = request.body
    const repositoreIndex = reporsitores.findIndex(
        repositore => repositore.id == id
    )
    
    if(repositoreIndex < 0){
        return response.status(404).json({
            error: "Repositore not found."
        })
    }

    const reporsitore = {
        id,
        title,
        url,
        techs,
        like: reporsitores[repositoreIndex].likes
    }

    reporsitores[repositoreIndex] = reporsitore
    
    return response.status(204).send()
})

app.delete('/repositores/:id', (request, response) => {
    const {id} = request.params

    const repositoreIndex = reporsitores.findIndex(
        repositore => repositore.id == id
    )

    if(repositoreIndex < 0){
        return response.status(404).json({
            error: "Repositore not found."
        })
    }

    reporsitores.splice(repositoreIndex, 1)

    return response.status(204).send()
})

app.post('/repositores/:id/like', (request, response) => {
    const {id} = request.params

    const repositoreIndex = reporsitores.findIndex(
        repositore => repositore.id == id
    )

    if(repositoreIndex < 0){
        return response.status(404).json({
            error: "Repositore not found."
        })
    }

    const reporsitore = reporsitores[repositoreIndex]
    reporsitore.likes = reporsitore.likes+1
    reporsitores[repositoreIndex] = reporsitore
    
    return response.status(204).send()
})


app.listen(3333, () => {
    console.log('🚀 Bank-end started!')
})