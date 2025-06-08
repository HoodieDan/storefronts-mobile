module.exports = function (api) {
  api.cache(true);
  let plugins = ['inline-dotenv'];

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins,
  };
};
