import { Configuration, OpenAIApi } from "openai";
import { desctructureText } from "../../helpers/desctructure";

// const configuration = new Configuration({
//   apiKey: apiKey,
// });

// const openai = new OpenAIApi(configuration);

const buatSoal = async (teks, apiKey, isCode) => {
  let text;
  if (!isCode) {
    text = `buatlah 3 soal pilihan ganda dari teks dibawah. dengan format: { 1. ini pertanyaaan?; a. jawaban1; b. jawaban2; c. jawaban3 (correct); d. jawaban4; e.jawaban5; }
    --
      ${teks}
    --`;
  } else {
    text = `buatlah 5 soal pilihan ganda dari teks dibawah. dengan format: { 1. ini pertanyaaan?; a. jawaban1; b. jawaban2; c. jawaban3 (correct); d. jawaban4; e.jawaban5; }
    --
      ${teks}
    --`;
  }
  // console.log({ apiKey });
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: text,
        temperature: 0.86,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
      }),
    });
    const json = await response.json();
    return json.choices[0].text;
  } catch (error) {
    console.error(error);
  }

  // const text = `buatlah 2 soal pilihan ganda dari teks dibawah. dengan format: { 1. ini pertanyaaan?; a. jawaban1; b. jawaban2; c. jawaban3 (correct); d. jawaban4; e.jawaban5; }
  // --
  //   ${teks}
  // --`;

  // const response = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: text,
  //   temperature: 0.86,
  //   max_tokens: 3000,
  //   top_p: 1,
  //   frequency_penalty: 1,
  //   presence_penalty: 1,
  // });

  // return response.data.choices[0].text;
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const { teks, apiKey, isCode } = req.body;
        const prompt = await buatSoal(teks, apiKey, isCode);
        const data = desctructureText(prompt);

        if (data.length === 0) {
          res.status(500).json({
            data: "ULANG",
            message: "ULANG REGENERATE QUESTION",
          });
        } else {
          res.status(200).json({
            data: data,
          });
        }
      } catch (err) {
        console.log(err.status);
        if (err.status === 504) {
          res.status(504).json({
            data: "",
            message: "TIMEOUT COBALAH BEBERAPA SAAT LAGI",
          });
        } else {
          res.status(500).json({
            data: "",
            message: "API KEY TIDAK VALID SILAHKAN DIGANTI",
          });
        }
      }
      break;
    case "GET":
      res.status(200).json({
        message: "update environment",
      });
      break;
    default:
      break;
  }
}
