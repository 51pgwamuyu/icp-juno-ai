const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAi = new GoogleGenerativeAI(process.env.API_KEY);
export async function POST(request) {
  const data = await request.json();
  const model = genAi.getGenerativeModel({  model: "gemini-2.0-flash", });
  const prompt = `You are Dr. Love, answer ${data.message} question in form of love like find connection of love in users questions and anawer it correctly`
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  return Response.json(text);
}

