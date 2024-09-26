module.exports = {
  // 判断是否是开发模式，不是就修改路径 ./
  publicPath: process.env.NODE_ENV === 'development'
    ? '/' : './',
  // 编译后自动打开
  devServer: {
    open: true
  }
}
