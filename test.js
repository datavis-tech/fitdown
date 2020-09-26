const assert = require("assert");
const { parse } = require(".");

describe("parse", function () {
  const squatSet = { exercise: "Squat", reps: 5, poundage: 165 };
  const curlSet = { exercise: "Curl", reps: 8, poundage: 30 };

  const twoSquatSets = [squatSet, squatSet];
  const threeSquatSets = [squatSet, squatSet, squatSet];
  const fourSquatSets = [squatSet, squatSet, squatSet, squatSet];

  it("should parse an exercise with sets and reps", () => {
    assert.deepEqual(parse("Squat\n5@165"), [squatSet]);
    assert.deepEqual(parse("Curl\n8@30"), [curlSet]);
  });

  it("should ignore white space", () => {
    assert.deepEqual(parse("  \n Curl  \n  8 @ 30  \n "), [curlSet]);
  });

  it("should parse multiple exercises", () => {
    assert.deepEqual(parse("Squat\n5@165\nSquat\n5@165"), twoSquatSets);
    assert.deepEqual(parse("Squat\n5@165\n\nSquat\n5@165"), twoSquatSets);
    assert.deepEqual(parse("Squat\n5@165\n5@165"), twoSquatSets);
  });

  it("should parse an exercise with multiplier as 'x'", () => {
    assert.deepEqual(parse("Squat\n2x5@165"), twoSquatSets);
    assert.deepEqual(parse("Squat\n3x5@165"), threeSquatSets);
  });

  it("should parse an exercise with multiplier as 'X'", () => {
    assert.deepEqual(parse("Squat\n4x5@165"), fourSquatSets);
  });

  it("should parse a workout date", () => {
    assert.deepEqual(parse("Workout September 16, 2020\nSquat\n5@165"), [
      { ...squatSet, date: "09/16/2020" },
    ]);
  });

  it("should parse a loosely formatted exercise", () => {
    assert.deepEqual(
      parse(`
        Snatch
        Up to technique bar + 35lb each side
      `),
      [
        {
          exercise: "Snatch",
          poundage: 35,
          notes: "Up to technique bar + 35lb each side",
        },
      ]
    );

    assert.deepEqual(
      parse(`
        Clean and Jerk
        Up to 145lb
      `),
      [
        {
          exercise: "Clean and Jerk",
          poundage: 145,
          notes: "Up to 145lb",
        },
      ]
    );
  });

  it("should parse a single-line exercise", () => {
    assert.deepEqual(parse("5@165 Squat"), [squatSet]);
    assert.deepEqual(parse("8@30 Curl"), [curlSet]);
  });

  it("should parse mixed single-line and multi-line exercises", () => {
    // This test demonstrates that if there is no blank line, the text is considered a note.
    assert.deepEqual(
      parse(`
        Squat
        5@165
        8@30 Curl
      `),
      [squatSet, { exercise: "Squat", reps: 8, poundage: 30, notes: "Curl" }]
    );
    assert.deepEqual(
      parse(`
        Squat
        5@165

        8@30 Curl
      `),
      [squatSet, curlSet]
    );
  });
});
