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
  let cekSoal = [];

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
  cekSoal = cekJawaban(result);
  if (cekSoal.length > 0) {
    result = [];
    return result;
  }
  return result;
};

// cek ada jawaban true tidak
const cekJawaban = (questions) => {
  const tidakAdaJawabanBenar = [];
  for (let index = 0; index < questions.length; index++) {
    let isCorrectAnswerFound = false;
    for (let cek = 0; cek < questions[index].opsiJawaban.length; cek++) {
      if (questions[index].opsiJawaban[cek].isCorrect === true) {
        isCorrectAnswerFound = true;
        console.log("Soal " + (index + 1) + " memiliki jawaban yang benar.");
        break; // menghentikan perulangan setelah menemukan jawaban yang benar
      }
    }
    if (!isCorrectAnswerFound) {
      tidakAdaJawabanBenar.push(index);
    }
  }

  return tidakAdaJawabanBenar;
};
