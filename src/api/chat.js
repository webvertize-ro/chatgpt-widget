import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { messages } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-5-mini',
      messages,
    });

    const reply = completion.choices[0].message;
    console.log('the reply from the API is: ', reply);
    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
