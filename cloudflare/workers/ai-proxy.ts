import { Request, Response } from '@cloudflare/workers-types';

interface JobAnalysis {
  score: number;
  feedback: string;
}

declare const ENV: {
  DEEPINFRA_KEY: string;
};

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      const body = await request.json() as { text: string };
      const { text } = body;

      if (!text) {
        return Response.json({ error: 'Missing job listing text' }, { status: 400 });
      }

      // Validate origin to prevent misuse
      const origin = request.headers.get('Origin');
      if (!origin?.includes('localhost') && !origin?.includes('your-domain.com')) {
        return Response.json({ error: 'Unauthorized origin' }, { status: 403 });
      }

      // Make request to DeepInfra API
      const deepInfraResponse = await self.fetch('https://api.deepinfra.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ENV.DEEPINFRA_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{
            role: 'user',
            content: `Analyze this job listing for misleading content. Rate it out of 5 (5 being most misleading) and provide feedback for improvement. Listing: ${text}`
          }]
        })
      });

      if (!deepInfraResponse.ok) {
        return Response.json({ error: 'AI analysis failed' }, { status: 500 });
      }

      const analysis: JobAnalysis = await deepInfraResponse.json();
      
      return Response.json({
        score: analysis.score,
        feedback: analysis.feedback
      });

    } catch (error) {
      console.error('Error processing request:', error);
      return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
};
