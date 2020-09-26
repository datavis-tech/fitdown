const assert = require("assert");
const { parse } = require(".");

describe("parse", function () {
  it("should parse an exercise", () => {
    assert.deepEqual(parse(`
      Squat
      5@165
    `), [
      {
        exercise: "Squat",
        reps: 5,
        poundage: 165,
notes:undefined
      },
    ]);
  });
});
