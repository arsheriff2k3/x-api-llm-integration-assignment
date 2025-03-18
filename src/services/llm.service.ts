import { GoogleGenerativeAI } from "@google/generative-ai";
import { SummarizationRequest, SummarizationResponse } from "../types";

class LLMService {
  private gemini: GoogleGenerativeAI;
  private readonly DEFAULT_MAX_LENGTH = 280;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    this.gemini = new GoogleGenerativeAI(apiKey);
  }

  /**
   * Summarizes a text (Instagram caption) into a tweet-sized summary
   * @param request The summarization request containing the text to summarize
   * @returns A promise that resolves to the summarized text
   */
  async summarizeText(
    request: SummarizationRequest
  ): Promise<SummarizationResponse> {
    const { text, maxLength = this.DEFAULT_MAX_LENGTH } = request;

    try {
      const model = this.gemini.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

      const prompt = `Summarize this Instagram caption into a tweet (max ${maxLength} characters), keeping the message engaging:\n\n"${text}"`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const summary = response.text().trim();

      return { summary: summary.substring(0, maxLength) };
    } catch (error) {
      console.error("Error summarizing text with LLM:", error);
      throw new Error(`Failed to summarize text: ${(error as Error).message}`);
    }
  }
}

export const llmService = new LLMService();
