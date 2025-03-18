import dotenv from "dotenv";
dotenv.config();

jest.mock('twitter-api-v2', () => {
  const mockTweet = jest.fn();
  return {
    TwitterApi: jest.fn().mockImplementation(() => {
      return {
        v2: {
          tweet: mockTweet,
        },
      };
    }),
    mockTweet,
  };
});
  
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { TwitterApi } from 'twitter-api-v2';
import { twitterService } from '../services/twitter.service';



describe('TwitterService', () => {
  let mockTweet: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockTweet = (jest.requireMock('twitter-api-v2') as any).mockTweet;
  });

  describe('postTweet', () => {
    it('should post a tweet successfully', async () => {
      const tweetText = 'This is a test tweet';
      const mockTweetId = '1234567890';
      
      mockTweet.mockResolvedValue({
        data: {
          id: mockTweetId,
          text: tweetText,
        },
      });

      const result = await twitterService.postTweet(tweetText);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Tweet posted successfully');
      expect(result.data?.id).toBe(mockTweetId);
      expect(result.data?.text).toBe(tweetText);
    });

    it('should reject tweets that exceed character limit', async () => {
      const longTweetText = 'A'.repeat(281);
      
      const result = await twitterService.postTweet(longTweetText);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Tweet exceeds character limit');
      expect(result.error).toBe('Tweet must be 280 characters or less');
      expect(mockTweet).not.toHaveBeenCalled();
    });

    it('should handle errors from Twitter API', async () => {
      const tweetText = 'This is a test tweet';
      const errorMessage = 'Twitter API error';
      
      mockTweet.mockRejectedValue(
        new Error(errorMessage)
      );

      const result = await twitterService.postTweet(tweetText);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Failed to post tweet');
      expect(result.error).toBe(errorMessage);
    });
  });
});