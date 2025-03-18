import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

class TwitterService {
  private client: TwitterApi;

  constructor() {
    const apiKey = process.env.TWITTER_API_KEY!;
    const apiSecret = process.env.TWITTER_API_SECRET!;
    const accessToken = process.env.TWITTER_ACCESS_TOKEN!;
    const accessSecret = process.env.TWITTER_ACCESS_SECRET!;
    
    if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
      throw new Error('Twitter API credentials are missing');
    }

    this.client = new TwitterApi({
      appKey: apiKey,
      appSecret: apiSecret,
      accessToken: accessToken,
      accessSecret: accessSecret,
    });
  }

  async postTweet(tweetText: string) {
    try {
      if (tweetText.length > 280) {
        return { 
          success: false, 
          message: 'Tweet exceeds character limit',
          error: 'Tweet must be 280 characters or less'
        };
      }

      const response = await this.client.v2.tweet(tweetText);
      return {
        success: true,
        message: 'Tweet posted successfully',
        data: response.data,
      };
    } catch (error) {
      console.error('Error posting tweet:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { success: false, message: 'Failed to post tweet', error: errorMessage };
    }
  }
}

export const twitterService = new TwitterService();
