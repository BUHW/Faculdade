const nodemailer = require('nodemailer');

async function sendEmailErro(erro) {
    // Lembrando que se o serviço de email for o Gmail, é necessário habilitar a opção "Acesso a app menos seguro" no Gmail
    // Caso seja outlook funciona de boa
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'teste@unesc.net',
            pass: 'senha@'
        }
    });

    // Favor alterar "emailquedesejaenviardestino" para o email que deja enviar a mensagem
    // Favor alterar "emailquedesejaenviarorigem" para o email que esta enviando a mensagem
    const mailOptions = {
        from: 'teste@unesc.net',
        to: 'teste@gmail.com',
        subject: 'Erro ao enviar email',
        text: `Houve determinado erro ao finalizar o processo: ${erro}`,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erro ao enviar e-mail:', error);
                reject(error);
            } else {
                console.log('E-mail enviado: ' + info.response);
                resolve(info);
            }
        });
    });
}

module.exports = {
    sendEmailErro
};