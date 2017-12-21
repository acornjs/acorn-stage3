"use strict"

const assert = require("assert")

const acorn = require("..")

const testCode = `
  async function* x() {
    let value = 1_000_000n + 0xdead_beefn
    for await (const { a, ...y } in z) {
      import(a).then(({ interestingThing, ...otherStuff }) => {
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
  end: 283,
  body: [
    {
      type: "FunctionDeclaration",
      start: 3,
      end: 283,
      id: {
        type: "Identifier",
        start: 19,
        end: 20,
        name: "x"
      },
      generator: true,
      expression: false,
      async: true,
      params: [

      ],
      body: {
        type: "BlockStatement",
        start: 23,
        end: 283,
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
            end: 232,
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
              end: 232,
              body: [
                {
                  type: "ExpressionStatement",
                  start: 114,
                  end: 226,
                  expression: {
                    type: "CallExpression",
                    start: 114,
                    end: 225,
                    callee: {
                      type: "MemberExpression",
                      start: 114,
                      end: 128,
                      object: {
                        type: "CallExpression",
                        start: 114,
                        end: 123,
                        callee: {
                          type: "Import",
                          start: 114,
                          end: 120
                        },
                        arguments: [
                          {
                            type: "Identifier",
                            start: 121,
                            end: 122,
                            name: "a"
                          }
                        ]
                      },
                      property: {
                        type: "Identifier",
                        start: 124,
                        end: 128,
                        name: "then"
                      },
                      computed: false
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        start: 129,
                        end: 224,
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [
                          {
                            type: "ObjectPattern",
                            start: 130,
                            end: 165,
                            properties: [
                              {
                                type: "Property",
                                start: 132,
                                end: 148,
                                method: false,
                                shorthand: true,
                                computed: false,
                                key: {
                                  type: "Identifier",
                                  start: 132,
                                  end: 148,
                                  name: "interestingThing"
                                },
                                kind: "init",
                                value: {
                                  type: "Identifier",
                                  start: 132,
                                  end: 148,
                                  name: "interestingThing"
                                }
                              },
                              {
                                type: "RestElement",
                                start: 150,
                                end: 163,
                                argument: {
                                  type: "Identifier",
                                  start: 153,
                                  end: 163,
                                  name: "otherStuff"
                                }
                              }
                            ]
                          }
                        ],
                        body: {
                          type: "BlockStatement",
                          start: 170,
                          end: 224,
                          body: [
                            {
                              type: "VariableDeclaration",
                              start: 180,
                              end: 216,
                              declarations: [
                                {
                                  type: "VariableDeclarator",
                                  start: 186,
                                  end: 216,
                                  id: {
                                    type: "Identifier",
                                    start: 186,
                                    end: 190,
                                    name: "data"
                                  },
                                  init: {
                                    type: "ObjectExpression",
                                    start: 193,
                                    end: 216,
                                    properties: [
                                      {
                                        type: "SpreadElement",
                                        start: 195,
                                        end: 199,
                                        argument: {
                                          type: "Identifier",
                                          start: 198,
                                          end: 199,
                                          name: "y"
                                        }
                                      },
                                      {
                                        type: "SpreadElement",
                                        start: 201,
                                        end: 214,
                                        argument: {
                                          type: "Identifier",
                                          start: 204,
                                          end: 214,
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
            start: 237,
            end: 279,
            block: {
              type: "BlockStatement",
              start: 241,
              end: 270,
              body: [
                {
                  type: "ExpressionStatement",
                  start: 249,
                  end: 264,
                  expression: {
                    type: "CallExpression",
                    start: 249,
                    end: 264,
                    callee: {
                      type: "MemberExpression",
                      start: 249,
                      end: 262,
                      object: {
                        type: "Identifier",
                        start: 249,
                        end: 255,
                        name: "BigInt"
                      },
                      property: {
                        type: "Identifier",
                        start: 256,
                        end: 262,
                        name: "method"
                      },
                      computed: false
                    },
                    arguments: [

                    ]
                  }
                }
              ]
            },
            handler: {
              type: "CatchClause",
              start: 271,
              end: 279,
              param: null,
              body: {
                type: "BlockStatement",
                start: 277,
                end: 279,
                body: [

                ]
              }
            },
            finalizer: null
          }
        ]
      }
    }
  ],
  sourceType: "script"
}

const result = acorn.parse(testCode, { plugins: { stage3: true }, ecmaVersion: 9 })

assert.deepEqual(result, ast)
