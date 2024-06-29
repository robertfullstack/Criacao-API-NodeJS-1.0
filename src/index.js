require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

const Film = mongoose.model('Film', {
    title: String,
    description: String,
    imageURL: String,
    trailerURL: String
});

app.get("/", async (req, res) => {
    const films = await Film.find();
    res.send(films);
});

app.delete("/:id", async (req, res) => {
    const film = await Film.findByIdAndDelete(req.params.id);
    return res.send(film);
});

app.put("/:id", async (req, res) => {
    const film = await Film.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        imageURL: req.body.imageURL,
        trailerURL: req.body.trailerURL
    }, {
        new: true
    });

    return res.send(film);
});

app.post("/", async (req, res) => {
    const film = new Film({
        title: req.body.title,
        description: req.body.description,
        imageURL: req.body.imageURL,
        trailerURL: req.body.trailerURL
    });

    await film.save();
    res.send(film);
});

app.listen(port, () => {
    mongoose.connect("")
        .then(() => {
            console.log(`Conectado ao MongoDB e rodando na porta ${port}!`);
        })
        .catch((error) => {
            console.error('Erro ao conectar ao MongoDB', error);
        });
});
