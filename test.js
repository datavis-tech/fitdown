const assert = require("assert");
const { parse } = require(".");

describe("parse", function () {
  it("should be a function", function () {
    assert(typeof parse === "function");
  });
});
