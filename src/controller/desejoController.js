const Desejo = require('../model/desejo');

function indexView(req, res) {
    res.render('index.html');
}
function cadastroView(req, res) {
    res.render('cadastro.html');
}
function homeView(req, res) {

    Desejo.findAll({
        where: {
            id_usuario: req.session.usuario.id,
            indicador_ativo: 1
        }
    }).then((desejos)=>{
        res.render('home.html', {desejos});
    }).catch((erro_recupera_desejos)=>{
        res.render('home.html', {erro_recupera_desejos});
    }); 
}
function compradosView(req, res) {

    Desejo.findAll({
        where: {
            id_usuario: req.session.usuario.id,
            indicador_ativo: 0
        }
    }).then((desejos)=>{
        res.render('desejosComprados.html', {desejos});
    }).catch((erro_recupera_desejos)=>{
        res.render('desejosComprados.html', {erro_recupera_desejos});
    }); 
}
function homeViewOne(req, res) {
    Desejo.findOne({
        where: {
            id: req.params.id,
        }
    }).then((desejo)=>{
        res.render('editarDesejo.html', {desejo});
    }).catch((erro_recupera_desejos)=>{
        res.render('editarDesejo.html', {erro_recupera_desejos});
    });  
}
function cadastrarDesejo(req, res) {
    let desejo = {
        titulo: req.body.titulo,
        id_usuario: req.session.usuario.id,
        preco: req.body.preco,
        url_imagem: req.body.url_imagem,
        indicador_ativo: 1,
    }
    
    Desejo.create(desejo).then(()=>{
        res.redirect('/home');
    }).catch((err)=>{
        console.log(err);
        let erro_cadastrar_desejo = true;
        res.render("home.html", {erro_cadastrar_desejo});
    });

}
function editarDesejo(req, res) {
    Desejo.findOne({
        where: {
            id: req.params.id,
        }
    }).then((desejo)=>{
        desejo.update({
            titulo: req.body.titulo,
            preco: req.body.preco,
            url_imagem: req.body.url_imagem,
            indicador_ativo: req.body.indicador_ativo,
        }) 
        desejo.save()
       
        res.render('editarDesejo.html', {desejo});
    }).catch((erro_recupera_desejos)=>{
        res.render('editarDesejo.html', {erro_recupera_desejos});
    }); 
}
function excluirDesejo(req, res) {
    Desejo.findOne({
        where: {
            id: req.params.id,
        }
    }).then((desejo)=>{
        desejo.destroy();
        res.redirect('/home');
    }).catch((erro_recupera_desejos)=>{
        res.render('home.html', {erro_recupera_desejos});
    }); 
}
module.exports = {
    indexView,
    homeView,
    homeViewOne,
    cadastrarDesejo,
    cadastroView,
    editarDesejo,
    excluirDesejo,
    compradosView
}