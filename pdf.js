const PDFDocument = require('pdfkit');

function formatCPF_CNPJ(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length === 11)
        return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    if (valor.length === 14)
        return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    return valor;
}

function formatCEP(cep) {
    cep = cep.replace(/\D/g, '');
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
}

function formatTel(tel) {
    tel = tel.replace(/\D/g, '');
    if (tel.length === 11)
        return tel.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    if (tel.length === 10)
        return tel.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    return tel;
}

module.exports = (dados) => {
    return new Promise((resolve) => {

        const doc = new PDFDocument();
        let buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));

        doc.fontSize(16).text('MINUTA DE EMBARQUE', { align: 'center' });
        doc.moveDown();

        doc.text(`Serviço: ${dados.servico}`);
        doc.text(`Destinatário: ${dados.nome}`);
        doc.text(`CPF/CNPJ: ${formatCPF_CNPJ(dados.cpf)}`);
        doc.text(`Endereço: ${dados.endereco}`);
        doc.text(`CEP: ${formatCEP(dados.cep)}`);
        doc.text(`Telefone: ${formatTel(dados.telefone)}`);

        doc.moveDown();

        doc.text(`Volumes: ${dados.volumes}`);
        doc.text(`Peso: ${dados.peso} kg`);

        doc.moveDown();
        doc.text("Assinatura: _______________________");

        doc.end();
    });
};
