const connection = require('./connection');

const buscarUsuario = async (info) => { //criando uma funcao assincrona
    const { USER_EMAIL, USER_PASSWORD } = info; //desestruturando o objeto info
    const [usuario] = await connection.execute('select USER_ID, USER_EMAIL, USER_NICKNAME FROM USER_PROFILE WHERE USER_EMAIL = ? and USER_PASSWORD = SHA2(?, 224)', [USER_EMAIL, USER_PASSWORD]); //executando a query e armazenando o primeiro array do retorno
    console.log(usuario)
    return usuario; //retornando o usuario
};


const cadastrarUsuario = async (infos) => {
    const {USER_NICKNAME, USER_EMAIL, USER_PASSWORD, USER_COUNTRY, USER_BIRTH} = infos; //desestruturando o objeto infos
    const query = 'INSERT INTO USER_PROFILE (USER_NICKNAME, USER_EMAIL, USER_PASSWORD, USER_COUNTRY, USER_BIRTH) VALUES (?,?,SHA2(?, 224),?, ?)'; //criando a query
    const values = [USER_NICKNAME, USER_EMAIL, USER_PASSWORD, USER_COUNTRY, USER_BIRTH]; //criando o array de valores
    const [cadastrando] = await connection.execute(query, values); //executando a query e armazenando o primeiro array do retorno
    const id_user = cadastrando.insertId; //pegando o id do usuário cadastrado
    console.log(id_user)
    return id_user; //retornando o id do usuário cadastrado
};

const atualizarUsuario = async (infos) => {
    const {USER_NICKNAME, USER_EMAIL, USER_COUNTRY, USER_BIRTH, USER_ID} = infos; //desestruturando o objeto infos
    console.log(infos)
    const query = 'UPDATE USER_PROFILE SET USER_NICKNAME = ?, USER_EMAIL = ?, USER_COUNTRY = ?, USER_BIRTH = ? WHERE USER_ID = ?'; //criando a query
    const values = [USER_NICKNAME, USER_EMAIL, USER_COUNTRY, USER_BIRTH, USER_ID]; //criando o array de valores
    const [atualizando] = await connection.execute(query, values); 
    return atualizando; //retornando o usuário atualizado
}

const consultarUsuario = async (info) => {
    const { USER_ID } = info; //desestruturando o objeto info
    const [usuario] = await connection.execute('select USER_ID, USER_EMAIL, USER_NICKNAME, USER_BIRTH, USER_COUNTRY FROM USER_PROFILE WHERE USER_ID = ?', [USER_ID]); 
    return usuario; //retornando o usuário
}


const pontuarUsuario = async (info) => {
    const { USER_ID, LEVEL_ID, POINTS } = info; //desestruturando o objeto info
    console.log(info)
    const query = 'INSERT INTO USER_LEVEL_SCORE (USER_ID, LEVEL_ID, POINTS) VALUES (?,?,?)'; //criando a query
    const values = [USER_ID, LEVEL_ID, POINTS]; //criando o array de valores
    const [pontuando] = await connection.execute(query, values); 
    return pontuando; //retornando o usuário pontuado
}

const consultarPontuacao = async (info) => {
    const { USER_ID } = info; //desestruturando o objeto info
    const [pontuacao] = await connection.execute('select sum(points) as total from USER_LEVEL_SCORE where USER_ID = ?', [USER_ID]); 
    return pontuacao; //retornando a pontuação
}

const consultarTotalPontuacao = async (info) => {   
    const { USER_ID } = info; //desestruturando o objeto info
    const [totalPontuacao] = await connection.execute('select SUM(POINTS) AS TOTAL_POINTS from USER_LEVEL_SCORE where USER_ID = ?', [USER_ID]); 
    return totalPontuacao; //retornando a pontuação total
}

const consultarRanking = async () => {
    const [ranking] = await connection.execute('select uls.USER_ID, SUM(POINTS) AS TOTAL_POINTS , USER_NICKNAME from USER_LEVEL_SCORE as uls JOIN USER_PROFILE as up on up.USER_ID = uls.USER_ID GROUP BY USER_ID ORDER BY TOTAL_POINTS DESC'); 
    return ranking; //retornando o ranking
}

const consultarRankingPais = async (info) => {
    const { USER_COUNTRY } = info; //desestruturando o objeto info
    const [rankingPais] = await connection.execute('select uls.USER_ID, SUM(POINTS) AS TOTAL_POINTS , USER_NICKNAME from USER_LEVEL_SCORE as uls JOIN USER_PROFILE as up on up.USER_ID = uls.USER_ID WHERE up.USER_COUNTRY = ? GROUP BY USER_ID ORDER BY TOTAL_POINTS DESC', [USER_COUNTRY]); 
    return rankingPais; //retornando o ranking do país
}

const consultarPaises = async () => {
    // consultar os países dos usuários que estão no ranking
    const [paises] = await connection.execute('SELECT DISTINCT UP.USER_COUNTRY FROM USER_PROFILE UP JOIN USER_LEVEL_SCORE ULS ON UP.USER_ID = ULS.USER_ID;'); 
    return paises; //retornando os países
}

module.exports = {
    buscarUsuario,
    cadastrarUsuario,
    atualizarUsuario,
    consultarUsuario,
    pontuarUsuario,
    consultarPontuacao,
    consultarTotalPontuacao,
    consultarRanking,
    consultarRankingPais,
    consultarPaises,
};

