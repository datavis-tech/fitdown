const assert = require("assert");
const { parse } = require(".");

describe("parse", function () {
  const squatSet = { exercise: "Squat", reps: 5, poundage: 165 };
    const twoSquatSets = [squatSet, squatSet];
    const threeSquatSets = [squatSet, squatSet, squatSet];
    const fourSquatSets = [squatSet, squatSet, squatSet, squatSet];

  it("should parse an exercise with sets and reps", () => {
    assert.deepEqual(parse("Squat\n5@165"), [squatSet]);
    assert.deepEqual(parse("   Squat\n5@165   "), [squatSet]);
  });

  it("should parse multiple exercises", () => {
    assert.deepEqual(parse("Squat\n5@165\nSquat\n5@165"), twoSquatSets);
    assert.deepEqual(parse("Squat\n5@165\n\nSquat\n5@165"), twoSquatSets);
  });

  it("should parse an exercise with multiplier as 'x'", () => {
    assert.deepEqual(parse("Squat\n2x5@165"), twoSquatSets);
    assert.deepEqual(parse("Squat\n3x5@165"), threeSquatSets);
  });

  it("should parse an exercise with multiplier as 'X'", () => {
    assert.deepEqual(parse("Squat\n4x5@165"), fourSquatSets);
  });
});
