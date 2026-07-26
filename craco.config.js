// Webpack's publicPath comes from PUBLIC_URL / the package.json homepage:
// "/" for production (liberata.info) and "/staging/" for the staging build.
// Don't hardcode it here — that breaks the staging subpath deploy.
module.exports = {};
