import { Router } from 'express';
import { tweetController } from '../controllers/tweet.controller';

const router = Router();

/**
 * @route POST /api/tweet
 * @desc Summarizes an Instagram caption and posts it as a tweet
 * @access Public
 */
router.post('/tweet', tweetController.postTweet);

/**
 * @route POST /api/summarize
 * @desc Only summarizes an Instagram caption without posting it
 * @access Public
 */
router.post('/summarize', tweetController.summarizeCaption);

export const tweetRoutes = router;