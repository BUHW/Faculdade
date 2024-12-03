const db = require('../../utils/database/database_postgres')

exports.buscaPermissao = async (id, grupo, permissao, valor) => {
    var perm = ''
    try{
        perm = await db.permissoes.findOne(
            {
                where: {
                    grupo: grupo,
                    nome: permissao,
                    cancelado: valor,
                    id: id
                }
            }
        )
    } catch(e){
        throw e
    }
    return perm;
}