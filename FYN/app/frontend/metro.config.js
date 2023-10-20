const path = require('path');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    sourceExts: ['jsx', 'js', 'json', 'ts', 'tsx'], // Add any other extensions you use
    extraNodeModules: {
      // This maps the environment files to the correct file for each environment.
      '@env': path.resolve(__dirname, 'src/environments'),
    },
  },
};