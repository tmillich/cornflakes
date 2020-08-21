const {writeFile} = require('fs');
const {argv} = require('yargs');

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config({path: '../../.env'});

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
const environemnt = argv.ename;
const isProd = environemnt === 'prod';
const isDev = environemnt === 'dev';

let targetPath = `./src/environments/environment.${environemnt}.ts`;
if (isDev) {
  targetPath = `./src/environments/environment.ts`;
}

const envConfigFile = `
export const environment = {
  production: ${isProd},
  firebaseConfig: {
    apiKey: '${process.env.FIREBASE_APP_API_KEY}',
    authDomain: '${process.env.FIREBASE_APP_AUTH_DOMAIN}',
    databaseURL: '${process.env.FIREBASE_DATABASE_URL}',
    projectId: '${process.env.FIREBASE_PROJECT_ID}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.FIREBASE_APP_MESSAGING_SENDER_ID}',
    appId: '${process.env.FIREBASE_APP_ID}',
    measurementId: '${process.env.FIREBASE_APP_MEASUREMENT_ID}'
  }
};
`;

writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
