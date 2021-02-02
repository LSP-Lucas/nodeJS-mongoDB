module.exports.formulario_inclusao_noticia = function(application, req, res) {
  res.render('admin/form_add_noticia', {validacao: {}, noticia: {}});
}

module.exports.noticias_salvar = function(application, req, res) {
  const noticia = req.body;

  req.assert('titulo', 'Título é obrigatório').notEmpty();
  req.assert('resumo','Resumo é obrigatório').notEmpty();
  req.assert('resumo','Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
  req.assert('autor','Nome do autor é obrigatório').notEmpty();
  req.assert('data_noticia','Data é obrigatório').notEmpty().isDate({format: 'YYYY-MM-DD'});
  req.assert('noticia','A notícia é obrigatória').notEmpty();

  const error = req.validationErrors();

  if(error) {
    res.render('admin/form_add_noticia', {validacao: error, noticia});
    return ;
  }

  const connection = application.config.dbConnection();
  const noticiasModel = new application.app.models.NoticiasDAO(connection);

  noticiasModel.salvarNoticia(noticia, function(error, result) {
    res.redirect('/noticias');
  });
}