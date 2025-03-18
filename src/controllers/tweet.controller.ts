import { Request, Response } from 'express';
import { llmService } from '../services/llm.service';
import { twitterService } from '../services/twitter.service';
import { TweetRequest, ErrorResponse } from '../types';

export const tweetController = {
  /**
   * Summarizes an Instagram caption and posts it as a tweet
   * @param req Request object containing the Instagram caption
   * @param res Response object
   */
  async postTweet(req: Request, res: Response) {
    try {
      const { instagramCaption } = req.body as TweetRequest;

      if (!instagramCaption) {
        const errorResponse: ErrorResponse = {
          success: false,
          message: 'Missing required fields',
          error: 'Instagram caption is required',
        };
        return res.status(400).json(errorResponse);
      }

      const summarizationResult = await llmService.summarizeText({
        text: instagramCaption,
      });

      const tweetResult = await twitterService.postTweet(summarizationResult.summary);

      return res.status(tweetResult.success ? 200 : 400).json(tweetResult);
    } catch (error) {
      console.error('Error in postTweet controller:', error);
      const errorResponse: ErrorResponse = {
        success: false,
        message: 'Failed to process request',
        error: (error as Error).message,
      };
      return res.status(500).json(errorResponse);
    }
  },

  /**
   * Only summarizes an Instagram caption without posting it
   * @param req Request object containing the Instagram caption
   * @param res Response object
   */
  async summarizeCaption(req: Request, res: Response) {
    try {
      const { instagramCaption } = req.body as TweetRequest;

      if (!instagramCaption) {
        const errorResponse: ErrorResponse = {
          success: false,
          message: 'Missing required fields',
          error: 'Instagram caption is required',
        };
        return res.status(400).json(errorResponse);
      }

      const summarizationResult = await llmService.summarizeText({
        text: instagramCaption,
      });

      return res.status(200).json({
        success: true,
        message: 'Caption summarized successfully',
        data: {
          tweetText: summarizationResult.summary,
        },
      });
    } catch (error) {
      console.error('Error in summarizeCaption controller:', error);
      const errorResponse: ErrorResponse = {
        success: false,
        message: 'Failed to summarize caption',
        error: (error as Error).message,
      };
      return res.status(500).json(errorResponse);
    }
  },
};