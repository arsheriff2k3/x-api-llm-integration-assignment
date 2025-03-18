import dotenv from "dotenv";
dotenv.config();

// Mock the Google Generative AI module
jest.mock('@google/generative-ai', () => {
  const mockGenerateContent = jest.fn();
  const mockResponse = { text: jest.fn() };
  
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => {
      return {
        getGenerativeModel: jest.fn().mockReturnValue({
          generateContent: mockGenerateContent.mockResolvedValue({
            response: mockResponse
          })
        })
      };
    }),
    mockGenerateContent,
    mockResponse
  };
});

import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { llmService } from '../services/llm.service';
import { SummarizationRequest } from '../types';



describe('LLMService', () => {
  let mockGenerateContent: jest.Mock;
  let mockResponse: { text: jest.Mock };

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockGenerateContent = (jest.requireMock('@google/generative-ai') as any).mockGenerateContent;
    mockResponse = (jest.requireMock('@google/generative-ai') as any).mockResponse;
  });

  describe('summarizeText', () => {
    it('should summarize text successfully', async () => {

      const mockSummary = 'This is a summarized tweet';
      const mockRequest: SummarizationRequest = {
        text: 'This is a long Instagram caption that needs to be summarized into a tweet',
      };
      
      mockResponse.text.mockReturnValue(mockSummary);
      mockGenerateContent.mockResolvedValue({
        response: mockResponse
      });

      const result = await llmService.summarizeText(mockRequest);

      expect(result.summary).toBe(mockSummary);
    });

    it('should truncate summary if it exceeds maxLength', async () => {
      const longSummary = 'This is a very long summary that exceeds the character limit';
      const maxLength = 20;
      const mockRequest: SummarizationRequest = {
        text: 'This is a long Instagram caption',
        maxLength,
      };
      
      mockResponse.text.mockReturnValue(longSummary);
      mockGenerateContent.mockResolvedValue({
        response: mockResponse
      });

      const result = await llmService.summarizeText(mockRequest);

      expect(result.summary.length).toBeLessThanOrEqual(maxLength);
      expect(result.summary).toBe(longSummary.substring(0, maxLength));
    });

    it('should handle errors from Gemini API', async () => {
      const mockRequest: SummarizationRequest = {
        text: 'This is a long Instagram caption',
      };
      
      mockGenerateContent.mockRejectedValue(
        new Error('Gemini API error')
      );

      await expect(llmService.summarizeText(mockRequest)).rejects.toThrow(
        'Failed to summarize text: Gemini API error'
      );
    });
  });
});