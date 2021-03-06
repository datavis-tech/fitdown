import { timeParse, timeFormat } from "d3-time-format";

const parseDate = timeParse("%B %d, %Y");
const formatDate = timeFormat("%m/%d/%Y");

const contains = (line, symbol) => ~line.indexOf(symbol);

const parsePoundage = (line) => +line.match(/[0-9]*lb/)[0].replace("lb", "");

export const parse = (rawText) => {
  const lines = rawText.split("\n").map((line) => line.trim());

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

      const hasTextAfterNumbers = numbersAfterAt[0].length < afterAt.length;
      if (hasTextAfterNumbers) {
        const textAfterNumbers = afterAt
          .substring(numbersAfterAt[0].length)
          .trim();
        row[exercise ? "notes" : "exercise"] = textAfterNumbers;
      }

      if (date) {
        row.date = date;
      }
      for (let i = 0; i < multiplier; i++) {
        rows.push(row);
      }
    } else if (contains(line, "Workout")) {
      date = formatDate(parseDate(line.replace("Workout", "").trim()));
    } else if (contains(line, "lb")) {
      rows.push({ exercise, notes: line, poundage: parsePoundage(line) });
    } else if (line === "") {
      exercise = null;
    } else {
      exercise = line;
    }
  });

  return rows;
};
