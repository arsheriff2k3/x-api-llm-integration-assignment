# X.com API Integration

This project integrates an LLM (Google Gemini) to summarize Instagram captions into tweets and post them to X.com (formerly Twitter).

## How It Works

This application follows a simple but powerful workflow:

1. **Authentication**: The application uses OAuth for X.com authentication, allowing secure access to post tweets.

2. **Text Summarization**: When an Instagram caption is submitted:
   - The caption is sent to Google Gemini's LLM model (gemini-2.0-flash)
   - The LLM processes the text with a prompt to create an engaging tweet-sized summary
   - The summary is constrained to Twitter's 280 character limit

3. **Tweet Posting**: The summarized text is posted to X.com using the Twitter API v2
   - The application verifies the tweet length before posting
   - Upon successful posting, the tweet ID and text are returned

4. **API Flow**: The application exposes RESTful endpoints that handle the request/response cycle
   - Input validation ensures all required fields are present
   - Proper error handling provides meaningful feedback

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

The application implements comprehensive error handling at multiple levels:

### API Response Format

All endpoints return consistent response formats:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful message",
  "data": { /* Operation-specific data */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message title",
  "error": "Detailed error description"
}
```

### Error Types Handled

The application handles various error scenarios:

1. **Validation Errors** (HTTP 400)
   - Missing required fields (e.g., empty Instagram caption)
   - Content exceeding limits (e.g., tweet character limit)

2. **Authentication Errors** (HTTP 401)
   - Invalid or expired X.com API credentials
   - OAuth authentication failures

3. **External API Errors** (HTTP 500)
   - LLM service unavailable or returning errors
   - X.com API rate limits or service disruptions

4. **Server Errors** (HTTP 500)
   - Unexpected application errors with detailed logging
   - Infrastructure or environment issues

### Error Handling Implementation

Errors are caught and processed at multiple levels:

- **Controller Layer**: Validates inputs and catches operational errors
- **Service Layer**: Handles specific service-related errors (LLM, Twitter API)
- **Global Error Handling**: Provides consistent error formatting

All errors are logged for debugging purposes while providing user-friendly messages in responses.

## Testing

Run the test suite with:

```
pnpm test
```