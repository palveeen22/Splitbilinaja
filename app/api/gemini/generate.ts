import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("in");
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const { body } = req.body;

    console.log(body);

    if (!body) {
      return res.status(400).json({ message: 'Missing prompt in request body' });
    }

    const result = await model.generateContent(body);
    const output = result.response.text();

    res.status(200).json({ 
      code: 200, 
      message: 'Successfully processed prompt', 
      data: output 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      code: 500, 
      message: 'An error occurred while processing the request',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export default handler;