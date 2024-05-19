import sdk from 'node-appwrite';

const client = new sdk.Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setKey(process.env.APPWRITE_API_KEY)
  .setProject(process.env.APPWRITE_PROJECT_ID);

export default client;
