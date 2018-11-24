module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '//akinto.pro'
    : '/',
  indexPath: 'index.tpl.html',
  lintOnSave: true,

  devServer: {
    overlay: {
      warnings: false,
      errors: true
    }
  }
}
