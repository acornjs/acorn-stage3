"use strict"

const plugins = [
  [ require("acorn-async-iteration/inject"), "asyncIteration" ],
  [ require("acorn5-object-spread/inject"), "objectSpread" ],
  [ require("acorn-dynamic-import/lib/inject").default, "dynamicImport" ]
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
