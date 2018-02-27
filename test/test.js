"use strict"

const assert = require("assert")

const acorn = require("..")

const parse = testCode => acorn.parse(testCode, { plugins: { stage3: true }, ecmaVersion: 9, sourceType: "module" })

function test(testCode, ast) {
  it(testCode, () => {
    const result = parse(testCode)
    assert.deepEqual(result, ast)
  })
}

describe("acorn-stage3", () => {
  it("Doesn't break check for comma after rest element", () => {
    assert.throws(() => parse("0, {...rest, b} = {}"))
  })

  const testCode = `async function* xxyz() {
    let value = 1_000_000n + 0xdead_beefn
    for await (const { a, ...y } of z) {
      import(import.meta.resolve(a).replace(/.css$/, ".js")).then(({ interestingThing, ...otherStuff }) => {
        const data = { ...y, ...otherStuff }
      });
    }

    try {
      BigInt.method()
    } catch {}

    class A {
      #a = 5_5n;
      #getA() { return this.#a * 5 }
    }
  }`

  const maybeBigInt = str => typeof BigInt !== "undefined" && BigInt.parseInt ? BigInt.parseInt(str) : null

  const ast = {
    type: "Program",
    start: 0,
    end: 404,
    body: [
      {
        type: "FunctionDeclaration",
        start: 0,
        end: 404,
        id: {
          type: "Identifier",
          start: 16,
          end: 20,
          name: "xxyz"
        },
        generator: true,
        expression: false,
        async: true,
        params: [],
        body: {
          type: "BlockStatement",
          start: 23,
          end: 404,
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
              type: "ForOfStatement",
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
                                  raw: "/.css$/",
                                  regex: {
                                    pattern: ".css$",
                                    flags: ""
                                  },
                                  value: /.css$/
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
              start: 283,
              end: 325,
              block: {
                type: "BlockStatement",
                start: 287,
                end: 316,
                body: [
                  {
                    type: "ExpressionStatement",
                    start: 295,
                    end: 310,
                    expression: {
                      type: "CallExpression",
                      start: 295,
                      end: 310,
                      callee: {
                        type: "MemberExpression",
                        start: 295,
                        end: 308,
                        object: {
                          type: "Identifier",
                          start: 295,
                          end: 301,
                          name: "BigInt"
                        },
                        property: {
                          type: "Identifier",
                          start: 302,
                          end: 308,
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
                start: 317,
                end: 325,
                param: null,
                body: {
                  type: "BlockStatement",
                  start: 323,
                  end: 325,
                  body: []
                }
              },
              finalizer: null
            },
            {
              type: "ClassDeclaration",
              start: 331,
              end: 400,
              id: {
                type: "Identifier",
                start: 337,
                end: 338,
                name: "A"
              },
              superClass: null,
              body: {
                type: "ClassBody",
                start: 339,
                end: 400,
                body: [
                  {
                    type: "FieldDefinition",
                    start: 347,
                    end: 356,
                    computed: false,
                    key: {
                      type: "PrivateName",
                      start: 347,
                      end: 349,
                      name: "a"
                    },
                    value: {
                      type: "Literal",
                      start: 352,
                      end: 356,
                      value: maybeBigInt("55"),
                      raw: "5_5n",
                      bigint: "5_5n"
                    }
                  },
                  {
                    type: "MethodDefinition",
                    start: 364,
                    end: 394,
                    kind: "method",
                    static: false,
                    computed: false,
                    key: {
                      type: "PrivateName",
                      start: 364,
                      end: 369,
                      name: "getA"
                    },
                    value: {
                      type: "FunctionExpression",
                      start: 369,
                      end: 394,
                      id: null,
                      generator: false,
                      expression: false,
                      async: false,
                      params: [],
                      body: {
                        type: "BlockStatement",
                        start: 372,
                        end: 394,
                        body: [
                          {
                            type: "ReturnStatement",
                            start: 374,
                            end: 392,
                            argument: {
                              type: "BinaryExpression",
                              start: 381,
                              end: 392,
                              left: {
                                type: "MemberExpression",
                                start: 381,
                                end: 388,
                                object: {
                                  type: "ThisExpression",
                                  start: 381,
                                  end: 385
                                },
                                property: {
                                  type: "PrivateName",
                                  start: 386,
                                  end: 388,
                                  name: "a"
                                },
                                computed: false
                              },
                              operator: "*",
                              right: {
                                type: "Literal",
                                start: 391,
                                end: 392,
                                value: 5,
                                raw: "5"
                              }
                            }
                          }
                        ]
                      }
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

  test(`class A {
    #secret = this.#default
    #default = "defau\u2028\u2029"

    #getSecret() { return this.#secret }

    getSecretProvider() {
      return new (class {
        #secret
        constructor(secret) {
          this.#secret = secret
        }
      })(this.#getSecret())
    }
  }`, {
    type: "Program",
    start: 0,
    end: 283,
    body: [
      {
        type: "ClassDeclaration",
        start: 0,
        end: 283,
        id: {
          type: "Identifier",
          start: 6,
          end: 7,
          name: "A"
        },
        superClass: null,
        body: {
          type: "ClassBody",
          start: 8,
          end: 283,
          body: [
            {
              type: "FieldDefinition",
              start: 14,
              end: 37,
              computed: false,
              key: {
                type: "PrivateName",
                start: 14,
                end: 21,
                name: "secret"
              },
              value: {
                type: "MemberExpression",
                start: 24,
                end: 37,
                object: {
                  type: "ThisExpression",
                  start: 24,
                  end: 28
                },
                property: {
                  type: "PrivateName",
                  start: 29,
                  end: 37,
                  name: "default"
                },
                computed: false
              }
            },
            {
              type: "FieldDefinition",
              start: 42,
              end: 62,
              computed: false,
              key: {
                type: "PrivateName",
                start: 42,
                end: 50,
                name: "default"
              },
              value: {
                type: "Literal",
                start: 53,
                end: 62,
                value: "defau\u2028\u2029",
                raw: "\"defau\u2028\u2029\""
              }
            },
            {
              type: "MethodDefinition",
              start: 68,
              end: 104,
              kind: "method",
              static: false,
              computed: false,
              key: {
                type: "PrivateName",
                start: 68,
                end: 78,
                name: "getSecret"
              },
              value: {
                type: "FunctionExpression",
                start: 78,
                end: 104,
                id: null,
                generator: false,
                expression: false,
                async: false,
                params: [],
                body: {
                  type: "BlockStatement",
                  start: 81,
                  end: 104,
                  body: [
                    {
                      type: "ReturnStatement",
                      start: 83,
                      end: 102,
                      argument: {
                        type: "MemberExpression",
                        start: 90,
                        end: 102,
                        object: {
                          type: "ThisExpression",
                          start: 90,
                          end: 94
                        },
                        property: {
                          type: "PrivateName",
                          start: 95,
                          end: 102,
                          name: "secret"
                        },
                        computed: false
                      }
                    }
                  ]
                }
              }
            },
            {
              type: "MethodDefinition",
              start: 110,
              end: 279,
              kind: "method",
              static: false,
              computed: false,
              key: {
                type: "Identifier",
                start: 110,
                end: 127,
                name: "getSecretProvider"
              },
              value: {
                type: "FunctionExpression",
                start: 127,
                end: 279,
                id: null,
                generator: false,
                expression: false,
                async: false,
                params: [],
                body: {
                  type: "BlockStatement",
                  start: 130,
                  end: 279,
                  body: [
                    {
                      type: "ReturnStatement",
                      start: 138,
                      end: 273,
                      argument: {
                        type: "NewExpression",
                        start: 145,
                        end: 273,
                        callee: {
                          type: "ClassExpression",
                          start: 150,
                          end: 253,
                          id: null,
                          superClass: null,
                          body: {
                            type: "ClassBody",
                            start: 156,
                            end: 253,
                            body: [
                              {
                                type: "FieldDefinition",
                                start: 166,
                                end: 173,
                                computed: false,
                                key: {
                                  type: "PrivateName",
                                  start: 166,
                                  end: 173,
                                  name: "secret"
                                },
                                value: null
                              },
                              {
                                type: "MethodDefinition",
                                start: 182,
                                end: 245,
                                kind: "constructor",
                                static: false,
                                computed: false,
                                key: {
                                  type: "Identifier",
                                  start: 182,
                                  end: 193,
                                  name: "constructor"
                                },
                                value: {
                                  type: "FunctionExpression",
                                  start: 193,
                                  end: 245,
                                  id: null,
                                  generator: false,
                                  expression: false,
                                  async: false,
                                  params: [
                                    {
                                      type: "Identifier",
                                      start: 194,
                                      end: 200,
                                      name: "secret"
                                    }
                                  ],
                                  body: {
                                    type: "BlockStatement",
                                    start: 202,
                                    end: 245,
                                    body: [
                                      {
                                        type: "ExpressionStatement",
                                        start: 214,
                                        end: 235,
                                        expression: {
                                          type: "AssignmentExpression",
                                          start: 214,
                                          end: 235,
                                          operator: "=",
                                          left: {
                                            type: "MemberExpression",
                                            start: 214,
                                            end: 226,
                                            object: {
                                              type: "ThisExpression",
                                              start: 214,
                                              end: 218
                                            },
                                            property: {
                                              type: "PrivateName",
                                              start: 219,
                                              end: 226,
                                              name: "secret"
                                            },
                                            computed: false
                                          },
                                          right: {
                                            type: "Identifier",
                                            start: 229,
                                            end: 235,
                                            name: "secret"
                                          }
                                        }
                                      }
                                    ]
                                  }
                                }
                              }
                            ]
                          }
                        },
                        arguments: [
                          {
                            type: "CallExpression",
                            start: 255,
                            end: 272,
                            callee: {
                              type: "MemberExpression",
                              start: 255,
                              end: 270,
                              object: {
                                type: "ThisExpression",
                                start: 255,
                                end: 259
                              },
                              property: {
                                type: "PrivateName",
                                start: 260,
                                end: 270,
                                name: "getSecret"
                              },
                              computed: false
                            },
                            arguments: []
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    ],
    sourceType: "module"
  })
})
