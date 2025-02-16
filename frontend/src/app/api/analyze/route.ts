import { NextResponse } from "next/server";
import { TextGeneration } from "deepinfra";

const MODEL_URL = 'https://api.deepinfra.com/v1/inference/deepseek-ai/DeepSeek-V3';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.NEXT_PRIVATE_DEEPINFRA_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'DEEPINFRA_API_KEY is not configured.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { jobPosting } = body;

    // Debug: Verify the API key is set
    console.log('DEEPINFRA_API_KEY:', apiKey.substring(0, 4) + '...' + apiKey.substring(-4));

    const client = new TextGeneration(MODEL_URL, apiKey);
    const res = await client.generate({
      "input": `<\uff5cbegin\u2581of\u2581sentence\uff5c><\uff5cUser\uff5c>: 
      Analyze the following job posting for misleading content. Rate it on a scale of 1 (not misleading) to 5 (very misleading). 
      Provide a short explanation why it received this rating.

      Job Posting:
      ${jobPosting}

      Please respond in this format EXACTLY, IN PLAIN TEXT! NO MARKDOWN!:
      Rating: [number between 1-5]
      Feedback: [your explanation here]

      <\uff5cAssistant\uff5c>:`,
      "stop": [
        "</s>"
      ]
    });

    // Debug: Log the raw response
    console.log('AI Response:', res.results[0].generated_text);

    const response = res.results[0].generated_text;

    const ratingRegex = /Rating:\s*(\d+)/;
    const feedbackRegex = /Feedback:\s*(.*)/;

    const ratingMatch = response.match(ratingRegex);
    const feedbackMatch = response.match(feedbackRegex);

    if (!ratingMatch || !feedbackMatch) {
      console.error('Failed to parse AI response:', response);
      return NextResponse.json({ success: false, error: 'Failed to parse AI response.' });
    }

    const rating = parseInt(ratingMatch[1], 10);
    if (isNaN(rating)) {
      console.error('Invalid rating value:', ratingMatch[1]);
      return NextResponse.json({ success: false, error: 'Invalid rating received.' });
    }

    const feedback = feedbackMatch[1];

    return NextResponse.json({success: true, rating, feedback });

  } catch (error) {
    console.error('Error in analyze API route:', error);
    if (error instanceof Error) {
      console.error('Stack trace:', error.stack);
    }
    return NextResponse.json(
      { success: false, error: 'Error analyzing job posting:', message: String(error) },
      { status: 500 }
    );
  }
}
