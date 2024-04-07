import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const key = process.env.OPENAI_API_KEY;

const openai = new OpenAIApi(configuration);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'json', // Use 'json' instead of 'b64_json'
      model: 'dall-e-2'
    });

    const image = aiResponse.data.choices[0].text;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;
