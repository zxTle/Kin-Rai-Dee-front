module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer : {
    port : 3000,
    proxy : {
      '/':{
        target : 'http://localhost:8090',
        ws: true,
        changeOrigin : true
      }
    }
  }
}
