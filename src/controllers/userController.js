const userModel = require('../models/userModel');

const buscarUsuario = async (request, response) => {
    const users = await userModel.buscarUsuario(request.body);
    return response.status(200).json({
        data: users,
        status: 200
    });
};

const cadastrarUsuario = async (request, response) => {
    const cadastrando = await userModel.cadastrarUsuario(request.body);
    return response.status(200).json(cadastrando);
};

const atualizarUsuario = async (request, response) => {
    const atualizando = await userModel.atualizarUsuario(request.body);
    return response.status(200).json(atualizando);
}

const consultarUsuario = async (request, response) => {
    const users = await userModel.consultarUsuario(request.body);
    return response.status(200).json(users);
}

const pontuarUsuario = async (request, response) => {
    const users = await userModel.pontuarUsuario(request.body);
    return response.status(200).json(users);
}

const consultarPontuacao = async (request, response) => {
    const users = await userModel.consultarPontuacao(request.body);
    return response.status(200).json({
        data: users,
        status: 200
    });
}

const consultarTotalPontuacao = async (request, response) => {
    const users = await userModel.consultarTotalPontuacao(request.body);
    return response.status(200).json(users);
}

const consultarRanking = async (request, response) => {
    const users = await userModel.consultarRanking(request.body);
    return response.status(200).json(users);
}

const consultarRankingPais = async (request, response) => {
    const users = await userModel.consultarRankingPais(request.body);
    return response.status(200).json(users);
}

const consultarPaises = async (request, response) => {
    const users = await userModel.consultarPaises(request.body);
    return response.status(200).json(users);
}

module.exports = {
    buscarUsuario,
    cadastrarUsuario,
    atualizarUsuario,
    consultarUsuario,
    pontuarUsuario,
    consultarPontuacao,
    consultarRanking,
    consultarTotalPontuacao,
    consultarRankingPais,
    consultarPaises,
};
