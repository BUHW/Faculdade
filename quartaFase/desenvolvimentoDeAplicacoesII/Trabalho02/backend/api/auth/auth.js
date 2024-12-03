require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../utils/database/database_postgres');

module.exports = (p) => {
    return async (req, res, next) => {
        try{
            const token = await req.headers.authorization.split(" ")[1];
            const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN);
            const usuario = await decodedToken;
            req.usuario = usuario;
            let autorizado = false;
            if(p){
                const perm = await db.Perm.findOne(
                    {
                        where: {
                            grupo: p.grupo,
                            nome: p.permissao,
                            caneclado: p.valor,
                            id: req.user.userID
                        }
                    }
                );
                if(perm){
                    autorizado = true;
                }
            } else {
                autorizado = true;
            }
            if(!autorizado){
                res.status(401).json({message: 'Requisição negada'});
            } else {
                return next();
            }
        } catch (e) {
            console.log(e);
            res.status(401).json({
                error: `Requisição inválida, verifique seu token de acesso`
            })
        }
    }
}