"use strict"

const fs = require("fs")
const path = require("path")
const run = require("test262-parser-runner")
const parse = require(".").parse

const unsupportedFeatures = [
  // Implemented in acorn master
  "regexp-dotall",

  // ECMAScript 2018
  "regexp-named-groups",

  // stage 3
  "class-fields", "class-fields-public", "computed-property-names",
  "regexp-unicode-property-escapes",
  "regexp-lookbehind"
]

const implementedFeatures = [
  "async-iteration",
  "BigInt",
  "numeric-separator-literal",
  "object-rest",
  "object-spread",
  "optional-catch-binding"
]

run(
  (content, options) => parse(content, {sourceType: options.sourceType, ecmaVersion: 9, plugins: { stage3: true }}),
  {
    testsDirectory: path.dirname(require.resolve("test262/package.json")),
    skip: test => (!test.attrs.features || !implementedFeatures.some(f => test.attrs.features.includes(f)) || unsupportedFeatures.some(f => test.attrs.features.includes(f))),
    whitelist: fs.readFileSync("./test262.whitelist", "utf8").split("\n").filter(v => v && v[0] !== "#")
  }
)
