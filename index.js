"use strict"

module.exports = function(Parser) {
  return Parser.extend(
    require("acorn-dynamic-import").default,
    require("acorn-import-meta"),
    require("acorn-bigint"),
    require("acorn-class-fields"),
    require("acorn-private-methods")
  )
}
