export const desctructureText = (teks) => {
  let baris = teks.replace(/\n/g, ";");
  const dataArray = baris.split(";");
  const filterArray = dataArray.filter((str) => str.trim() !== "");

  let result = [];
  let obj = {
    soal: "",
    opsiJawaban: [],
  };
  let opsiJawaban = {
    teks: "",
    isCorrect: false,
  };

  let soal = "";
  let jawaban = "";
  let isCorrect = false;

  for (let i = 0; i < filterArray.length; i++) {
    if (i % 6 === 0) {
      obj = {
        soal: "",
        opsiJawaban: [],
      };
      soal = filterArray[i];
      obj.soal = soal;
    } else {
      jawaban = filterArray[i];
      if (jawaban.includes("(correct)")) {
        isCorrect = true;
        jawaban = jawaban.replace("(correct)", "");
      } else {
        isCorrect = false;
      }
      opsiJawaban = {
        teks: jawaban,
        isCorrect: isCorrect,
      };
      obj.opsiJawaban.push(opsiJawaban);
      if (i % 6 === 5) {
        result.push(obj);
      }
    }
  }

  return result;
};
