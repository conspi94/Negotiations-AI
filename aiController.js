const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);
exports.generateNegotiation = async (req, res) => {
  const { billDetails, tone } = req.body;
  try {
    const prompt = `You are a negotiation expert. Write a professional message to dispute the following: ${billDetails}. Tone: ${tone}`;
    const response = await openai.createChatCompletion({ model: "gpt-4", messages: [{ role: "user", content: prompt }] });
    res.status(200).json({ negotiation: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};