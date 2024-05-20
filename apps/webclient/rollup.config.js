
const arguments = require("minimist")(process.argv.slice(2));
const copy = require("rollup-plugin-copy");
const resolve = require("rollup-plugin-node-resolve");
const serve = require("rollup-plugin-serve");
const livereload = require("rollup-plugin-livereload");

/** @type {import("rollup").OutputPluginOption} */
const plugins = [
    resolve(),
    copy({ targets: [
      {src: "index.html", dest: "dist"},
      {src: "assets", dest: "dist"}] 
    }),
  ];

if(arguments.target == "serve") {
  const options = { host: 'localhost', port: 4200, open: true, contentBase: ["dist"] }
  plugins.push(serve(options));
  plugins.push(livereload({ watch: "dist" }))
}

/** @type {import("rollup").RollupOptions} */
// prettier-ignore
module.exports = [
  { 
    logLevel: "silent",
    input: "src/main.js",
    output: [{ file: "dist/main.js", format: "cjs" }],
    plugins
  }
]

