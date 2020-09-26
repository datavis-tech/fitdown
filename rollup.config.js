export default {
  input: "index.js",
  external: ["d3-time-format"],
  output: {
    file: "dist/weightliftingML.js",
    format: "umd",
    name: "WeightliftingML",
    globals: { "d3-time-format": "d3" },
  },
};
