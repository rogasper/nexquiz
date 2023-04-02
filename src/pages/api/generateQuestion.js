import { Configuration, OpenAIApi } from "openai";
import { desctructureText } from "../../helpers/desctructure";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const buatSoal = async (teks) => {
  const text = `buatlah beberapa soal pilihan ganda dari teks dengan tipe soal analisis dan evaluasi. dengan format: { 1. ini pertanyaaan?; a. jawaban1; b. jawaban2; c. jawaban3 (correct); d. jawaban4; e.jawaban5; }
  ----
    ${teks}
  ----`;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0.86,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
    });

    return response.data.choices[0].text;
  } catch (err) {
    console.error(err);
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { teks } = req.body;
      const prompt = await buatSoal(teks);
      const data = desctructureText(prompt);

      res.status(200).json({
        data,
      });
      break;
    case "GET":
      res.status(200).json({
        message: "ini generate quiz",
      });
      break;
    default:
      break;
  }
}
