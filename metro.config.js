// metro.config.js

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");

// 1. Obtén la configuración base de Expo
const baseConfig = getDefaultConfig(__dirname);

// 2. Agrega soporte para NativeWind (global.css)
const nativeWindConfig = withNativeWind(baseConfig, {
  input: "./global.css", // según tu estructura
});

// 3. Agrega soporte de call stacks para Reanimated
const finalConfig = wrapWithReanimatedMetroConfig(nativeWindConfig);

// 4. Exporta la config final
module.exports = finalConfig;
