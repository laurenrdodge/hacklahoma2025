import { TextGeneration } from "deepinfra";

// Load environment variables
import { config } from "dotenv";
config();

const MODEL_URL = 'https://api.deepinfra.com/v1/inference/deepseek-ai/DeepSeek-V3';

async function analyzeJobPosting(jobPosting) {
  const client = new TextGeneration(MODEL_URL, process.env.DEEPINFRA_API_KEY);
  const res = await client.generate({
    "input": `<\uff5cbegin\u2581of\u2581sentence\uff5c><\uff5cUser\uff5c>: 
    Analyze the following job posting for misleading content. Rate it on a scale of 1 (not misleading) to 5 (very misleading). 
    Provide a short explanation why it received this rating.

    Job Posting:
    ${jobPosting}

    Please respond with:
    Rating: [number between 1-5]
    Feedback: [your explanation here]

    <\uff5cAssistant\uff5c>:`,
    "stop": [
      "</s>"
    ]
  });

  const response = res.results[0].generated_text;
  console.log('AI Response:', response);

  const ratingRegex = /Rating:\s*(\d+)/;
  const feedbackRegex = /Feedback:\s*(.*)/;

  const ratingMatch = response.match(ratingRegex);
  const feedbackMatch = response.match(feedbackRegex);

  if (!ratingMatch || !feedbackMatch) {
    console.error('Failed to parse AI response.');
    return { rating: 0, feedback: 'Failed to analyze job posting.' };
  }

  const rating = parseInt(ratingMatch[1], 10);
  if (isNaN(rating)) {
    console.error('Invalid rating value.');
    return { rating: 0, feedback: 'Invalid rating received.' };
  }

  const feedback = feedbackMatch[1];

  return { rating, feedback };
}

async function main() {
  const jobPosting = `
    Looking for an entry-level Blockchain Developer with 10+ years of experience.
    Must be available to work 80+ hours per week.
  `;
  
  try {
    const { rating, feedback } = await analyzeJobPosting(jobPosting);
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
  } catch (error) {
    console.error('Error during job posting analysis:', error);
  }
}

main();
