"use strict"

const plugins = [
  [ require("acorn-async-iteration/inject"), "asyncIteration" ],
  [ require("acorn5-object-spread/inject"), "objectSpread" ],
  [ require("acorn-dynamic-import/lib/inject").default, "dynamicImport" ],
  [ require("acorn-import-meta/inject"), "importMeta" ],
  [ require("acorn-numeric-separator/inject"), "numericSeparator" ],
  [ require("acorn-bigint/inject"), "bigInt" ],
  [ require("acorn-optional-catch-binding/inject"), "optionalCatchBinding" ],
  [ require("acorn-class-fields/inject"), "classFields" ],
  [ require("acorn-private-methods/inject"), "privateMethods" ],
]

module.exports = acorn => {
  acorn = plugins.reduce((acorn_, p) => p[0](acorn_), acorn)
  acorn.plugins.stage3 = instance => {
    plugins.forEach(p => {
      if (p[1] in instance.options) return
      acorn.plugins[p[1]](instance)
    })
  }
  return acorn
}
