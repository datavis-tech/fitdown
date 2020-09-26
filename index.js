import { timeParse, timeFormat } from "d3-time-format";

const parseDate = timeParse("%B %d, %Y");
const formatDate = timeFormat("%m/%d/%Y");

const contains = (line, symbol) => ~line.indexOf(symbol);

export const parse = (rawText) => {
  const lines = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  let exercise;

  let date;

  const rows = [];

  lines.forEach((line) => {
    if (contains(line, "@")) {
      let reps, poundage, multiplier, notes;
      const [beforeAt, afterAt] = line.split("@").map((str) => str.trim());
      const beforeAtLowerCase = beforeAt.toLowerCase();
      if (contains(beforeAtLowerCase, "x")) {
        const [beforeX, afterX] = beforeAtLowerCase.split("x");
        multiplier = +beforeX;
        reps = +afterX;
      } else {
        multiplier = 1;
        reps = +beforeAt;
      }
      const numbersAfterAt = afterAt.match(/[0-9]*/);
      poundage = +numbersAfterAt[0];

      const row = { exercise, reps, poundage };
      if (numbersAfterAt[0].length < afterAt.length) {
        row.notes = afterAt.substring(numbersAfterAt[0].length);
      }
      if (date) {
        row.date = date;
      }
      for (let i = 0; i < multiplier; i++) {
        rows.push(row);
      }
    } else if (contains(line, "Workout")) {
      date = formatDate(parseDate(line.replace("Workout", "").trim()));
    } else {
      exercise = line;
    }
  });

  return rows;
};
