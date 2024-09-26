const babelConfig = {
  // ... whatever else ...
  plugins: [
      '@babel/plugin-transform-modules-commonjs',
  ],
};

module.exports = require('babel-jest').createTransformer(babelConfig);