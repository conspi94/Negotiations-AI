const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateNegotiation = async (req, res) => {
  const { billDetails, tone } = req.body;

  try {
    const prompt = `
You are a negotiation expert. Write a professional message to dispute the following:

Bill Details: ${billDetails}
Tone: ${tone}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const message = response.choices[0].message.content;
    res.status(200).json({ negotiation: message });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Failed to generate negotiation." });
  }
};
