const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': 'blue' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  devServer: {
    proxy: {
        '/api': 'http://127.0.0.1:5000'
    }
  }
};