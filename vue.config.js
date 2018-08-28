module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
    ? 'http://akinto.pro'
    : '/',
    indexPath: 'index.tpl.html'
}