const dialogflow = require('@google-cloud/dialogflow');
const fs = require('fs');
const path = require('path');

// Read the credentials file
const credentialsPath = path.join(__dirname, 'dialogflowCredentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));

const sessionClient = new dialogflow.SessionsClient({
  credentials
});

async function detectIntent(query, sessionId) {
  const sessionPath = sessionClient.projectAgentSessionPath(credentials.project_id, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: 'en-US',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  return responses[0].queryResult;
}

module.exports = { detectIntent };
