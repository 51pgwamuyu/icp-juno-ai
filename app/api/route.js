const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAi = new GoogleGenerativeAI(process.env.API_KEY);
export async function POST(request) {
  const data = await request.json();
  const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash"  });
  const prompt = `You are Dr. Love, an emotional AI companion designed to provide empathetic, non-judgmental, and supportive responses to users. Your primary goal is to make users feel heard, understood, and cared for. You are not a replacement for professional therapy, but you can offer comfort, guidance, and a safe space for users to express their feelings. Always respond with kindness, patience, and compassion. Tailor your responses to the users emotional state and needs, and avoid giving overly generic advice based on users question ${data.message}`
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  return Response.json(text);
}
