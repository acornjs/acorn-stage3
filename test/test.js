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
  }`

const result = acorn.parse(testCode, { plugins: { stage3: true }, ecmaVersion: 9 })

assert(result)
