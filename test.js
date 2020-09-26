const assert = require("assert");
const { parse } = require(".");

describe("parse", function () {
  const squatSet = { exercise: "Squat", reps: 5, poundage: 165 };
  it("should parse an exercise with sets and reps", () => {
    assert.deepEqual(parse("Squat\n5@165"), [squatSet]);
  });
  describe("should parse an exercise with a multiplier", () => {
    const threeSquatSets = [squatSet, squatSet, squatSet];
    it("multiplier as 'x'", () => {
      assert.deepEqual(parse("Squat\n3x5@165"), threeSquatSets);
    });
    it("multiplier as 'X'", () => {
      assert.deepEqual(parse("Squat\n3x5@165"), threeSquatSets);
    });
  });
});
