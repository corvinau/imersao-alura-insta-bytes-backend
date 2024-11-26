import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export default async function geminiGenerateDescription(imageBuffer, typeText) {
  const prompt = `Gere um texto ${typeText} em português do brasil para a seguinte imagem`;

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString('base64'),
        mimeType: 'image/jpg',
      },
    };

    const res = await model.generateContent([prompt, image]);

    return res.response.text() || 'Texto não disponível.';
  } catch (erro) {
    console.error('Erro ao obter texto:', erro.message, erro);
    throw new Error('Erro ao obter o texto do Gemini.');
  }
}
