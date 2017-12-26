"use strict"

const assert = require("assert")

const acorn = require("..")

function test(testCode, ast) {
  const result = acorn.parse(testCode, { plugins: { stage3: true }, ecmaVersion: 9, sourceType: "module" })
  assert.deepEqual(result, ast)
}

const testCode = `
  async function* x() {
    let value = 1_000_000n + 0xdead_beefn
    for await (const { a, ...y } in z) {
      import(import.meta.resolve(a).replace(/.css$/, ".js")).then(({ interestingThing, ...otherStuff }) => {
        const data = { ...y, ...otherStuff }
      });
    }
    try {
      BigInt.method()
    } catch {}
  }`

const maybeBigInt = str => typeof BigInt !== "undefined" && BigInt.parseInt ? BigInt.parseInt(str) : null

const ast = {
  type: "Program",
  start: 0,
  end: 328,
  body: [
    {
      type: "FunctionDeclaration",
      start: 3,
      end: 328,
      id: {
        type: "Identifier",
        start: 19,
        end: 20,
        name: "x"
      },
      generator: true,
      expression: false,
      async: true,
      params: [],
      body: {
        type: "BlockStatement",
        start: 23,
        end: 328,
        body: [
          {
            type: "VariableDeclaration",
            start: 29,
            end: 66,
            declarations: [
              {
                type: "VariableDeclarator",
                start: 33,
                end: 66,
                id: {
                  type: "Identifier",
                  start: 33,
                  end: 38,
                  name: "value"
                },
                init: {
                  type: "BinaryExpression",
                  start: 41,
                  end: 66,
                  left: {
                    type: "Literal",
                    start: 41,
                    end: 51,
                    value: maybeBigInt("1000000"),
                    raw: "1_000_000n",
                    bigint: "1_000_000n"
                  },
                  operator: "+",
                  right: {
                    type: "Literal",
                    start: 54,
                    end: 66,
                    value: maybeBigInt("3735928559"),
                    raw: "0xdead_beefn",
                    bigint: "0xdead_beefn"
                  }
                }
              }
            ],
            kind: "let"
          },
          {
            type: "ForInStatement",
            start: 71,
            end: 277,
            await: true,
            left: {
              type: "VariableDeclaration",
              start: 82,
              end: 99,
              declarations: [
                {
                  type: "VariableDeclarator",
                  start: 88,
                  end: 99,
                  id: {
                    type: "ObjectPattern",
                    start: 88,
                    end: 99,
                    properties: [
                      {
                        type: "Property",
                        start: 90,
                        end: 91,
                        method: false,
                        shorthand: true,
                        computed: false,
                        key: {
                          type: "Identifier",
                          start: 90,
                          end: 91,
                          name: "a"
                        },
                        kind: "init",
                        value: {
                          type: "Identifier",
                          start: 90,
                          end: 91,
                          name: "a"
                        }
                      },
                      {
                        type: "RestElement",
                        start: 93,
                        end: 97,
                        argument: {
                          type: "Identifier",
                          start: 96,
                          end: 97,
                          name: "y"
                        }
                      }
                    ]
                  },
                  init: null
                }
              ],
              kind: "const"
            },
            right: {
              type: "Identifier",
              start: 103,
              end: 104,
              name: "z"
            },
            body: {
              type: "BlockStatement",
              start: 106,
              end: 277,
              body: [
                {
                  type: "ExpressionStatement",
                  start: 114,
                  end: 271,
                  expression: {
                    type: "CallExpression",
                    start: 114,
                    end: 270,
                    callee: {
                      type: "MemberExpression",
                      start: 114,
                      end: 173,
                      object: {
                        type: "CallExpression",
                        start: 114,
                        end: 168,
                        callee: {
                          type: "Import",
                          start: 114,
                          end: 120
                        },
                        arguments: [
                          {
                            type: "CallExpression",
                            start: 121,
                            end: 167,
                            callee: {
                              type: "MemberExpression",
                              start: 121,
                              end: 151,
                              object: {
                                type: "CallExpression",
                                start: 121,
                                end: 143,
                                callee: {
                                  type: "MemberExpression",
                                  start: 121,
                                  end: 140,
                                  object: {
                                    type: "MetaProperty",
                                    start: 121,
                                    end: 132,
                                    meta: {
                                      type: "Identifier",
                                      start: 121,
                                      end: 127,
                                      name: "import"
                                    },
                                    property: {
                                      type: "Identifier",
                                      start: 128,
                                      end: 132,
                                      name: "meta"
                                    }
                                  },
                                  property: {
                                    type: "Identifier",
                                    start: 133,
                                    end: 140,
                                    name: "resolve"
                                  },
                                  computed: false
                                },
                                arguments: [
                                  {
                                    type: "Identifier",
                                    start: 141,
                                    end: 142,
                                    name: "a"
                                  }
                                ]
                              },
                              property: {
                                type: "Identifier",
                                start: 144,
                                end: 151,
                                name: "replace"
                              },
                              computed: false
                            },
                            arguments: [
                              {
                                type: "Literal",
                                start: 152,
                                end: 159,
                                value: {

                                },
                                raw: "/.css$/",
                                regex: {
                                  pattern: ".css$",
                                  flags: ""
                                }
                              },
                              {
                                type: "Literal",
                                start: 161,
                                end: 166,
                                value: ".js",
                                raw: "\".js\""
                              }
                            ]
                          }
                        ]
                      },
                      property: {
                        type: "Identifier",
                        start: 169,
                        end: 173,
                        name: "then"
                      },
                      computed: false
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        start: 174,
                        end: 269,
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [
                          {
                            type: "ObjectPattern",
                            start: 175,
                            end: 210,
                            properties: [
                              {
                                type: "Property",
                                start: 177,
                                end: 193,
                                method: false,
                                shorthand: true,
                                computed: false,
                                key: {
                                  type: "Identifier",
                                  start: 177,
                                  end: 193,
                                  name: "interestingThing"
                                },
                                kind: "init",
                                value: {
                                  type: "Identifier",
                                  start: 177,
                                  end: 193,
                                  name: "interestingThing"
                                }
                              },
                              {
                                type: "RestElement",
                                start: 195,
                                end: 208,
                                argument: {
                                  type: "Identifier",
                                  start: 198,
                                  end: 208,
                                  name: "otherStuff"
                                }
                              }
                            ]
                          }
                        ],
                        body: {
                          type: "BlockStatement",
                          start: 215,
                          end: 269,
                          body: [
                            {
                              type: "VariableDeclaration",
                              start: 225,
                              end: 261,
                              declarations: [
                                {
                                  type: "VariableDeclarator",
                                  start: 231,
                                  end: 261,
                                  id: {
                                    type: "Identifier",
                                    start: 231,
                                    end: 235,
                                    name: "data"
                                  },
                                  init: {
                                    type: "ObjectExpression",
                                    start: 238,
                                    end: 261,
                                    properties: [
                                      {
                                        type: "SpreadElement",
                                        start: 240,
                                        end: 244,
                                        argument: {
                                          type: "Identifier",
                                          start: 243,
                                          end: 244,
                                          name: "y"
                                        }
                                      },
                                      {
                                        type: "SpreadElement",
                                        start: 246,
                                        end: 259,
                                        argument: {
                                          type: "Identifier",
                                          start: 249,
                                          end: 259,
                                          name: "otherStuff"
                                        }
                                      }
                                    ]
                                  }
                                }
                              ],
                              kind: "const"
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            type: "TryStatement",
            start: 282,
            end: 324,
            block: {
              type: "BlockStatement",
              start: 286,
              end: 315,
              body: [
                {
                  type: "ExpressionStatement",
                  start: 294,
                  end: 309,
                  expression: {
                    type: "CallExpression",
                    start: 294,
                    end: 309,
                    callee: {
                      type: "MemberExpression",
                      start: 294,
                      end: 307,
                      object: {
                        type: "Identifier",
                        start: 294,
                        end: 300,
                        name: "BigInt"
                      },
                      property: {
                        type: "Identifier",
                        start: 301,
                        end: 307,
                        name: "method"
                      },
                      computed: false
                    },
                    arguments: []
                  }
                }
              ]
            },
            handler: {
              type: "CatchClause",
              start: 316,
              end: 324,
              param: null,
              body: {
                type: "BlockStatement",
                start: 322,
                end: 324,
                body: []
              }
            },
            finalizer: null
          }
        ]
      }
    }
  ],
  sourceType: "module"
}
test(testCode, ast)

test("import('a').then(() => {import.meta.hooray()})", {
  type: "Program",
  start: 0,
  end: 46,
  body: [
    {
      type: "ExpressionStatement",
      start: 0,
      end: 46,
      expression: {
        type: "CallExpression",
        start: 0,
        end: 46,
        callee: {
          type: "MemberExpression",
          start: 0,
          end: 16,
          object: {
            type: "CallExpression",
            start: 0,
            end: 11,
            callee: {
              type: "Import",
              start: 0,
              end: 6
            },
            arguments: [
              {
                type: "Literal",
                start: 7,
                end: 10,
                value: "a",
                raw: "'a'"
              }
            ]
          },
          property: {
            type: "Identifier",
            start: 12,
            end: 16,
            name: "then"
          },
          computed: false
        },
        arguments: [
          {
            type: "ArrowFunctionExpression",
            start: 17,
            end: 45,
            id: null,
            generator: false,
            expression: false,
            async: false,
            params: [],
            body: {
              type: "BlockStatement",
              start: 23,
              end: 45,
              body: [
                {
                  type: "ExpressionStatement",
                  start: 24,
                  end: 44,
                  expression: {
                    type: "CallExpression",
                    start: 24,
                    end: 44,
                    callee: {
                      type: "MemberExpression",
                      start: 24,
                      end: 42,
                      object: {
                        type: "MetaProperty",
                        start: 24,
                        end: 35,
                        meta: {
                          type: "Identifier",
                          start: 24,
                          end: 30,
                          name: "import"
                        },
                        property: {
                          type: "Identifier",
                          start: 31,
                          end: 35,
                          name: "meta"
                        }
                      },
                      property: {
                        type: "Identifier",
                        start: 36,
                        end: 42,
                        name: "hooray"
                      },
                      computed: false
                    },
                    arguments: []
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ],
  sourceType: "module"
})
