const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Make sure to set this in your .env file
});
const openai = new OpenAIApi(configuration);

exports.generateNegotiation = async (req, res) => {
  const { billDetails, tone } = req.body;

  try {
    const prompt = `
You are an expert negotiator. Write a message to help the user reduce or waive this bill. Be clear, professional, and persuasive.
TONE: ${tone || "Polite and firm"}
BILL DETAILS: ${billDetails}

Generate a negotiation message:
    `;

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const message = response.data.choices[0].message.content;
    res.status(200).json({ negotiation: message });
  } catch (error) {
    console.error("GPT API error:", error);
    res.status(500).json({ error: "Failed to generate negotiation message." });
  }
};