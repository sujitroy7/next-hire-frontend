"use server";

export async function generateDummyAIResponse(prompt: string, input: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return `This is a dummy AI response generated for the context:\n\nSystem Prompt: ${prompt}\nUser Input: ${input}\n\nThis is just a placeholder and will be replaced with actual AI integration later.`;
}
