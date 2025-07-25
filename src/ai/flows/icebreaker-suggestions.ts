'use server';

/**
 * @fileOverview AI-powered icebreaker suggestions for matched users.
 *
 * - generateIcebreakerSuggestions - A function that generates icebreaker suggestions for two matched users.
 * - IcebreakerInput - The input type for the generateIcebreakerSuggestions function.
 * - IcebreakerOutput - The return type for the generateIcebreakerSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IcebreakerInputSchema = z.object({
  user1Profile: z
    .string()
    .describe("The profile information of the first user, including their interests, bio, and other relevant details."),
  user2Profile: z
    .string()
    .describe("The profile information of the second user, including their interests, bio, and other relevant details."),
});
export type IcebreakerInput = z.infer<typeof IcebreakerInputSchema>;

const IcebreakerOutputSchema = z.object({
  suggestions: z.array(z.string()).describe("A list of personalized icebreaker suggestions to start a conversation."),
});
export type IcebreakerOutput = z.infer<typeof IcebreakerOutputSchema>;

export async function generateIcebreakerSuggestions(input: IcebreakerInput): Promise<IcebreakerOutput> {
  return icebreakerSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'icebreakerPrompt',
  input: {schema: IcebreakerInputSchema},
  output: {schema: IcebreakerOutputSchema},
  prompt: `You are a helpful assistant designed to generate icebreaker suggestions for two users who have matched on a dating app. 

Given the profile information of both users, suggest 3 icebreaker questions that would help them start a conversation. 
Consider their common interests, bio information, and anything else that might be relevant. Try to vary the suggestions, with some that are more direct and some that are more playful.

User 1 Profile: {{{user1Profile}}}
User 2 Profile: {{{user2Profile}}}

Output the suggestions as a numbered list.
`,
});

const icebreakerSuggestionsFlow = ai.defineFlow(
  {
    name: 'icebreakerSuggestionsFlow',
    inputSchema: IcebreakerInputSchema,
    outputSchema: IcebreakerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
