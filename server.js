const express = require('express');
const app = express();
const gerarPDF = require('./pdf');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

app.post('/gerar', async (req, res) => {
    const dados = req.body;

    const pdfBuffer = await gerarPDF(dados);

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
});

app.listen(3000, () => console.log("Rodando"));
