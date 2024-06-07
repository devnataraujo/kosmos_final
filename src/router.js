const express = require('express'); //chamando o express

const userController = require('./controllers/userController'); //chamando o controller de usuário
const userMiddleware = require('./middlewares/userMiddleware'); //chamando o middleware de usuário
const { route } = require('./app');

const router = express.Router(); //instanciando o router

router.post('/user/cadastro', userController.cadastrarUsuario); // executando funcao buscarUsuarios do controller de usuário
router.post('/user/login', userController.buscarUsuario); // executando funcao  cadastrarUsuario do controller de usuário
router.post('/user/atualizar', userController.atualizarUsuario); // executando funcao atualizarUsuario do controller de usuário
router.post('/user/consultar', userController.consultarUsuario); // executando funcao consultarUsuario do controller de usuário
router.post('/user/pontuar', userController.pontuarUsuario); // executando funcao pontuarUsuario do controller de usuário
router.post('/user/consultarPontuacao', userController.consultarPontuacao); // executando funcao consultarPontuacao do controller de usuário
router.post('/user/consultarTotalPontuacao', userController.consultarTotalPontuacao); // executando funcao consultarTotalPontuacao do controller de usuário
router.get('/user/consultarRanking', userController.consultarRanking); // executando funcao consultarRanking do controller de usuário
router.post('/user/consultarRankingPais', userController.consultarRankingPais); // executando funcao consultarRankingPais do controller de usuário
router.get('/user/consultarPaises', userController.consultarPaises); // executando funcao consultarPaises do controller de usuário

module.exports = router; //exportando o router para ser usado em outro arquivo