# web3-signature-example

An example of securely verifying that a user owns an Ethereum address.

## Logic

1. The user first hits the `/eth/message` endpoint to generate a unique message
2. The user then signs the message (with MetaMask most likely)
3. The user sends the signature along with the address they used to generate it to `/eth/confirm`
4. The server validates against the message stored in the session and returns the result

## Basic Usage

1. Install dependencies with `npm install` or `yarn install`
2. Start server with `npm run start` or `yarn start`
3. Visit `http://localhost:10000` in your Web3 capable browser
