


module.exports = {
  // 只能写vue封装的配置

  runtimeCompiler: true,
  lintOnSave: false,
  devServer: {
    open: true,
    proxy: {
      
      '/abc': {
        target: 'http://47.96.150.126:5000', 
        pathRewrite: {
          '^/abc' : ''  
        },
        changeOrigin: true, 
        "secure": false
      },
    }
  },

  
}
