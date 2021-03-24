module.exports = function (api) {
  api.cache(true);

  return ({
    plugins: [
      '@babel/plugin-proposal-class-properties',
    ],
    presets: [
      require('@babel/preset-env'),
      require('@babel/preset-react'),
    ],
  });
};
