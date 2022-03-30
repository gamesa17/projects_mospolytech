module.exports = (api) => ({
  presets: [["@babel/preset-env"], ["@babel/preset-typescript"], ["@babel/preset-react"]],
  plugins: [
    [
      "babel-plugin-styled-components",
      {
        displayName: api.env("development"),
        ssr: false,
        minify: true,
        pure: true,
      },
    ],
    ["@babel/transform-runtime"],
  ],
});
