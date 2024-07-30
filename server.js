// 🏆 API REST NODE

// import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js"
import { fastify } from "fastify";

const server = fastify()

//const database = new DatabaseMemory()
const database = new DatabasePostgres()

// Rote

server.get('/', (req, res) => {
    res.send('🏆 胜利者 Vctr 🧸')
})

server.post('/videos', async (request, reply) => {

    const {title, description, duration} = request.body

    await database.create({
        title,
        description,
        duration
    })
    return reply.status(201).send()
})

server.get('/videos', async (request, reply) => {
    const search = request.query.search

    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id', (req, res) => {
    const videoId = req.params.id
    const {title, description, duration} = req.body

    const video = database.update(videoId, {
        title,
        description,
        duration
    })

    return res.status(204).send()
})

server.delete('/videos/:id', async (req, res) => {
    const videoId = req.params.id;

    await database.delete(videoId);
    return res.status(204).send("Usuario deletado");
});

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})
