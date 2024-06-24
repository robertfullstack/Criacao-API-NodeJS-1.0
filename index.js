const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { pesoFinal: undefined });
});

app.post('/', (req, res) => {
    const peso = parseFloat(req.body.peso);
    const altura = parseFloat(req.body.altura);

    if (!isNaN(peso) && !isNaN(altura) && altura > 0) {
        const imc = (peso / (altura * altura)).toFixed(2);
        res.render('index', { pesoFinal: imc });
    } else {
        res.render('index', { pesoFinal: 'Entrada inválida' });
    }
});

app.listen(5000, () => console.log('Rodando na Porta 5000...'));
