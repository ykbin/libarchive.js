const pkg = require("./package.json");

module.exports = {
  compilationOptions: {
    preferredConfigPath: "./tsconfig.json",
  },
  entries: [
    {
      filePath: "./src/MainLibrary.ts",
      outFile: pkg.types,
      failOnClass: true,
      output: {
        inlineDeclareGlobals: false,
        sortNodes: true,
        noBanner: true,
        umdModuleName: pkg.name,
      }
    },
  ],
};
