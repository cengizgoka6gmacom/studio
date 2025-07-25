"use server";

import { generateIcebreakerSuggestions } from "@/ai/flows/icebreaker-suggestions";
import { z } from "zod";
import { User } from "./data";

const IcebreakerActionSchema = z.object({
  user1: z.object({
    name: z.string(),
    bio: z.string(),
    interests: z.array(z.string()),
  }),
  user2: z.object({
    name: z.string(),
    bio: z.string(),
    interests: z.array(z.string()),
  }),
});

export async function getIcebreakerSuggestions(
  user1: User,
  user2: User
): Promise<{ suggestions?: string[]; error?: string }> {
  try {
    const validatedInput = IcebreakerActionSchema.parse({ user1, user2 });
    
    const user1Profile = `Name: ${validatedInput.user1.name}. Bio: ${validatedInput.user1.bio}. Interests: ${validatedInput.user1.interests.join(", ")}.`;
    const user2Profile = `Name: ${validatedInput.user2.name}. Bio: ${validatedInput.user2.bio}. Interests: ${validatedInput.user2.interests.join(", ")}.`;

    const result = await generateIcebreakerSuggestions({ user1Profile, user2Profile });
    return { suggestions: result.suggestions };
  } catch (e) {
    console.error(e);
    if (e instanceof z.ZodError) {
      return { error: "Invalid user data provided." };
    }
    return { error: "Failed to generate suggestions. Please try again." };
  }
}
