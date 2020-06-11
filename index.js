"use strict"

module.exports = function(Parser) {
  return Parser.extend(
    require("acorn-numeric-separator"),
    require("acorn-class-fields"),
    require("acorn-static-class-features"),
    require("acorn-private-methods"),
    require("acorn-logical-assignment")
  )
}
