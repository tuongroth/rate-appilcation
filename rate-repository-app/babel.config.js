module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    // Đây là những plugin hỗ trợ cho ESM nếu cần thiết
    '@babel/plugin-transform-modules-commonjs',
  ],
};
