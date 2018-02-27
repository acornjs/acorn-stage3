"use strict"

const fs = require("fs")
const path = require("path")
const run = require("test262-parser-runner")
const parse = require(".").parse

const unsupportedFeatures = []

const implementedFeatures = [
  "BigInt",
  "class-fields-private",
  "class-fields-public",
  "dynamic-import", // https://github.com/tc39/test262/issues/1164
  "import-meta", // https://github.com/tc39/test262/issues/1342
  "numeric-separator-literal",
  "optional-catch-binding",
]

run(
  (content, options) => parse(content, {sourceType: options.sourceType, ecmaVersion: 9, plugins: { stage3: true }}),
  {
    testsDirectory: path.dirname(require.resolve("test262/package.json")),
    skip: test => (!test.attrs.features || !implementedFeatures.some(f => test.attrs.features.includes(f)) || unsupportedFeatures.some(f => test.attrs.features.includes(f))),
    whitelist: fs.readFileSync("./test262.whitelist", "utf8").split("\n").filter(v => v && v[0] !== "#")
  }
)
