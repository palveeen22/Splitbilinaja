import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("API key is not set");
      return NextResponse.json({ 
        code: 500, 
        message: 'Server configuration error' 
      }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const body = await req.json();
    const { message } = body;

    if (!message || !message) {
      return NextResponse.json({ 
        code: 400, 
        message: 'Missing prompt in request body' 
      }, { status: 400 });
    }

    const parts = [{ text: message }];

    console.log("Sending request to Google Generative AI with parts:", parts);

    const result = await model.generateContent(parts);
    console.log("Received response from Google Generative AI:", result?.response?.text);

    if (!result.response) {
      return NextResponse.json({ 
        code: 500, 
        message: 'No response from AI model' 
      }, { status: 500 });
    }

    const output = result.response.text();

    return NextResponse.json({ 
      code: 200, 
      message: 'Successfully processed prompt', 
      data: output 
    }, { status: 200 });

  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json({ 
      code: 500, 
      message: 'An error occurred while processing the request',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}