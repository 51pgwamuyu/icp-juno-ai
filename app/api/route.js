const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAi = new GoogleGenerativeAI(process.env.API_KEY);
export async function POST(request) {
  const data = await request.json();
  console.log("Data received:", data.message);
  const model = genAi.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `find love and connection from users input thats is  ${data.message} and shouldsimple dont be repetitive of users input and organise response`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();


  return Response.json(text);
}