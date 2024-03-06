import { Configuration, OpenAIApi } from 'openai';
import { Request, Response, NextFunction } from 'express';
import { generateGPTPrompt, generateMistralPrompt } from '../utils/promptUtils';
import { APIController } from '../types';
import { KeyObject } from 'tls';

// OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Open Source LLM endpoint
const openSourceLLM = 'http://localhost:11434/api/generate';

// set true to avoid using OpenAI API, false to use OpenAI API$$
const testMode = false;

const APIController: APIController = {
  getAPIResult: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (testMode) {
        res.locals.recipe = `Test Mode Recipe: |
            Ingredients:
        
            - Test Ingredients
        
            Instructions:
        
            - Test Instructions

            - Test Instructions

            - Test Instructions

            - Test Instructions|
            Link: |https://www.testmodelink.com`;
        return next();
      }
      switch (res.locals.model) {

        case 'text-davinci-003':
          const gPTCompletion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: generateGPTPrompt(res.locals.ingredients),
            temperature: 0.7,
            max_tokens: 350,
          });
          res.locals.recipe = gPTCompletion.data.choices[0].text;
          break;

        case 'mistral:7b':
          const mistralCompletion = await fetch(openSourceLLM, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'mistral:7b',
              prompt: generateMistralPrompt(res.locals.ingredients),
              stream: false,
            }),
          });
          if (!mistralCompletion.ok) {
            throw new Error(`Fetch Error: ${mistralCompletion.status} ${mistralCompletion.statusText}`);
          }
          const mistralData = await mistralCompletion.json();
          res.locals.recipe = mistralData.response;
          break;

        default:
          throw new Error(`Invalid model: ${res.locals.model}`);
      }
      return next();
    } catch (error: unknown) {
      let errorMsg = `An error occurred with the ${res.locals.model} API request.`;
      if (error instanceof Error) {
        console.error(error.message);
        errorMsg = error.message;
      }
      return next(new Error(errorMsg));
    }
  },
};

export default APIController;
