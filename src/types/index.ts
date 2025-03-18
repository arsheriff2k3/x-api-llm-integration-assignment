// Tweet-related interfaces
export interface TweetRequest {
  instagramCaption: string;
}

export interface TweetResponse {
  success: boolean;
  message: string;
  data?: {
    tweetId?: string;
    tweetText: string;
  };
  error?: string;
}

// LLM-related interfaces
export interface SummarizationRequest {
  text: string;
  maxLength?: number;
}

export interface SummarizationResponse {
  summary: string;
}

// Error response interface
export interface ErrorResponse {
  success: boolean;
  message: string;
  error: string;
}