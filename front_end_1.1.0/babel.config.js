// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset'
//   ]
// }

module.exports = {
  // ... whatever else ...
  globals: {
    'vue-jest': {
      transform: {
        js: './babel-jest-transformer.js',
      },
    },
  },
  transform: {
    '.*\\.js$': './babel-jest-transformer.js',
    '.*\\.vue$': '@vue/vue2-jest',
  },
};