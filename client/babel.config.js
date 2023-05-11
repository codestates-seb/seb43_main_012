module.exports = function (api) {
  return {
    presets: ['@babel/preset-typescript'],
    plugins: ['macros'],
  };
};
