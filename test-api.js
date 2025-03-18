// Simple script to test the API endpoints
import fetch from 'node-fetch';

async function testSummarizeEndpoint() {
  console.log('Testing /api/summarize endpoint...');
  try {
    const response = await fetch('http://localhost:3000/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        instagramCaption: 'Just spent an amazing weekend exploring the beautiful coastline of California! The sun was setting over the Pacific Ocean, painting the sky with vibrant hues of orange and pink.'
      })
    });
    
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error testing summarize endpoint:', error.message);
  }
}

async function testTweetEndpoint() {
  console.log('\nTesting /api/tweet endpoint...');
  try {
    const response = await fetch('http://localhost:3000/api/tweet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        instagramCaption: 'Just spent an amazing weekend exploring the beautiful coastline of California! The sun was setting over the Pacific Ocean, painting the sky with vibrant hues of orange and pink.'
      })
    });
    
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error testing tweet endpoint:', error.message);
  }
}

// Run the tests
async function runTests() {
  await testSummarizeEndpoint();
  await testTweetEndpoint();
}

runTests();