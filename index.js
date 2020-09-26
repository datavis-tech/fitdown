const contains = (line, symbol) => ~line.indexOf(symbol);

export const parse = (rawText) => {
  const lines = rawText.split("\n").filter((line) => line.trim() !== "");
  let exercise;
  const rows = [];

  lines.forEach((line) => {
    if (contains(line, "@")) {
      let reps, poundage, multiplier, notes;
      const [beforeAt, afterAt] = line.split("@");
      if (contains(beforeAt, "x")) {
        const [beforeX, afterX] = beforeAt.toLowerCase().split("x");
        multiplier = +beforeX;
        reps = +afterX;
      } else {
        multiplier = 1;
        reps = +beforeAt;
      }
      const numbersAfterAt = afterAt.match(/[0-9]*/);
      poundage = +numbersAfterAt[0];
      if (numbersAfterAt[0].length < afterAt.length) {
        notes = afterAt.substring(numbersAfterAt[0].length).trim();
      }
      for (let i = 0; i < multiplier; i++) {
        rows.push({ exercise, reps, poundage, notes });
      }
    } else {
      exercise = line.trim();
    }
  });
  return rows;
};
