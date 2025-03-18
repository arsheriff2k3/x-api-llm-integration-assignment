# X.com API Integration

This project integrates an LLM (Google Gemini) to summarize Instagram captions into tweets and post them to X.com (formerly Twitter).

## Features

- LLM Summarization: Uses Google Gemini to generate concise tweet summaries from Instagram captions
- X.com API Integration: Posts the summarized content to X.com
- API Endpoints: RESTful endpoints for summarization and tweet posting

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   pnpm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your API keys:
   ```
   # Google Gemini API Key
   GEMINI_API_KEY=your_gemini_api_key

   # X.com (Twitter) API Credentials
   TWITTER_API_KEY=your_twitter_api_key
   TWITTER_API_SECRET=your_twitter_api_secret
   TWITTER_ACCESS_TOKEN=your_twitter_access_token
   TWITTER_ACCESS_SECRET=your_twitter_access_secret

   # Server Configuration
   PORT=3000
   NODE_ENV=development
   ```
4. Build and start the server:
   ```
   pnpm run build
   pnpm start
   ```

## API Documentation

### Summarize Instagram Caption

**Endpoint:** `POST /api/summarize`

**Description:** Summarizes an Instagram caption into a tweet-sized text without posting it.

**Request Body:**
```json
{
  "instagramCaption": "Your Instagram caption text here..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Caption summarized successfully",
  "data": {
    "tweetText": "Summarized caption text"
  }
}
```

### Post Tweet

**Endpoint:** `POST /api/tweet`

**Description:** Summarizes an Instagram caption and posts it as a tweet to the configured X.com account.

**Request Body:**
```json
{
  "instagramCaption": "Your Instagram caption text here..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Tweet posted successfully",
  "data": {
    "tweetId": "1234567890",
    "tweetText": "Summarized caption text"
  }
}
```

## Error Handling

All endpoints return appropriate error responses with descriptive messages:

```json
{
  "success": false,
  "message": "Error message title",
  "error": "Detailed error description"
}
```

## Testing

Run the test suite with:

```
pnpm test
```